<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProgress;
use App\Models\ProgressComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgressController extends Controller
{
    /**
     * Display progress for a specific order
     */
    public function index(Order $order)
    {
        // Check if user has access (client or team member)
        $user = auth()->user();
        $hasAccess = false;

        if ($user->id === $order->user_id) {
            // Client owns the order
            $hasAccess = true;
        } elseif ($user->role === 'programmer' && $order->team) {
            // Check if programmer is in the team
            $hasAccess = $order->team->members()->where('user_id', $user->id)->exists();
        }

        if (!$hasAccess) {
            abort(403, 'Unauthorized access');
        }

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

        // Check if user can add progress (only team members)
        $canAddProgress = $user->role === 'programmer' && $order->team && 
                         $order->team->members()->where('user_id', $user->id)->exists();

        return Inertia::render('Orders/Progress', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'service_name' => $order->service->name ?? 'N/A',
                'status' => $order->status,
                'payment_status' => $order->payment_status,
            ],
            'progressList' => $progressList,
            'canAddProgress' => $canAddProgress,
        ]);
    }

    /**
     * Store a new progress update
     */
    public function store(Request $request, Order $order)
    {
        $user = auth()->user();

        // Verify user is in the team
        if ($user->role !== 'programmer' || !$order->team || !$order->team->members()->where('user_id', $user->id)->exists()) {
            abort(403, 'Only team members can add progress');
        }

        $validated = $request->validate([
            'description' => 'required|string|max:2000',
            'progress_percentage' => 'required|integer|min:0|max:100',
            'file' => 'nullable|file|max:10240', // 10MB max
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('progress-files', 'public');
        }

        OrderProgress::create([
            'order_id' => $order->id,
            'programmer_id' => $user->id,
            'description' => $validated['description'],
            'progress_percentage' => $validated['progress_percentage'],
            'file_path' => $filePath,
        ]);

        return redirect()->back()->with('success', 'Progress berhasil ditambahkan');
    }

    /**
     * Update an existing progress
     */
    public function update(Request $request, Order $order, OrderProgress $progress)
    {
        $user = auth()->user();

        // Verify user is the progress creator
        if ($progress->programmer_id !== $user->id) {
            abort(403, 'You can only edit your own progress');
        }

        $validated = $request->validate([
            'description' => 'required|string|max:2000',
            'progress_percentage' => 'required|integer|min:0|max:100',
            'file' => 'nullable|file|max:10240',
        ]);

        $filePath = $progress->file_path;
        if ($request->hasFile('file')) {
            // Delete old file
            if ($filePath) {
                Storage::disk('public')->delete($filePath);
            }
            $filePath = $request->file('file')->store('progress-files', 'public');
        }

        $progress->update([
            'description' => $validated['description'],
            'progress_percentage' => $validated['progress_percentage'],
            'file_path' => $filePath,
        ]);

        return redirect()->back()->with('success', 'Progress berhasil diupdate');
    }

    /**
     * Delete a progress update
     */
    public function destroy(Order $order, OrderProgress $progress)
    {
        $user = auth()->user();

        // Verify user is the progress creator
        if ($progress->programmer_id !== $user->id) {
            abort(403, 'You can only delete your own progress');
        }

        // Delete file if exists
        if ($progress->file_path) {
            Storage::disk('public')->delete($progress->file_path);
        }

        $progress->delete();

        return redirect()->back()->with('success', 'Progress berhasil dihapus');
    }

    /**
     * Add a comment to a progress update
     */
    public function addComment(Request $request, Order $order, OrderProgress $progress)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        ProgressComment::create([
            'progress_id' => $progress->id,
            'user_id' => auth()->id(),
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Komentar berhasil ditambahkan');
    }

    /**
     * Delete a comment
     */
    public function deleteComment(Order $order, OrderProgress $progress, ProgressComment $comment)
    {
        // User can only delete their own comments
        if ($comment->user_id !== auth()->id()) {
            abort(403, 'You can only delete your own comments');
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Komentar berhasil dihapus');
    }
}
