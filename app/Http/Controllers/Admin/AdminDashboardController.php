<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\FinancialReport;
use App\Models\Order;
use App\Models\User;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    /**
     * Display admin dashboard with financial statistics
     */
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Total pemasukan (all time)
        $totalIncome = Transaction::income()->sum('amount');

        // Total pengeluaran (all time)
        $totalExpense = Transaction::expense()->sum('amount');

        // Saldo total
        $totalBalance = $totalIncome - $totalExpense;

        // Pemasukan bulan ini
        $monthlyIncome = Transaction::income()
            ->monthYear($currentMonth, $currentYear)
            ->sum('amount');

        // Pengeluaran bulan ini
        $monthlyExpense = Transaction::expense()
            ->monthYear($currentMonth, $currentYear)
            ->sum('amount');

        // Arus kas bulan ini
        $monthlyCashFlow = $monthlyIncome - $monthlyExpense;

        // Transaksi terbaru (8 terakhir)
        $recentTransactions = Transaction::with('creator')
            ->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'detail' => $transaction->description,
                    'category' => $this->getCategoryLabel($transaction->category),
                    'nominal' => $transaction->formatted_amount,
                    'type' => $transaction->type,
                    'date' => $transaction->transaction_date->format('d M Y'),
                    'created_by' => $transaction->creator->name ?? 'System',
                ];
            });

        // Laporan per divisi (untuk chart)
        $financialReports = FinancialReport::where('year', $currentYear)
            ->orderBy('month')
            ->get()
            ->map(function ($report) {
                return [
                    'month' => $report->month_name,
                    'income' => (float) $report->total_income,
                    'expense' => (float) $report->total_expense,
                ];
            });

        // Statistics untuk cards
        $stats = [
            'total_income' => [
                'value' => $totalIncome,
                'formatted' => 'Rp ' . number_format((float) $totalIncome, 0, ',', '.'),
                'subtitle' => 'Akumulasi semua dana masuk',
            ],
            'total_expense' => [
                'value' => $totalExpense,
                'formatted' =>  number_format((float) $totalExpense, 0, ',', '.'),
                'subtitle' => 'Akumulasi Total Projek',
            ],
            'total_balance' => [
                'value' => $totalBalance,
                'formatted' => 'Rp ' . number_format((float) $totalBalance, 0, ',', '.'),
                'subtitle' => 'Dana tersedia saat ini',
            ],
            'monthly_income' => [
                'value' => $monthlyIncome,
                'formatted' => 'Rp ' . number_format((float) $monthlyIncome, 0, ',', '.'),
                'subtitle' => 'Bulan ' . Carbon::now()->format('F'),
            ],
            'monthly_expense' => [
                'value' => $monthlyExpense,
                'formatted' => number_format((float) $monthlyExpense, 0, ',', '.'),
                'subtitle' => 'Bulan ' . Carbon::now()->format('F'),
            ],
            'monthly_cash_flow' => [
                'value' => $monthlyCashFlow,
                'formatted' => ($monthlyCashFlow >= 0 ? '+' : '') . 'Rp ' . number_format((float) abs($monthlyCashFlow), 0, ',', '.'),
                'subtitle' => 'Selisih masuk - keluar bulan ini',
            ],
        ];

        // Additional stats
        $additionalStats = [
            'total_users' => User::count(),
            'total_teams' => Team::count(),
            'total_orders' => Order::count(),
            'active_orders' => Order::whereIn('status', ['pending', 'in_progress'])->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
            'financialReports' => $financialReports,
            'additionalStats' => $additionalStats,
            'currentDate' => Carbon::now()->locale('id')->isoFormat('dddd, D MMMM YYYY'),
        ]);
    }

    /**
     * Get category label in Indonesian
     */
    private function getCategoryLabel($category)
    {
        $labels = [
            'project_payment' => 'Pembayaran Proyek',
            'salary' => 'Gaji',
            'operational' => 'Operasional',
            'equipment' => 'Peralatan',
            'marketing' => 'Marketing',
            'other' => 'Lainnya',
        ];

        return $labels[$category] ?? ucfirst($category);
    }
}
