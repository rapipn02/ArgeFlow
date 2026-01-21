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
        $query = Team::with('members')
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

        $teams = $query->get();

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
        $team = Team::with(['members', 'ratings.user'])
            ->withCount('ratings')
            ->findOrFail($id);

        return Inertia::render('Teams/Show', [
            'team' => $team,
            'serviceId' => $request->query('service_id'),
        ]);
    }
}
