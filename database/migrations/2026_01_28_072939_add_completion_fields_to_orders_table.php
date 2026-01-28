<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Add new statuses for completion flow
            // Existing: pending, dp_paid, in_progress, final_payment, completed, cancelled
            // Will add: awaiting_review, revision_requested via ALTER
            
            // Revision tracking
            $table->unsignedTinyInteger('revision_count')->default(0)->after('requirements');
            $table->timestamp('completion_submitted_at')->nullable()->after('revision_count');
            $table->timestamp('accepted_at')->nullable()->after('completion_submitted_at');
            
            // Index for queries
            $table->index('revision_count');
        });

        // Update enum to add new statuses
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'dp_paid', 'in_progress', 'awaiting_review', 'revision_requested', 'final_payment', 'completed', 'cancelled') DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['revision_count']);
            $table->dropColumn(['revision_count', 'completion_submitted_at', 'accepted_at']);
        });

        // Revert enum
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'dp_paid', 'in_progress', 'final_payment', 'completed', 'cancelled') DEFAULT 'pending'");
    }
};
