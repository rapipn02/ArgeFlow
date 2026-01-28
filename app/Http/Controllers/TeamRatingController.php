<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\TeamRating;
use Illuminate\Http\Request;

class TeamRatingController extends Controller
{
    /**
     * Store a new team rating
     */
    public function store(Request $request, Order $order)
    {
        // Ensure user owns the order
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        // Ensure order is completed and fully paid
        if ($order->payment_status !== 'fully_paid' || $order->status !== 'completed') {
            return back()->with('error', 'Rating hanya dapat diberikan setelah order selesai dan lunas');
        }

        // Check if rating already exists
        if ($order->teamRating) {
            return back()->with('error', 'Anda sudah memberikan rating untuk order ini');
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        TeamRating::create([
            'team_id' => $order->team_id,
            'user_id' => auth()->id(),
            'order_id' => $order->id,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
        ]);

        return back()->with('success', 'Terima kasih! Rating Anda telah disimpan');
    }
}
