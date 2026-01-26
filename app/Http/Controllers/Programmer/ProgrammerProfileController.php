<?php

namespace App\Http\Controllers\Programmer;

use App\Http\Controllers\Controller;
use App\Models\ProgrammerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProgrammerProfileController extends Controller
{
    public function edit()
    {
        $user = auth()->user();
        $profile = $user->programmerProfile;

        $profileData = [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
            'bio' => $profile->bio ?? '',
            'hourly_rate' => $profile->hourly_rate ?? 0,
            'portfolio_url' => $profile->portfolio_url ?? '',
            'bank_name' => $profile->bank_name ?? '',
            'bank_account_number' => $profile->bank_account_number ?? '',
            'bank_account_holder' => $profile->bank_account_holder ?? '',
            'is_available' => $profile->is_available ?? true,
        ];

        return Inertia::render('Programmer/Profile/Edit', [
            'profile' => $profileData,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'portfolio_url' => 'nullable|url',
            'bank_name' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'bank_account_holder' => 'nullable|string|max:255',
            'is_available' => 'boolean',
            'avatar' => 'nullable|image|max:2048',
        ]);

        // Update user data
        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->update(['avatar' => $avatarPath]);
        }

        // Update or create programmer profile
        $profile = $user->programmerProfile;

        if ($profile) {
            $profile->update([
                'bio' => $validated['bio'] ?? null,
                'hourly_rate' => $validated['hourly_rate'] ?? null,
                'portfolio_url' => $validated['portfolio_url'] ?? null,
                'bank_name' => $validated['bank_name'] ?? null,
                'bank_account_number' => $validated['bank_account_number'] ?? null,
                'bank_account_holder' => $validated['bank_account_holder'] ?? null,
                'is_available' => $validated['is_available'] ?? true,
            ]);
        } else {
            ProgrammerProfile::create([
                'user_id' => $user->id,
                'bio' => $validated['bio'] ?? null,
                'hourly_rate' => $validated['hourly_rate'] ?? null,
                'portfolio_url' => $validated['portfolio_url'] ?? null,
                'bank_name' => $validated['bank_name'] ?? null,
                'bank_account_number' => $validated['bank_account_number'] ?? null,
                'bank_account_holder' => $validated['bank_account_holder'] ?? null,
                'is_available' => $validated['is_available'] ?? true,
            ]);
        }

        return redirect()->route('programmer.profile.edit')
            ->with('success', 'Profile berhasil diupdate!');
    }

    public function setup()
    {
        return Inertia::render('Programmer/Profile/Setup');
    }

    public function storeSetup(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'bio' => 'required|string',
            'hourly_rate' => 'nullable|numeric|min:0',
            'portfolio_url' => 'nullable|url',
            'bank_name' => 'required|string|max:255',
            'bank_account_number' => 'required|string|max:255',
            'bank_account_holder' => 'required|string|max:255',
        ]);

        ProgrammerProfile::create([
            'user_id' => $user->id,
            'bio' => $validated['bio'],
            'hourly_rate' => $validated['hourly_rate'] ?? null,
            'portfolio_url' => $validated['portfolio_url'] ?? null,
            'bank_name' => $validated['bank_name'],
            'bank_account_number' => $validated['bank_account_number'],
            'bank_account_holder' => $validated['bank_account_holder'],
            'is_available' => true,
        ]);

        return redirect()->route('programmer.dashboard')
            ->with('success', 'Profile setup berhasil!');
    }
}
