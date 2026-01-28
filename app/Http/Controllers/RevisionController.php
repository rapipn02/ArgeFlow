<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Revision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RevisionController extends Controller
{
    /**
     * Store a new revision request from client
     */
    public function store(Request $request, Order $order)
    {
        $user = auth()->user();

        // Verify user is the order owner
        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        // Check if can request revision
        if (!$order->canRequestRevision()) {
            return redirect()->back()->with('error', 'Maksimal revisi adalah 2 kali');
        }

        // Check if order is awaiting review
        if ($order->status !== 'awaiting_review') {
            return redirect()->back()->with('error', 'Order tidak dalam status awaiting review');
        }

        $validated = $request->validate([
            'description' => 'required|string|max:2000',
            'file' => 'nullable|file|max:10240', // 10MB max
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('revision-files', 'public');
        }

        // Create revision
        Revision::create([
            'order_id' => $order->id,
            'client_id' => $user->id,
            'description' => $validated['description'],
            'file_path' => $filePath,
            'status' => 'pending',
            'revision_number' => $order->revision_count + 1,
        ]);

        // Update order status
        $order->requestRevision();

        return redirect()->back()->with('success', 'Permintaan revisi berhasil dikirim');
    }

    /**
     * Accept completion (no revision needed)
     */
    public function acceptCompletion(Order $order)
    {
        $user = auth()->user();

        // Verify user is the order owner
        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        // Check if order is awaiting review
        if ($order->status !== 'awaiting_review') {
            return redirect()->back()->with('error', 'Order tidak dalam status awaiting review');
        }

        // Accept completion
        $order->acceptCompletion();

        return redirect()->route('orders.show', $order)->with('success', 'Proyek diterima! Silakan lakukan pembayaran pelunasan.');
    }

    /**
     * Update revision status (programmer marks as completed)
     */
    public function updateStatus(Request $request, Order $order, Revision $revision)
    {
        $user = auth()->user();

        // Verify user is in the team
        if ($user->role !== 'programmer' || !$order->team || !$order->team->members()->where('user_id', $user->id)->exists()) {
            abort(403, 'Only team members can update revision status');
        }

        $validated = $request->validate([
            'status' => 'required|in:in_progress,completed',
        ]);

        $revision->update([
            'status' => $validated['status'],
        ]);

        // If revision completed, programmer should submit new progress 100%
        return redirect()->back()->with('success', 'Status revisi berhasil diupdate');
    }
}
