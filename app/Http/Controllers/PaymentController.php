<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    /**
     * Show payment page
     */
    public function show(Order $order)
    {
        // Ensure user can only pay their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        // For final payment, check if order is in final_payment status
        if ($order->payment_status === 'dp_paid') {
            if ($order->status !== 'final_payment') {
                return redirect()->route('orders.show', $order)
                    ->with('info', 'Pembayaran pelunasan hanya dapat dilakukan setelah proyek diterima (status Final Payment)');
            }
        }

        // Check if order can be paid
        if (!in_array($order->payment_status, ['pending', 'failed', 'dp_paid'])) {
            return redirect()->route('orders.show', $order)
                ->with('info', 'Order ini sudah lunas');
        }

        $order->load(['service', 'team']);

        return Inertia::render('Payment/CustomPayment', [
            'order' => $order,
            'midtransClientKey' => config('midtrans.client_key'),
        ]);
    }

    /**
     * Create Snap token for payment
     */
    public function createToken(Request $request, Order $order)
    {
        // Ensure user can only create token for their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        $validated = $request->validate([
            'payment_type' => 'required|in:dp,final',
        ]);

        try {
            $snapToken = $this->midtransService->createSnapToken(
                $order,
                $validated['payment_type']
            );

            return response()->json([
                'snap_token' => $snapToken,
                'order_id' => $order->midtrans_order_id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Midtrans notification webhook
     */
    public function handleNotification(Request $request)
    {
        try {
            $result = $this->midtransService->handleNotification();

            return response()->json([
                'status' => 'success',
                'message' => 'Notification handled successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check payment status
     */
    public function checkStatus(Order $order)
    {
        // Ensure user can only check their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        try {
            if (!$order->midtrans_order_id) {
                return response()->json([
                    'status' => 'pending',
                    'message' => 'Payment not initiated yet',
                ]);
            }

            $status = $this->midtransService->checkTransactionStatus(
                $order->midtrans_order_id
            );

            // Update order status if payment is successful
            if (in_array($status->transaction_status, ['capture', 'settlement'])) {
                // Extract payment type from order_id
                $parts = explode('-', $order->midtrans_order_id);
                $paymentType = $parts[2] ?? 'dp';
                
                \Log::info('Checking payment status', [
                    'order_id' => $order->id,
                    'midtrans_order_id' => $order->midtrans_order_id,
                    'payment_type' => $paymentType,
                    'transaction_status' => $status->transaction_status,
                    'current_payment_status' => $order->payment_status
                ]);
                
                if ($paymentType === 'dp' && $order->payment_status === 'pending') {
                    $order->markDpAsPaid();
                } elseif ($paymentType === 'final' && $order->payment_status === 'dp_paid') {
                    $order->markAsFullyPaid();
                }
            }

            return response()->json([
                'status' => 'success',
                'transaction_status' => $status->transaction_status,
                'payment_status' => $order->fresh()->payment_status,
            ]);
        } catch (\Exception $e) {
            \Log::error('Check status error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Payment success page
     */
    public function success(Request $request)
    {
        $orderId = $request->query('order_id');

        if ($orderId) {
            $order = Order::find($orderId);
            if ($order && $order->user_id === auth()->id()) {
                // TEMPORARY FIX: For testing, manually check and update status
                if ($order->midtrans_order_id) {
                    try {
                        $status = $this->midtransService->checkTransactionStatus($order->midtrans_order_id);
                        
                        if (in_array($status->transaction_status, ['capture', 'settlement'])) {
                            // Extract payment type from order_id
                            $orderIdParts = explode('-', $order->midtrans_order_id);
                            $paymentType = isset($orderIdParts[2]) ? $orderIdParts[2] : 'dp';
                            
                            if ($paymentType === 'dp' && $order->payment_status === 'pending') {
                                $order->markDpAsPaid();
                            } elseif ($paymentType === 'final' && $order->payment_status === 'dp_paid') {
                                $order->markAsFullyPaid();
                            }
                        }
                    } catch (\Exception $e) {
                        // Log error but continue
                        \Log::error('Payment status check failed: ' . $e->getMessage());
                    }
                }

                $order->load(['service', 'team']);

                return Inertia::render('Payment/Success', [
                    'order' => $order,
                ]);
            }
        }

        return Inertia::render('Payment/Success');
    }

    /**
     * Payment failed page
     */
    public function failed(Request $request)
    {
        $orderId = $request->query('order_id');

        if ($orderId) {
            $order = Order::find($orderId);
            if ($order && $order->user_id === auth()->id()) {
                $order->load(['service', 'team']);

                return Inertia::render('Payment/Failed', [
                    'order' => $order,
                ]);
            }
        }

        return Inertia::render('Payment/Failed');
    }
}
