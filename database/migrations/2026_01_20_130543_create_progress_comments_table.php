<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('progress_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('progress_id')->constrained('order_progress')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('comment');
            $table->timestamps();

            $table->index('progress_id');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('progress_comments');
    }
};
