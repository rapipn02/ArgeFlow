<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->enum('payment_type', ['dp', 'final']);
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'expired'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('payment_gateway')->default('midtrans');
            $table->string('transaction_id')->nullable()->unique();
            $table->string('snap_token')->nullable();
            $table->json('gateway_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
            
            $table->index(['project_id', 'payment_type']);
            $table->index('status');
            $table->index('transaction_id');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};