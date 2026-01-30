<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('requested_days')->nullable()->after('requirements')->comment('Client requested completion days');
            $table->decimal('rush_fee', 15, 2)->default(0)->after('requested_days')->comment('Additional fee for rush orders');
            $table->date('deadline_date')->nullable()->after('rush_fee')->comment('Expected completion deadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['requested_days', 'rush_fee', 'deadline_date']);
        });
    }
};
