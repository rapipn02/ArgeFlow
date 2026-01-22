<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminProgrammerController extends Controller
{
    /**
     * Display a listing of programmers
     */
    public function index(Request $request)
    {
        $query = User::where('role', 'programmer')
            ->with('programmerProfile');

        // Search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $programmers = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->through(function ($programmer) {
                return [
                    'id' => $programmer->id,
                    'name' => $programmer->name,
                    'email' => $programmer->email,
                    'phone' => $programmer->phone,
                    'avatar' => $programmer->avatar,
                    'created_at' => $programmer->created_at->format('d M Y'),
                    'profile' => $programmer->programmerProfile ? [
                        'bio' => $programmer->programmerProfile->bio,
                        'hourly_rate' => $programmer->programmerProfile->hourly_rate,
                        'portfolio_url' => $programmer->programmerProfile->portfolio_url,
                        'is_available' => $programmer->programmerProfile->is_available,
                    ] : null,
                ];
            });

        return Inertia::render('Admin/Programmers/Index', [
            'programmers' => $programmers,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created programmer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'portfolio_url' => 'nullable|url',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'programmer';

        // Create user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'phone' => $validated['phone'],
            'role' => 'programmer',
        ]);

        // Create programmer profile
        $user->programmerProfile()->create([
            'bio' => $validated['bio'] ?? null,
            'hourly_rate' => $validated['hourly_rate'] ?? null,
            'portfolio_url' => $validated['portfolio_url'] ?? null,
            'is_available' => true,
        ]);

        return redirect()->back()->with('success', 'Programmer berhasil ditambahkan');
    }

    /**
     * Update the specified programmer
     */
    public function update(Request $request, $id)
    {
        $programmer = User::where('role', 'programmer')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
            'bio' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'portfolio_url' => 'nullable|url',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $programmer->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => $validated['password'] ?? $programmer->password,
        ]);

        // Update or create programmer profile
        $programmer->programmerProfile()->updateOrCreate(
            ['user_id' => $programmer->id],
            [
                'bio' => $validated['bio'] ?? null,
                'hourly_rate' => $validated['hourly_rate'] ?? null,
                'portfolio_url' => $validated['portfolio_url'] ?? null,
            ]
        );

        return redirect()->back()->with('success', 'Programmer berhasil diupdate');
    }

    /**
     * Remove the specified programmer
     */
    public function destroy($id)
    {
        $programmer = User::where('role', 'programmer')->findOrFail($id);

        // Prevent deleting programmer that is in a team
        if ($programmer->teamMemberships()->exists()) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus programmer yang masih tergabung dalam tim');
        }

        $programmer->delete();

        return redirect()->back()->with('success', 'Programmer berhasil dihapus');
    }
}
