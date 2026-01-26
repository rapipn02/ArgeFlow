<?php

namespace App\Http\Controllers\Programmer;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgrammerTeamController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $teams = TeamMember::where('user_id', $user->id)
            ->with(['team.members.user', 'team.orders'])
            ->get()
            ->map(function ($membership) {
                $team = $membership->team;

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'description' => $team->description,
                    'specialization' => $team->specialization,
                    'avatar' => $team->avatar,
                    'is_available' => $team->is_available,
                    'average_rating' => $team->average_rating,
                    'total_projects' => $team->total_projects,
                    'completed_projects' => $team->completed_projects,
                    'my_role' => $membership->role,
                    'joined_at' => $membership->created_at->format('d M Y'),
                    'members' => $team->members->map(function ($member) {
                        return [
                            'id' => $member->user->id,
                            'name' => $member->user->name,
                            'email' => $member->user->email,
                            'avatar' => $member->user->avatar,
                            'role' => $member->role,
                        ];
                    }),
                    'active_projects' => $team->orders()
                        ->whereIn('status', ['dp_paid', 'in_progress', 'final_payment'])
                        ->count(),
                ];
            });

        return Inertia::render('Programmer/Teams/Index', [
            'teams' => $teams,
        ]);
    }
}
