<?php

namespace App\Http\Controllers;

use App\Models\OrderProgress;
use App\Models\ProgressReaction;
use Illuminate\Http\Request;

class ProgressReactionController extends Controller
{
    /**
     * Toggle reaction (like/dislike)
     */
    public function toggle(Request $request, OrderProgress $progress)
    {
        // Ensure user is the order owner (client)
        if ($progress->order->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'type' => 'required|in:like,dislike',
        ]);

        $existingReaction = $progress->reactions()
            ->where('user_id', auth()->id())
            ->first();

        if ($existingReaction) {
            // If clicking the same reaction, remove it
            if ($existingReaction->type === $validated['type']) {
                $existingReaction->delete();
                $action = 'removed';
            } else {
                // If clicking different reaction, update it
                $existingReaction->update(['type' => $validated['type']]);
                $action = 'updated';
            }
        } else {
            // Create new reaction
            ProgressReaction::create([
                'order_progress_id' => $progress->id,
                'user_id' => auth()->id(),
                'type' => $validated['type'],
            ]);
            $action = 'created';
        }

        // Refresh progress to get updated counts
        $progress->refresh();

        return response()->json([
            'success' => true,
            'action' => $action,
            'likes_count' => $progress->likes_count,
            'dislikes_count' => $progress->dislikes_count,
            'user_reaction' => $progress->userReaction(auth()->id())?->type,
        ]);
    }
}
