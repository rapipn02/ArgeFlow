<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display a listing of available teams
     */
    public function index(Request $request, $serviceId = null)
    {
        $query = Team::with(['members.user'])
            ->available()
            ->withCount('ratings');

        // Filter by specialization if provided
        if ($request->has('specialization')) {
            $query->bySpecialization($request->specialization);
        }

        // Sort by rating or projects
        $sortBy = $request->get('sort_by', 'rating');
        if ($sortBy === 'rating') {
            $query->orderBy('average_rating', 'desc');
        } elseif ($sortBy === 'projects') {
            $query->orderBy('completed_projects', 'desc');
        }

        $teams = $query->get()->map(function ($team) {
            return [
                'id' => $team->id,
                'name' => $team->name,
                'description' => $team->description,
                'specialization' => $team->specialization,
                'avatar' => $team->avatar,
                'average_rating' => $team->average_rating,
                'total_projects' => $team->total_projects,
                'completed_projects' => $team->completed_projects,
                'members' => $team->members->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'name' => $member->user ? $member->user->name : ($member->name ?? 'Unknown'),
                        'role' => $member->role ?? 'Member',
                        'avatar' => $member->user ? $member->user->avatar : $member->avatar,
                    ];
                })->filter(fn($m) => $m['name'] !== null),
            ];
        });

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
            'serviceId' => $serviceId,
            'filters' => [
                'specialization' => $request->get('specialization'),
                'sort_by' => $sortBy,
            ],
        ]);
    }

    /**
     * Display the specified team
     */
    public function show(Request $request, $id)
    {
        $team = Team::with(['members.user', 'ratings.user'])
            ->withCount('ratings')
            ->findOrFail($id);

        // Transform team data
        $teamData = [
            'id' => $team->id,
            'name' => $team->name,
            'description' => $team->description,
            'specialization' => $team->specialization,
            'avatar' => $team->avatar,
            'average_rating' => $team->average_rating,
            'total_projects' => $team->total_projects,
            'completed_projects' => $team->completed_projects,
            'members' => $team->members->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->user ? $member->user->name : ($member->name ?? 'Unknown'),
                    'role' => $member->role ?? 'Member',
                    'avatar' => $member->user ? $member->user->avatar : $member->avatar,
                    'bio' => $member->bio,
                ];
            })->filter(fn($m) => $m['name'] !== null),
            'ratings' => $team->ratings,
        ];

        return Inertia::render('Teams/Show', [
            'team' => $teamData,
            'serviceId' => $request->query('service_id'),
        ]);
    }
}
