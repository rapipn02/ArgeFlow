<?php

namespace App\Http\Controllers\Programmer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgrammerProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        // Get programmer's teams
        $teamIds = TeamMember::where('user_id', $user->id)
            ->pluck('team_id')
            ->toArray();

        // Build query
        $query = Order::whereIn('team_id', $teamIds)
            ->with(['service', 'user', 'team']);

        // Filter by status if provided
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'incoming') {
                $query->where('status', 'dp_paid');
            } elseif ($request->status === 'in_progress') {
                $query->whereIn('status', ['in_progress', 'awaiting_review', 'revision_requested', 'final_payment']);
            } elseif ($request->status === 'completed') {
                $query->where('status', 'completed');
            }
        }

        // Search
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

        // Get projects with pagination
        $projects = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($order) {
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
                    'dp_amount' => $order->dp_amount,
                    'final_amount' => $order->final_amount,
                    'deadline_date' => $order->deadline_date ? $order->deadline_date->format('d M Y') : null,
                    'requirements' => $order->requirements,
                    'created_at' => $order->created_at->format('d M Y'),
                    'dp_paid_at' => $order->dp_paid_at ? $order->dp_paid_at->format('d M Y') : null,
                    'revision_count' => $order->revision_count,
                    'has_revision' => $order->status === 'revision_requested',
                ];
            });

        return Inertia::render('Programmer/Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function show(Order $order)
    {
        $user = auth()->user();

        // Check if programmer is in the team assigned to this order
        $teamIds = TeamMember::where('user_id', $user->id)
            ->pluck('team_id')
            ->toArray();

        if (!in_array($order->team_id, $teamIds)) {
            return redirect()->route('programmer.projects.index')
                ->with('error', 'Anda tidak memiliki akses ke project ini.');
        }

        $order->load(['service', 'user', 'team.members.user', 'progress.programmer', 'progress.comments.user', 'revisions.client']);

        $projectData = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'service' => [
                'name' => $order->service->name ?? 'N/A',
                'description' => $order->service->description ?? '',
            ],
            'client' => [
                'name' => $order->user->name ?? 'N/A',
                'email' => $order->user->email ?? 'N/A',
                'phone' => $order->user->phone ?? 'N/A',
            ],
            'team' => [
                'name' => $order->team->name ?? 'N/A',
                'members' => $order->team->members->map(function ($member) {
                    return [
                        'name' => $member->user->name ?? 'N/A',
                        'role' => $member->role,
                        'avatar' => $member->user->avatar,
                    ];
                }),
            ],
            'status' => $order->status,
            'payment_status' => $order->payment_status,
            'total_amount' => $order->total_amount,
            'dp_amount' => $order->dp_amount,
            'final_amount' => $order->final_amount,
            'dp_paid_at' => $order->dp_paid_at ? $order->dp_paid_at->format('d M Y H:i') : null,
            'final_paid_at' => $order->final_paid_at ? $order->final_paid_at->format('d M Y H:i') : null,
            'deadline_date' => $order->deadline_date ? $order->deadline_date->format('d M Y') : null,
            'requested_days' => $order->requested_days,
            'requirements' => $order->requirements,
            'notes' => $order->notes,
            'created_at' => $order->created_at->format('d M Y H:i'),
            'revision_count' => $order->revision_count,
            'has_revision' => $order->status === 'revision_requested',
        ];

        // Get latest revision if exists
        $latestRevision = null;
        if ($order->status === 'revision_requested') {
            $revision = $order->revisions()->latest()->first();
            if ($revision) {
                $latestRevision = [
                    'id' => $revision->id,
                    'description' => $revision->description,
                    'revision_number' => $revision->revision_number,
                    'created_at' => $revision->created_at->format('d M Y H:i'),
                    'client_name' => $revision->client->name ?? 'N/A',
                ];
            }
        }

        // Get all revisions for history
        $revisionHistory = $order->revisions()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($revision) {
                return [
                    'id' => $revision->id,
                    'description' => $revision->description,
                    'revision_number' => $revision->revision_number,
                    'status' => $revision->status,
                    'created_at' => $revision->created_at->format('d M Y H:i'),
                    'client_name' => $revision->client->name ?? 'N/A',
                ];
            });

        // Get progress list
        $progressList = $order->progress()
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
                    'comments_count' => $progress->comments->count(),
                ];
            });

        // Check if programmer can add progress (DP must be paid)
        $canAddProgress = in_array($order->status, ['dp_paid', 'in_progress', 'revision_requested', 'final_payment', 'completed']);

        return Inertia::render('Programmer/Projects/Show', [
            'project' => $projectData,
            'progressList' => $progressList,
            'canAddProgress' => $canAddProgress,
            'latestRevision' => $latestRevision,
            'revisionHistory' => $revisionHistory,
        ]);
    }
}
