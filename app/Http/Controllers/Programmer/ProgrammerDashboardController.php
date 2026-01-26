<?php

namespace App\Http\Controllers\Programmer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProgrammerEarning;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgrammerDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get programmer's teams
        $teamIds = TeamMember::where('user_id', $user->id)
            ->pluck('team_id')
            ->toArray();

        // Get all orders for programmer's teams
        $allOrders = Order::whereIn('team_id', $teamIds)
            ->with(['service', 'user', 'team'])
            ->get();

        // Calculate statistics
        $stats = [
            'total_earnings' => ProgrammerEarning::where('programmer_id', $user->id)
                ->where('status', 'paid')
                ->sum('net_amount'),
            'pending_earnings' => ProgrammerEarning::where('programmer_id', $user->id)
                ->where('status', 'pending')
                ->sum('net_amount'),
            'active_projects' => $allOrders->whereIn('status', ['dp_paid', 'in_progress', 'final_payment'])->count(),
            'completed_projects' => $allOrders->where('status', 'completed')->count(),
            'total_projects' => $allOrders->count(),
        ];

        // Get recent projects (last 5)
        $recentProjects = Order::whereIn('team_id', $teamIds)
            ->with(['service', 'user', 'team'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'service_name' => $order->service->name ?? 'N/A',
                    'client_name' => $order->user->name ?? 'N/A',
                    'team_name' => $order->team->name ?? 'N/A',
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at->format('d M Y'),
                ];
            });

        // Get team memberships
        $teams = TeamMember::where('user_id', $user->id)
            ->with('team')
            ->get()
            ->map(function ($membership) {
                return [
                    'id' => $membership->team->id,
                    'name' => $membership->team->name,
                    'specialization' => $membership->team->specialization,
                    'role' => $membership->role,
                    'avatar' => $membership->team->avatar,
                    'average_rating' => $membership->team->average_rating,
                    'total_projects' => $membership->team->total_projects,
                ];
            });

        return Inertia::render('Programmer/Dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'teams' => $teams,
        ]);
    }
}
