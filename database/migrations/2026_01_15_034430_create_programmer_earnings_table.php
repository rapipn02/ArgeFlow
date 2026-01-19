<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programmer_earnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->unique()->constrained()->onDelete('cascade');
            $table->foreignId('programmer_id')->constrained('users')->onDelete('cascade');
            $table->decimal('total_amount', 15, 2);
            $table->decimal('platform_fee', 15, 2)->default(0);
            $table->decimal('net_amount', 15, 2);
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->text('payment_notes')->nullable();
            $table->foreignId('paid_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index(['programmer_id', 'status']);
            $table->index('status');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('programmer_earnings');
    }
};