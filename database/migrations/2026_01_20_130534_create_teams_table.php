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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description');
            $table->string('specialization'); // web, mobile, fullstack
            $table->string('avatar')->nullable();
            $table->boolean('is_available')->default(true);
            $table->decimal('average_rating', 3, 2)->default(0); // 0.00 - 5.00
            $table->integer('total_projects')->default(0);
            $table->integer('completed_projects')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('is_available');
            $table->index('average_rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
