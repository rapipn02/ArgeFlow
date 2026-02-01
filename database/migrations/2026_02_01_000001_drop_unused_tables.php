<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * 
     * Menghapus tabel-tabel yang tidak digunakan sama sekali:
     * - skills: Tidak ada controller, route, atau UI
     * - programmer_skills: Tidak ada insert data atau UI
     * - ratings: Sudah ada team_ratings yang dipakai
     * - orders_files: Tidak ada upload file functionality
     */
    public function up(): void
    {
        // Drop tabel yang tidak digunakan sama sekali
        Schema::dropIfExists('programmer_skills');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('orders_files');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate skills table
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // Recreate programmer_skills table
        Schema::create('programmer_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('programmer_profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->integer('proficiency_level')->default(1);
            $table->timestamps();
        });

        // Recreate ratings table
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('programmer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('rating');
            $table->text('review')->nullable();
            $table->timestamps();
        });

        // Recreate orders_files table
        Schema::create('orders_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->integer('file_size');
            $table->string('uploaded_by_type');
            $table->foreignId('uploaded_by_id');
            $table->timestamps();
        });
    }
};
