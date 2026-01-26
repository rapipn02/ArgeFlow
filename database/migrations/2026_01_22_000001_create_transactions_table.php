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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['income', 'expense'])->comment('Tipe transaksi: pemasukan atau pengeluaran');
            $table->string('category')->comment('Kategori: project payment, salary, operational, etc');
            $table->decimal('amount', 15, 2)->comment('Jumlah uang');
            $table->text('description')->nullable()->comment('Deskripsi transaksi');
            $table->string('reference_type')->nullable()->comment('Model terkait (Order, Payment, etc)');
            $table->unsignedBigInteger('reference_id')->nullable()->comment('ID dari model terkait');
            $table->date('transaction_date')->comment('Tanggal transaksi');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            // Index untuk performa query
            $table->index(['type', 'transaction_date']);
            $table->index(['category', 'transaction_date']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
