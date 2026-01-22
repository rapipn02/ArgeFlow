<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTeamController extends Controller
{
    /**
     * Display a listing of teams
     */
    public function index()
    {
        $teams = Team::withCount('members')
            ->with(['members.user'])
            ->get()
            ->map(function ($team) {
                // Calculate workload (active orders)
                $activeOrders = Order::where('team_id', $team->id)
                    ->whereIn('status', ['pending', 'in_progress'])
                    ->count();

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'description' => $team->description,
                    'members_count' => $team->members_count,
                    'members' => $team->members
                        ->filter(function ($member) {
                            return $member->user !== null;
                        })
                        ->map(function ($member) {
                            return [
                                'id' => $member->user->id,
                                'name' => $member->user->name,
                                'email' => $member->user->email,
                                'role' => $member->role,
                            ];
                        })
                        ->values(), // Reset array keys
                    'average_rating' => $team->average_rating ?? 0,
                    'workload' => $activeOrders,
                    'status' => $activeOrders > 3 ? 'busy' : 'available',
                ];
            });

        // Get programmers (users with role programmer)
        $programmers = User::where('role', 'programmer')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams,
            'programmers' => $programmers,
        ]);
    }

    /**
     * Store a newly created team
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $team = Team::create($validated);

        return redirect()->back()->with('success', 'Tim berhasil dibuat');
    }

    /**
     * Update the specified team
     */
    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $team->update($validated);

        return redirect()->back()->with('success', 'Tim berhasil diupdate');
    }

    /**
     * Remove the specified team
     */
    public function destroy($id)
    {
        $team = Team::findOrFail($id);

        // Check if team has active orders
        $activeOrders = Order::where('team_id', $id)
            ->whereIn('status', ['pending', 'in_progress'])
            ->count();

        if ($activeOrders > 0) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus tim yang masih memiliki order aktif');
        }

        $team->delete();

        return redirect()->back()->with('success', 'Tim berhasil dihapus');
    }

    /**
     * Assign a programmer to a team
     */
    public function assignMember(Request $request, $teamId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'nullable|string|max:255',
        ]);

        // Check if user is already in the team
        $exists = TeamMember::where('team_id', $teamId)
            ->where('user_id', $validated['user_id'])
            ->exists();

        if ($exists) {
            return redirect()->back()->with('error', 'Programmer sudah ada di tim ini');
        }

        TeamMember::create([
            'team_id' => $teamId,
            'user_id' => $validated['user_id'],
            'role' => $validated['role'] ?? 'member',
        ]);

        return redirect()->back()->with('success', 'Programmer berhasil ditambahkan ke tim');
    }

    /**
     * Remove a programmer from a team
     */
    public function removeMember($teamId, $userId)
    {
        TeamMember::where('team_id', $teamId)
            ->where('user_id', $userId)
            ->delete();

        return redirect()->back()->with('success', 'Programmer berhasil dihapus dari tim');
    }

    /**
     * Auto-assign team to an order based on workload
     */
    public function autoAssign($orderId)
    {
        $order = Order::findOrFail($orderId);

        // Get team with lowest workload
        $teams = Team::all();
        $teamWorkloads = [];

        foreach ($teams as $team) {
            $activeOrders = Order::where('team_id', $team->id)
                ->whereIn('status', ['pending', 'in_progress'])
                ->count();

            $teamWorkloads[$team->id] = $activeOrders;
        }

        // Sort by workload (ascending)
        asort($teamWorkloads);
        $selectedTeamId = array_key_first($teamWorkloads);

        if ($selectedTeamId) {
            $order->update(['team_id' => $selectedTeamId]);
            return redirect()->back()->with('success', 'Tim berhasil di-assign secara otomatis');
        }

        return redirect()->back()->with('error', 'Tidak ada tim yang tersedia');
    }
}
