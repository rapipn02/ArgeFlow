<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Order;
use App\Services\MidtransService;

echo "Checking order payment statuses...\n\n";

$orders = Order::whereNotNull('midtrans_order_id')->get();

foreach ($orders as $order) {
    echo "Order #{$order->order_number}\n";
    echo "  Current Status: {$order->status}\n";
    echo "  Payment Status: {$order->payment_status}\n";
    echo "  Midtrans Order ID: {$order->midtrans_order_id}\n";
    
    try {
        $midtrans = new MidtransService();
        $status = $midtrans->checkTransactionStatus($order->midtrans_order_id);
        
        echo "  Transaction Status: {$status->transaction_status}\n";
        
        // Check if needs update
        $parts = explode('-', $order->midtrans_order_id);
        $paymentType = $parts[2] ?? 'dp';
        
        echo "  Payment Type: {$paymentType}\n";
        
        if (in_array($status->transaction_status, ['capture', 'settlement'])) {
            if ($paymentType === 'dp' && $order->payment_status === 'pending') {
                echo "  ⚠️ Should mark DP as paid\n";
                $order->markDpAsPaid();
                echo "  ✅ Updated to dp_paid\n";
            } elseif ($paymentType === 'final' && $order->payment_status === 'dp_paid') {
                echo "  ⚠️ Should mark as fully paid\n";
                $order->markAsFullyPaid();
                echo "  ✅ Updated to fully_paid\n";
            } else {
                echo "  ✓ Status correct\n";
            }
        }
    } catch (Exception $e) {
        echo "  ❌ Error: {$e->getMessage()}\n";
    }
    
    echo "\n";
}
