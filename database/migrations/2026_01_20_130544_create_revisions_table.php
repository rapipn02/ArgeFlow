<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->text('description');
            $table->string('file_path')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->unsignedTinyInteger('revision_number');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['order_id', 'revision_number']);
            $table->index(['order_id', 'status']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('revisions');
    }
};