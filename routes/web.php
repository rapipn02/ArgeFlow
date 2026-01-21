<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/dashboard', function () {
    return redirect()->route('services.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Service Selection
    Route::get('/services', function () {
        return Inertia::render('Services/Index');
    })->name('services.index');

    // Team Preference
    Route::get('/services/{id}/team-preference', function ($id) {
        // Mock service data - nanti akan diganti dengan data dari database
        $services = [
            1 => ['id' => 1, 'name' => 'Website Landing Page', 'price' => 3000000],
            2 => ['id' => 2, 'name' => 'Web Company Profile', 'price' => 8000000],
            3 => ['id' => 3, 'name' => 'E-Commerce Website', 'price' => 15000000],
            4 => ['id' => 4, 'name' => 'Mobile App (Android)', 'price' => 20000000],
        ];

        $service = $services[$id] ?? abort(404);

        return Inertia::render('Services/TeamPreference', [
            'service' => $service
        ]);
    })->name('services.team-preference');

    // Team Selection
    Route::get('/services/{serviceId}/teams', [\App\Http\Controllers\TeamController::class, 'index'])->name('teams.index');
    Route::get('/teams/{id}', [\App\Http\Controllers\TeamController::class, 'show'])->name('teams.show');

    // Orders
    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [\App\Http\Controllers\OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\OrderController::class, 'cancel'])->name('orders.cancel');

    // Payments
    Route::get('/payment/success', [\App\Http\Controllers\PaymentController::class, 'success'])->name('payment.success');
    Route::get('/payment/failed', [\App\Http\Controllers\PaymentController::class, 'failed'])->name('payment.failed');
    Route::get('/payment/{order}', [\App\Http\Controllers\PaymentController::class, 'show'])->name('payment.show');
    Route::post('/payment/{order}/token', [\App\Http\Controllers\PaymentController::class, 'createToken'])->name('payment.token');
    Route::get('/payment/{order}/status', [\App\Http\Controllers\PaymentController::class, 'checkStatus'])->name('payment.status');

    // Invoices
    Route::get('/invoice/{order}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('invoice.show');
    Route::get('/invoice/{order}/download', [\App\Http\Controllers\InvoiceController::class, 'download'])->name('invoice.download');
});

// Midtrans Webhook (no auth required)
Route::post('/payment/notification', [\App\Http\Controllers\PaymentController::class, 'handleNotification'])->name('payment.notification');


require __DIR__ . '/auth.php';
