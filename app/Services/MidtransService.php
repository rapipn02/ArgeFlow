<?php

namespace App\Services;

use App\Models\Order;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Midtrans\Notification;

class MidtransService
{
    public function __construct()
    {
        // Set Midtrans configuration
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * Create Snap token for payment
     */
    public function createSnapToken(Order $order, string $paymentType = 'dp')
    {
        $amount = $paymentType === 'dp' ? $order->dp_amount : $order->final_amount;
        $orderId = $order->order_number . '-' . $paymentType . '-' . time();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $amount,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->user->phone ?? '',
            ],
            'item_details' => [
                [
                    'id' => $order->service_id,
                    'price' => (int) $amount,
                    'quantity' => 1,
                    'name' => $order->service->name . ' - ' . strtoupper($paymentType),
                ]
            ],
            'enabled_payments' => explode(',', config('midtrans.payment_type')),
            'callbacks' => [
                'finish' => route('payment.success', ['order' => $order->id]),
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            // Update order with Midtrans details
            $order->update([
                'midtrans_order_id' => $orderId,
                'midtrans_snap_token' => $snapToken,
            ]);

            return $snapToken;
        } catch (\Exception $e) {
            throw new \Exception('Failed to create payment token: ' . $e->getMessage());
        }
    }

    /**
     * Check transaction status
     */
    public function checkTransactionStatus(string $orderId)
    {
        try {
            return Transaction::status($orderId);
        } catch (\Exception $e) {
            throw new \Exception('Failed to check transaction status: ' . $e->getMessage());
        }
    }

    /**
     * Handle payment notification from Midtrans
     */
    public function handleNotification()
    {
        try {
            $notification = new Notification();

            $transactionStatus = $notification->transaction_status;
            $fraudStatus = $notification->fraud_status;
            $orderId = $notification->order_id;

            // Extract order number from order_id (format: ORD-XXX-dp/final-timestamp)
            $orderNumber = explode('-', $orderId)[0] . '-' . explode('-', $orderId)[1];
            $paymentType = explode('-', $orderId)[2]; // 'dp' or 'final'

            $order = Order::where('order_number', $orderNumber)->first();

            if (!$order) {
                throw new \Exception('Order not found');
            }

            // Handle different transaction statuses
            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    $this->updateOrderStatus($order, $paymentType, 'success');
                }
            } elseif ($transactionStatus == 'settlement') {
                $this->updateOrderStatus($order, $paymentType, 'success');
            } elseif ($transactionStatus == 'pending') {
                $this->updateOrderStatus($order, $paymentType, 'pending');
            } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
                $this->updateOrderStatus($order, $paymentType, 'failed');
            }

            return [
                'status' => 'success',
                'order' => $order,
                'transaction_status' => $transactionStatus,
            ];
        } catch (\Exception $e) {
            throw new \Exception('Failed to handle notification: ' . $e->getMessage());
        }
    }

    /**
     * Update order status based on payment
     */
    private function updateOrderStatus(Order $order, string $paymentType, string $status)
    {
        if ($status === 'success') {
            if ($paymentType === 'dp') {
                $order->markDpAsPaid();
            } else {
                $order->markAsFullyPaid();
            }
        } elseif ($status === 'failed') {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);
        }
        // For pending, we don't update anything yet
    }
}
