<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of user's orders
     */
    public function index(Request $request)
    {
        $orders = Order::with(['service', 'team.members.user', 'rating'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new order
     */
    public function create(Request $request)
    {
        $serviceId = $request->query('service_id');
        $teamId = $request->query('team_id');

        if (!$serviceId) {
            return redirect()->route('services.index')
                ->with('error', 'Please select a service first');
        }

        $service = Service::findOrFail($serviceId);
        $team = $teamId ? Team::with('members')->findOrFail($teamId) : null;

        return Inertia::render('Orders/Create', [
            'service' => $service,
            'team' => $team,
        ]);
    }

    /**
     * Store a newly created order
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'team_id' => 'nullable|exists:teams,id',
            'team_preference' => 'nullable|in:choose_team,auto_assign',
            'notes' => 'nullable|string|max:1000',
            'requirements' => 'nullable|string|max:2000',
        ]);

        $service = Service::findOrFail($validated['service_id']);

        // Create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'service_id' => $service->id,
            'team_id' => $validated['team_id'] ?? null,
            'team_preference' => $validated['team_preference'] ?? 'auto_assign',
            'total_amount' => $service->price,
            'status' => 'pending',
            'payment_status' => 'pending',
            'notes' => $validated['notes'] ?? null,
            'requirements' => $validated['requirements'] ?? null,
        ]);

        return redirect()->route('payment.show', ['order' => $order->id])
            ->with('success', 'Order created successfully! Please complete the payment.');
    }

    /**
     * Display the specified order
     */
    public function show(Order $order)
    {
        // Ensure user can only view their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        $order->load(['service', 'team.members.user', 'teamRating']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Cancel an order
     */
    public function cancel(Order $order)
    {
        // Ensure user can only cancel their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access');
        }

        // Only allow cancellation of pending orders
        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled');
        }

        $order->update([
            'status' => 'cancelled',
            'payment_status' => 'failed',
        ]);

        return redirect()->route('orders.index')
            ->with('success', 'Order cancelled successfully');
    }
}
