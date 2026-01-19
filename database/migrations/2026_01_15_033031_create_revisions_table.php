<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->text('description');
            $table->string('file_path')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->unsignedTinyInteger('revision_number');
            $table->timestamps();
            $table->softDeletes();
            
            $table->unique(['project_id', 'revision_number']);
            $table->index(['project_id', 'status']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('revisions');
    }
};