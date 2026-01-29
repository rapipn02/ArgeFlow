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

        // Statistics projek
        $totalProjects = Order::count();
        $monthlyProjects = Order::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();
        $totalCompletedProjects = Order::where('status', 'completed')->count();
        $monthlyCompletedProjects = Order::where('status', 'completed')
            ->whereMonth('accepted_at', $currentMonth)
            ->whereYear('accepted_at', $currentYear)
            ->count();
        $activeProjects = Order::whereIn('status', ['pending', 'in_progress', 'final_payment'])->count();

        // Statistics tim
        $activeTeams = Team::whereHas('orders', function ($query) {
            $query->whereIn('status', ['in_progress', 'final_payment']);
        })->count();
        $totalTeams = Team::count();
        $inactiveTeams = $totalTeams - $activeTeams;

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
            'total_projects' => [
                'value' => $totalProjects,
                'formatted' => number_format($totalProjects, 0, ',', '.'),
                'subtitle' => 'Semua projek yang pernah masuk',
            ],
            'monthly_projects' => [
                'value' => $monthlyProjects,
                'formatted' => number_format($monthlyProjects, 0, ',', '.'),
                'subtitle' => 'Bulan ' . Carbon::now()->format('F'),
            ],
            'total_completed_projects' => [
                'value' => $totalCompletedProjects,
                'formatted' => number_format($totalCompletedProjects, 0, ',', '.'),
                'subtitle' => 'Projek yang sudah selesai',
            ],
            'monthly_completed_projects' => [
                'value' => $monthlyCompletedProjects,
                'formatted' => number_format($monthlyCompletedProjects, 0, ',', '.'),
                'subtitle' => 'Bulan ' . Carbon::now()->format('F'),
            ],
            'active_projects' => [
                'value' => $activeProjects,
                'formatted' => number_format($activeProjects, 0, ',', '.'),
                'subtitle' => 'Sedang dikerjakan',
            ],
            'active_teams' => [
                'value' => $activeTeams,
                'formatted' => number_format($activeTeams, 0, ',', '.'),
                'subtitle' => 'Tim yang sedang mengerjakan projek',
            ],
            'inactive_teams' => [
                'value' => $inactiveTeams,
                'formatted' => number_format($inactiveTeams, 0, ',', '.'),
                'subtitle' => 'Tim yang tidak ada projek',
            ],
        ];

        // Additional stats
        $additionalStats = [
            'total_users' => User::count(),
            'total_teams' => Team::count(),
            'total_orders' => Order::count(),
            'active_orders' => Order::whereIn('status', ['pending', 'in_progress'])->count(),
        ];

        // Orders yang perlu assign team (sudah bayar DP tapi belum ada team)
        $pendingTeamAssignment = Order::with(['service', 'user'])
            ->where('team_preference', 'auto_assign')
            ->where('payment_status', 'dp_paid')
            ->whereNull('team_id')
            ->orderBy('dp_paid_at', 'asc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'service_name' => $order->service->name ?? 'N/A',
                    'client_name' => $order->user->name ?? 'N/A',
                    'client_email' => $order->user->email ?? 'N/A',
                    'total_amount' => $order->total_amount,
                    'dp_paid_at' => $order->dp_paid_at ? $order->dp_paid_at->format('d M Y H:i') : null,
                    'requirements' => $order->requirements,
                ];
            });

        // Get available teams untuk assign
        $availableTeams = Team::where('is_available', true)
            ->get()
            ->map(function ($team) {
            $activeOrders = Order::where('team_id', $team->id)
                ->whereIn('status', ['in_progress', 'final_payment'])
                ->count();

            return [
                'id' => $team->id,
                'name' => $team->name,
                'specialization' => $team->specialization,
                'workload' => $activeOrders,
                'average_rating' => $team->average_rating,
            ];
        });

        // All orders untuk chart
        $allOrders = Order::select('id', 'status', 'created_at')
            ->get()
            ->map(function ($order) {
                return [
                    'status' => $order->status,
                    'created_at' => $order->created_at->toISOString(),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
            'financialReports' => $financialReports,
            'additionalStats' => $additionalStats,
            'pendingTeamAssignment' => $pendingTeamAssignment,
            'availableTeams' => $availableTeams,
            'allOrders' => $allOrders,
            'currentDate' => Carbon::now()->locale('id')->isoFormat('dddd, D MMMM YYYY'),
        ]);
    }

    /**
     * Get category label in Indonesian
     */
    private function getCategoryLabel($category)
    {
        $labels = [
            'project payment' => 'Pembayaran Proyek',
            'salary' => 'Gaji',
            'operational' => 'Operasional',
            'equipment' => 'Peralatan',
            'marketing' => 'Marketing',
            'other' => 'Lainnya',
        ];

        return $labels[$category] ?? ucfirst($category);
    }
}
