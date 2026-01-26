<?php

namespace App\Http\Controllers\Programmer;

use App\Http\Controllers\Controller;
use App\Models\ProgrammerEarning;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgrammerEarningController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Calculate earnings statistics
        $stats = [
            'total_earnings' => ProgrammerEarning::where('programmer_id', $user->id)
                ->where('status', 'paid')
                ->sum('net_amount'),
            'pending_earnings' => ProgrammerEarning::where('programmer_id', $user->id)
                ->where('status', 'pending')
                ->sum('net_amount'),
            'total_transactions' => ProgrammerEarning::where('programmer_id', $user->id)
                ->count(),
        ];

        // Get recent transactions
        $recentTransactions = ProgrammerEarning::where('programmer_id', $user->id)
            ->with(['order.service'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($earning) {
                return [
                    'id' => $earning->id,
                    'order_number' => $earning->order->order_number ?? 'N/A',
                    'service_name' => $earning->order->service->name ?? 'N/A',
                    'amount' => $earning->net_amount,
                    'status' => $earning->status,
                    'payment_date' => $earning->paid_at ? $earning->paid_at->format('d M Y') : null,
                    'created_at' => $earning->created_at->format('d M Y'),
                ];
            });

        // Get programmer profile for bank info
        $profile = $user->programmerProfile;
        $bankInfo = null;

        if ($profile) {
            $bankInfo = [
                'bank_name' => $profile->bank_name,
                'account_number' => $profile->bank_account_number,
                'account_holder' => $profile->bank_account_holder,
            ];
        }

        return Inertia::render('Programmer/Earnings/Index', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
            'bankInfo' => $bankInfo,
        ]);
    }
}
