<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\Notification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class DeleteExpiredPendingOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:delete-expired-pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hapus order dengan status pending yang lebih dari 5 jam';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Memulai proses penghapusan order pending yang kadaluarsa...');

        try {
            // Ambil order yang pending dan dibuat lebih dari 5 jam yang lalu
            $expiredOrders = Order::where('payment_status', 'pending')
                ->where('created_at', '<=', Carbon::now()->subHours(5))
                ->get();

            if ($expiredOrders->isEmpty()) {
                $this->info('Tidak ada order pending yang kadaluarsa.');
                Log::info('DeleteExpiredPendingOrders: Tidak ada order yang dihapus.');
                return 0;
            }

            $deletedCount = 0;
            $failedCount = 0;

            foreach ($expiredOrders as $order) {
                try {
                    DB::beginTransaction();

                    // Simpan informasi untuk logging
                    $orderNumber = $order->order_number;
                    $userId = $order->user_id;
                    $serviceName = $order->service->name ?? 'Unknown Service';

                    // Buat notifikasi untuk user sebelum menghapus order
                    Notification::create([
                        'user_id' => $userId,
                        'type' => 'order_cancelled',
                        'title' => 'Pesanan Dibatalkan - Waktu Pembayaran Habis',
                        'message' => "Pesanan #{$orderNumber} untuk layanan {$serviceName} telah dibatalkan karena pembayaran tidak dilakukan dalam 5 jam.",
                        'data' => json_encode([
                            'order_id' => $order->id,
                            'order_number' => $orderNumber,
                            'service_name' => $serviceName,
                            'reason' => 'payment_timeout',
                        ]),
                    ]);

                    // Hapus relasi terkait jika ada (soft delete akan otomatis handle)
                    // Order files akan di-cascade delete karena foreign key constraint
                    if ($order->files()->exists()) {
                        $order->files()->delete();
                    }

                    // Hapus order (soft delete)
                    $order->delete();

                    Log::info("Order #{$orderNumber} berhasil dihapus karena pending lebih dari 5 jam.", [
                        'order_id' => $order->id,
                        'user_id' => $userId,
                        'service' => $serviceName,
                        'created_at' => $order->created_at,
                    ]);

                    DB::commit();
                    $deletedCount++;
                    
                    $this->line("✓ Order #{$orderNumber} berhasil dihapus");

                } catch (\Exception $e) {
                    DB::rollBack();
                    $failedCount++;
                    
                    Log::error("Gagal menghapus order #{$order->order_number}: " . $e->getMessage(), [
                        'order_id' => $order->id,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                    ]);
                    
                    $this->error("✗ Gagal menghapus order #{$order->order_number}: {$e->getMessage()}");
                }
            }

            // Summary
            $this->newLine();
            $this->info("=== RINGKASAN ===");
            $this->info("Total ditemukan: {$expiredOrders->count()} order");
            $this->info("Berhasil dihapus: {$deletedCount} order");
            
            if ($failedCount > 0) {
                $this->warn("Gagal dihapus: {$failedCount} order");
            }

            Log::info("DeleteExpiredPendingOrders selesai: {$deletedCount} berhasil, {$failedCount} gagal dari total {$expiredOrders->count()} order.");

            return 0;

        } catch (\Exception $e) {
            $this->error("Terjadi kesalahan: {$e->getMessage()}");
            Log::error("DeleteExpiredPendingOrders error: " . $e->getMessage(), [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return 1;
        }
    }
}
