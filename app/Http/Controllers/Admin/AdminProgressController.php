<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProgressController extends Controller
{
    /**
     * Display a listing of all projects with progress
     */
    public function index(Request $request)
    {
        // Build query for orders that have progress
        $query = Order::with(['service', 'user', 'team', 'progress'])
            ->has('progress') // Only orders with progress
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhereHas('service', function ($sq) use ($search) {
                        $sq->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by order status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Paginate results
        $projects = $query->paginate(15)->through(function ($order) {
            $progressCount = $order->progress()->count();
            $commentsCount = $order->progress()->withCount('comments')->get()->sum('comments_count');
            $latestProgress = $order->progress()->latest()->first();

            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'service_name' => $order->service->name ?? 'N/A',
                'client_name' => $order->user->name ?? 'N/A',
                'client_email' => $order->user->email ?? 'N/A',
                'team_name' => $order->team->name ?? 'N/A',
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total_amount' => $order->total_amount,
                'created_at' => $order->created_at->format('d M Y'),
                'progress_count' => $progressCount,
                'comments_count' => $commentsCount,
                'latest_progress' => $latestProgress ? [
                    'percentage' => $latestProgress->progress_percentage,
                    'created_at' => $latestProgress->created_at->diffForHumans(),
                ] : null,
            ];
        });

        return Inertia::render('Admin/Progress/Index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Display progress and comments for a specific project
     */
    public function show(Order $order)
    {
        $order->load(['service', 'user', 'team']);

        // Get all progress with comments for this order
        $progressList = OrderProgress::with(['programmer', 'comments.user'])
            ->where('order_id', $order->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($progress) {
                return [
                    'id' => $progress->id,
                    'description' => $progress->description,
                    'file_path' => $progress->file_path,
                    'progress_percentage' => $progress->progress_percentage,
                    'created_at' => $progress->created_at->format('d M Y H:i'),
                    'programmer' => [
                        'id' => $progress->programmer->id,
                        'name' => $progress->programmer->name,
                        'avatar' => $progress->programmer->avatar,
                    ],
                    'comments' => $progress->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'comment' => $comment->comment,
                            'created_at' => $comment->created_at->diffForHumans(),
                            'user' => [
                                'id' => $comment->user->id,
                                'name' => $comment->user->name,
                                'avatar' => $comment->user->avatar,
                                'role' => $comment->user->role,
                            ],
                        ];
                    }),
                ];
            });

        $projectData = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'service_name' => $order->service->name ?? 'N/A',
            'client_name' => $order->user->name ?? 'N/A',
            'client_email' => $order->user->email ?? 'N/A',
            'team_name' => $order->team->name ?? 'N/A',
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'total_amount' => $order->total_amount,
            'dp_amount' => $order->dp_amount,
            'final_amount' => $order->final_amount,
            'created_at' => $order->created_at->format('d M Y'),
        ];

        return Inertia::render('Admin/Progress/Show', [
            'project' => $projectData,
            'progressList' => $progressList,
        ]);
    }
}
