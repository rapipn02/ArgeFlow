<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('programmer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('assigned_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('service_id')->nullable()->constrained('services')->onDelete('set null');
            
            $table->string('title');
            $table->text('description');
            $table->date('deadline');
            
            $table->decimal('total_price', 15, 2);
            $table->decimal('dp_amount', 15, 2);
            $table->decimal('final_amount', 15, 2);
            
            $table->enum('status', [
                'pending_payment',
                'pending_assignment',
                'assigned',
                'in_progress',
                'pending_approval',
                'pending_final_payment',
                'completed',
                'cancelled'
            ])->default('pending_payment');
            
            $table->enum('payment_status', [
                'pending_dp',
                'dp_paid',
                'pending_final',
                'fully_paid',
                'refunded'
            ])->default('pending_dp');
            
            $table->enum('assignment_type', ['client_assigned', 'admin_assigned']);
            $table->integer('revision_count')->default(0);
            
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('status');
            $table->index('payment_status');
            $table->index(['client_id', 'status']);
            $table->index(['programmer_id', 'status']);
            $table->index('deadline');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
