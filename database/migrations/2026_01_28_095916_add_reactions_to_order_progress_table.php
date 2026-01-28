<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_progress', function (Blueprint $table) {
            $table->integer('likes_count')->default(0)->after('progress_percentage');
            $table->integer('dislikes_count')->default(0)->after('likes_count');
        });

        // Create table to track who liked/disliked
        Schema::create('progress_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_progress_id')->constrained('order_progress')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['like', 'dislike']);
            $table->timestamps();

            $table->unique(['order_progress_id', 'user_id']); // One reaction per user per progress
            $table->index(['order_progress_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_reactions');
        
        Schema::table('order_progress', function (Blueprint $table) {
            $table->dropColumn(['likes_count', 'dislikes_count']);
        });
    }
};
