<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programmer_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('programmer_profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('skill_id')->constrained()->onDelete('cascade');
            $table->enum('level', ['beginner', 'intermediate', 'advanced', 'expert'])->nullable();
            $table->integer('years_experience')->nullable();
            $table->timestamps();
            
            $table->unique(['programmer_profile_id', 'skill_id']);
            $table->index('programmer_profile_id');
            $table->index('skill_id');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('programmer_skills');
    }
};