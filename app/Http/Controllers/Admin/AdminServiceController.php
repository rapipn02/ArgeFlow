<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminServiceController extends Controller
{
    /**
     * Display a listing of services
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'desc')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->price,
                    'formatted_price' => $service->formatted_price,
                    'icon' => $service->icon,
                    'is_active' => $service->is_active,
                    'features' => $service->features ?? [],
                    'estimated_days' => $service->estimated_days,
                    'category' => $service->category,
                ];
            });

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    /**
     * Store a newly created service
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'features' => 'nullable|array',
            'estimated_days' => 'nullable|integer|min:1',
            'category' => 'nullable|string|max:255',
        ]);

        Service::create($validated);

        return redirect()->back()->with('success', 'Layanan berhasil ditambahkan');
    }

    /**
     * Update the specified service
     */
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'icon' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'features' => 'nullable|array',
            'estimated_days' => 'nullable|integer|min:1',
            'category' => 'nullable|string|max:255',
        ]);

        $service->update($validated);

        return redirect()->back()->with('success', 'Layanan berhasil diupdate');
    }

    /**
     * Remove the specified service
     */
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->back()->with('success', 'Layanan berhasil dihapus');
    }

    /**
     * Toggle service active status
     */
    public function toggleActive($id)
    {
        $service = Service::findOrFail($id);
        $service->update(['is_active' => !$service->is_active]);

        $status = $service->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->back()->with('success', "Layanan berhasil {$status}");
    }
}
