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
        Schema::table('services', function (Blueprint $table) {
            $table->json('features')->nullable()->after('description')->comment('Fitur-fitur yang termasuk dalam layanan');
            $table->integer('estimated_days')->nullable()->after('features')->comment('Estimasi hari pengerjaan');
            $table->string('category')->nullable()->after('estimated_days')->comment('Kategori layanan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['features', 'estimated_days', 'category']);
        });
    }
};
