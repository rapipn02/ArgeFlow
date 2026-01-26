<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('order_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type', 50);
            $table->unsignedBigInteger('file_size');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index('order_id');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('order_files');
    }
};