<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('order_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('programmer_id')->constrained('users')->onDelete('cascade');
            $table->text('description');
            $table->string('file_path')->nullable();
            $table->integer('progress_percentage')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['order_id', 'created_at']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('order_progress');
    }
};