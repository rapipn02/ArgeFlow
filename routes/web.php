<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->isProgrammer()) {
        return redirect()->route('programmer.dashboard');
    }

    return redirect()->route('services.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Service API Routes
    Route::get('/api/services', [\App\Http\Controllers\ServiceController::class, 'index'])->name('api.services.index');
    Route::get('/api/services/{id}', [\App\Http\Controllers\ServiceController::class, 'show'])->name('api.services.show');
    Route::post('/api/services/calculate-price', [\App\Http\Controllers\ServiceController::class, 'calculatePrice'])->name('api.services.calculate-price');

    // Service Selection
    Route::get('/services', function () {
        return Inertia::render('Services/Index');
    })->name('services.index');

    // Team Preference
    Route::get('/services/{id}/team-preference', function ($id) {
        $service = \App\Models\Service::findOrFail($id);

        return Inertia::render('Services/TeamPreference', [
            'service' => [
                'id' => $service->id,
                'name' => $service->name,
                'price' => $service->price,
                'description' => $service->description,
                'standard_days' => $service->standard_days,
                'risk_factor' => $service->risk_factor,
            ]
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

    // Progress & Comments (Shared: Client + Programmer can view and comment)
    Route::get('/orders/{order}/progress', [\App\Http\Controllers\ProgressController::class, 'index'])->name('orders.progress');
    Route::post('/orders/{order}/progress/{progress}/comments', [\App\Http\Controllers\ProgressController::class, 'addComment'])->name('orders.progress.comments.store');
    Route::delete('/orders/{order}/progress/{progress}/comments/{comment}', [\App\Http\Controllers\ProgressController::class, 'deleteComment'])->name('orders.progress.comments.destroy');

    // Progress Reactions (Client can like/dislike progress)
    Route::post('/progress/{progress}/reaction', [\App\Http\Controllers\ProgressReactionController::class, 'toggle'])->name('progress.reaction.toggle');
    // Revision & Completion (Client Actions)
    Route::post('/orders/{order}/revisions', [\App\Http\Controllers\RevisionController::class, 'store'])->name('orders.revisions.store');
    Route::post('/orders/{order}/accept-completion', [\App\Http\Controllers\RevisionController::class, 'acceptCompletion'])->name('orders.accept-completion');

    // Team Rating (Client can rate team after order completion)
    Route::post('/orders/{order}/team-rating', [\App\Http\Controllers\TeamRatingController::class, 'store'])->name('team-ratings.store');

    // Payments
    Route::get('/payment/success', [\App\Http\Controllers\PaymentController::class, 'success'])->name('payment.success');
    Route::get('/payment/failed', [\App\Http\Controllers\PaymentController::class, 'failed'])->name('payment.failed');
    Route::get('/payment/{order}', [\App\Http\Controllers\PaymentController::class, 'show'])->name('payment.show');
    Route::post('/payment/{order}/token', [\App\Http\Controllers\PaymentController::class, 'createToken'])->name('payment.token');
    Route::get('/payment/{order}/status', [\App\Http\Controllers\PaymentController::class, 'checkStatus'])->name('payment.status');

    // Invoices
    Route::get('/invoice/{order}', [\App\Http\Controllers\InvoiceController::class, 'show'])->name('invoice.show');
    Route::get('/invoice/{order}/download', [\App\Http\Controllers\InvoiceController::class, 'download'])->name('invoice.download');

    // Programmer Routes
    Route::middleware('programmer')->prefix('programmer')->name('programmer.')->group(function () {
        // Dashboard
        Route::get('/dashboard', [\App\Http\Controllers\Programmer\ProgrammerDashboardController::class, 'index'])->name('dashboard');

        // Projects
        Route::get('/projects', [\App\Http\Controllers\Programmer\ProgrammerProjectController::class, 'index'])->name('projects.index');
        Route::get('/projects/{order}', [\App\Http\Controllers\Programmer\ProgrammerProjectController::class, 'show'])->name('projects.show');

        // Progress Management (Programmer Actions)
        Route::post('/orders/{order}/progress', [\App\Http\Controllers\ProgressController::class, 'store'])->name('orders.progress.store');
        Route::put('/orders/{order}/progress/{progress}', [\App\Http\Controllers\ProgressController::class, 'update'])->name('orders.progress.update');
        Route::delete('/orders/{order}/progress/{progress}', [\App\Http\Controllers\ProgressController::class, 'destroy'])->name('orders.progress.destroy');
        Route::post('/orders/{order}/submit-for-review', [\App\Http\Controllers\ProgressController::class, 'submitForReview'])->name('orders.submit-for-review');

        // Earnings
        Route::get('/earnings', [\App\Http\Controllers\Programmer\ProgrammerEarningController::class, 'index'])->name('earnings.index');

        // Profile
        Route::get('/profile', [\App\Http\Controllers\Programmer\ProgrammerProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [\App\Http\Controllers\Programmer\ProgrammerProfileController::class, 'update'])->name('profile.update');
        Route::get('/profile/setup', [\App\Http\Controllers\Programmer\ProgrammerProfileController::class, 'setup'])->name('profile.setup');
        Route::post('/profile/setup', [\App\Http\Controllers\Programmer\ProgrammerProfileController::class, 'storeSetup'])->name('profile.setup.store');

        // Teams
        Route::get('/teams', [\App\Http\Controllers\Programmer\ProgrammerTeamController::class, 'index'])->name('teams.index');
    });

    // Admin Routes (Superadmin only)
    Route::middleware('superadmin')->prefix('admin')->name('admin.')->group(function () {
        // Dashboard
        Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');

        // Transactions
        Route::resource('transactions', \App\Http\Controllers\Admin\AdminTransactionController::class);

        // Users
        Route::resource('users', \App\Http\Controllers\Admin\AdminUserController::class);

        // Programmers
        Route::resource('programmers', \App\Http\Controllers\Admin\AdminProgrammerController::class);

        // Teams
        Route::resource('teams', \App\Http\Controllers\Admin\AdminTeamController::class);
        Route::post('/teams/{team}/assign', [\App\Http\Controllers\Admin\AdminTeamController::class, 'assignMember'])->name('teams.assign');
        Route::delete('/teams/{team}/members/{user}', [\App\Http\Controllers\Admin\AdminTeamController::class, 'removeMember'])->name('teams.remove-member');
        Route::post('/teams/{team}/toggle-availability', [\App\Http\Controllers\Admin\AdminTeamController::class, 'toggleAvailability'])->name('teams.toggle-availability');
        Route::post('/orders/{order}/auto-assign', [\App\Http\Controllers\Admin\AdminTeamController::class, 'autoAssign'])->name('orders.auto-assign');
        Route::post('/orders/{order}/manual-assign', [\App\Http\Controllers\Admin\AdminTeamController::class, 'manualAssign'])->name('orders.manual-assign');

        // Services
        Route::resource('services', \App\Http\Controllers\Admin\AdminServiceController::class);
        Route::post('/services/{service}/toggle', [\App\Http\Controllers\Admin\AdminServiceController::class, 'toggleActive'])->name('services.toggle');

        // Progress & Comments Monitoring
        Route::get('/progress', [\App\Http\Controllers\Admin\AdminProgressController::class, 'index'])->name('progress.index');
        Route::get('/progress/{order}', [\App\Http\Controllers\Admin\AdminProgressController::class, 'show'])->name('progress.show');
    });
});

// Midtrans Webhook (no auth required)
Route::post('/payment/notification', [\App\Http\Controllers\PaymentController::class, 'handleNotification'])->name('payment.notification');


require __DIR__ . '/auth.php';
