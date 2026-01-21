<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('team_preference', ['choose_team', 'auto_assign']);
            $table->decimal('total_amount', 15, 2);
            $table->decimal('dp_amount', 15, 2); // 40% DP
            $table->decimal('final_amount', 15, 2); // 60% Final
            $table->enum('status', ['pending', 'dp_paid', 'in_progress', 'final_payment', 'completed', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'dp_paid', 'fully_paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('midtrans_order_id')->nullable();
            $table->string('midtrans_snap_token')->nullable();
            $table->timestamp('dp_paid_at')->nullable();
            $table->timestamp('final_paid_at')->nullable();
            $table->text('notes')->nullable();
            $table->text('requirements')->nullable(); // Detail kebutuhan project
            $table->timestamps();
            $table->softDeletes();

            $table->index('order_number');
            $table->index('user_id');
            $table->index('status');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
