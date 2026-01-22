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
        Schema::create('financial_reports', function (Blueprint $table) {
            $table->id();
            $table->integer('month')->comment('Bulan (1-12)');
            $table->integer('year')->comment('Tahun');
            $table->decimal('total_income', 15, 2)->default(0)->comment('Total pemasukan');
            $table->decimal('total_expense', 15, 2)->default(0)->comment('Total pengeluaran');
            $table->decimal('balance', 15, 2)->default(0)->comment('Saldo (income - expense)');
            $table->text('notes')->nullable()->comment('Catatan laporan');
            $table->timestamps();

            // Unique constraint untuk month-year combination
            $table->unique(['month', 'year']);

            // Index untuk performa query
            $table->index(['year', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_reports');
    }
};
