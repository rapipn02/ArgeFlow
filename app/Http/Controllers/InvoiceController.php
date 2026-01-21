<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    /**
     * Display invoice page
     */
    public function show(Order $order)
    {
        // Ensure user can only view their own invoices
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        // Only show invoice for paid orders
        if (!in_array($order->payment_status, ['dp_paid', 'fully_paid'])) {
            return redirect()->route('orders.show', $order)
                ->with('error', 'Invoice hanya tersedia untuk order yang sudah dibayar');
        }

        $order->load(['service', 'team', 'user']);

        return Inertia::render('Invoice/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Download invoice as PDF
     */
    public function download(Order $order)
    {
        // Ensure user can only download their own invoices
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        // Only allow download for paid orders
        if (!in_array($order->payment_status, ['dp_paid', 'fully_paid'])) {
            return redirect()->route('orders.show', $order)
                ->with('error', 'Invoice hanya tersedia untuk order yang sudah dibayar');
        }

        $order->load(['service', 'team', 'user']);

        $pdf = Pdf::loadView('invoices.pdf', [
            'order' => $order,
        ]);

        return $pdf->download('invoice-' . $order->order_number . '.pdf');
    }
}
