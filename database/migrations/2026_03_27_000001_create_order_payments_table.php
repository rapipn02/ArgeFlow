<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Normalisasi 3NF: memisahkan data pembayaran dari tabel orders ke tabel order_payments.
     */
    public function up(): void
    {
        // 1. Buat tabel order_payments
        Schema::create('order_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->unique()->constrained()->onDelete('cascade');
            $table->enum('payment_status', ['pending', 'dp_paid', 'fully_paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('midtrans_order_id')->nullable();
            $table->string('midtrans_snap_token')->nullable();
            $table->timestamp('dp_paid_at')->nullable();
            $table->timestamp('final_paid_at')->nullable();
            $table->timestamps();

            $table->index('payment_status');
            $table->index('midtrans_order_id');
        });

        // 2. Migrasi data existing dari orders ke order_payments
        $orders = DB::table('orders')->select(
            'id',
            'payment_status',
            'payment_method',
            'midtrans_order_id',
            'midtrans_snap_token',
            'dp_paid_at',
            'final_paid_at',
            'created_at',
            'updated_at'
        )->get();

        foreach ($orders as $order) {
            DB::table('order_payments')->insert([
                'order_id' => $order->id,
                'payment_status' => $order->payment_status ?? 'pending',
                'payment_method' => $order->payment_method,
                'midtrans_order_id' => $order->midtrans_order_id,
                'midtrans_snap_token' => $order->midtrans_snap_token,
                'dp_paid_at' => $order->dp_paid_at,
                'final_paid_at' => $order->final_paid_at,
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ]);
        }

        // 3. Hapus kolom pembayaran dari tabel orders
        Schema::table('orders', function (Blueprint $table) {
            // Drop index terlebih dahulu
            $table->dropIndex(['payment_status']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'payment_status',
                'payment_method',
                'midtrans_order_id',
                'midtrans_snap_token',
                'dp_paid_at',
                'final_paid_at',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Tambahkan kembali kolom pembayaran ke tabel orders
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('payment_status', ['pending', 'dp_paid', 'fully_paid', 'failed', 'refunded'])->default('pending')->after('status');
            $table->string('payment_method')->nullable()->after('payment_status');
            $table->string('midtrans_order_id')->nullable()->after('payment_method');
            $table->string('midtrans_snap_token')->nullable()->after('midtrans_order_id');
            $table->timestamp('dp_paid_at')->nullable()->after('midtrans_snap_token');
            $table->timestamp('final_paid_at')->nullable()->after('dp_paid_at');
            $table->index('payment_status');
        });

        // 2. Kembalikan data dari order_payments ke orders
        $payments = DB::table('order_payments')->get();

        foreach ($payments as $payment) {
            DB::table('orders')->where('id', $payment->order_id)->update([
                'payment_status' => $payment->payment_status,
                'payment_method' => $payment->payment_method,
                'midtrans_order_id' => $payment->midtrans_order_id,
                'midtrans_snap_token' => $payment->midtrans_snap_token,
                'dp_paid_at' => $payment->dp_paid_at,
                'final_paid_at' => $payment->final_paid_at,
            ]);
        }

        // 3. Hapus tabel order_payments
        Schema::dropIfExists('order_payments');
    }
};
