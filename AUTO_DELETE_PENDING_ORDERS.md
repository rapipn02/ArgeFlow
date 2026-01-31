# Auto Delete Expired Pending Orders

## Deskripsi
Fitur ini secara otomatis menghapus order dengan status `pending` yang sudah lebih dari **5 jam** sejak dibuat. Ini membantu menjaga database tetap bersih dan memastikan bahwa order yang tidak dibayar tidak menumpuk.

## Fitur

### 1. Command Laravel
**Command:** `php artisan orders:delete-expired-pending`

**Fungsi:**
- Mencari semua order dengan status `payment_status = 'pending'`
- Filter order yang dibuat lebih dari 5 jam yang lalu
- Menghapus order beserta file-file terkait (soft delete)
- Membuat notifikasi untuk user tentang pembatalan order
- Logging lengkap untuk tracking

**Cara Manual Run:**
```bash
php artisan orders:delete-expired-pending
```

### 2. Scheduled Task
Command ini dijadwalkan untuk berjalan **otomatis setiap 1 jam** menggunakan Laravel Scheduler.

**Konfigurasi:** `routes/console.php`
```php
Schedule::command('orders:delete-expired-pending')
    ->hourly()                  // Jalankan setiap jam
    ->withoutOverlapping()       // Hindari overlap eksekusi
    ->runInBackground()          // Jalankan di background
    ->appendOutputTo(storage_path('logs/delete-expired-orders.log'));
```

## Cara Kerja

1. **Deteksi Order Kadaluarsa**
   - Order dengan `payment_status = 'pending'`
   - `created_at <= now() - 5 jam`

2. **Proses Penghapusan**
   - Buat notifikasi untuk user
   - Hapus file-file terkait order
   - Soft delete order
   - Log hasil proses

3. **Error Handling**
   - Menggunakan database transaction
   - Rollback jika terjadi error
   - Logging setiap error
   - Lanjutkan ke order berikutnya meski ada error

## Setup & Aktivasi

### 1. Setup Scheduler (Production)

Untuk server production, tambahkan cron job ke server:

```bash
# Edit crontab
crontab -e

# Tambahkan baris ini:
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

**Lokasi project:** Ganti `/path-to-your-project` dengan path absolut project Anda.

### 2. Setup Scheduler (Development - Windows)

Untuk development di Windows, jalankan scheduler secara manual:

```powershell
# Jalankan scheduler work (akan terus berjalan dan cek schedule setiap menit)
php artisan schedule:work
```

Atau gunakan Task Scheduler Windows:
1. Buka Task Scheduler
2. Create Basic Task
3. Trigger: Daily, repeat every 1 minute
4. Action: Start a program
   - Program: `php.exe`
   - Arguments: `artisan schedule:run`
   - Start in: `D:\PKL\final project\tugas_akhir_magang`

### 3. Test Command

```bash
# Test manual
php artisan orders:delete-expired-pending

# Lihat daftar command
php artisan list

# Lihat schedule yang terdaftar
php artisan schedule:list
```

## Logging

### Log File Locations

1. **Schedule Log:** `storage/logs/delete-expired-orders.log`
   - Output dari scheduled command

2. **Laravel Log:** `storage/logs/laravel.log`
   - Detail error dan info lengkap
   - Termasuk stack trace untuk debugging

### Log Format

```
[timestamp] INFO: Order #ORD-ABC123 berhasil dihapus karena pending lebih dari 5 jam.
{
    "order_id": 123,
    "user_id": 45,
    "service": "Website Development",
    "created_at": "2026-01-30 10:00:00"
}
```

## Notifikasi User

Ketika order dihapus, user akan menerima notifikasi dengan informasi:

- **Type:** `order_cancelled`
- **Title:** "Pesanan Dibatalkan - Waktu Pembayaran Habis"
- **Message:** "Pesanan #{order_number} untuk layanan {service_name} telah dibatalkan karena pembayaran tidak dilakukan dalam 5 jam."

User dapat melihat notifikasi ini di halaman notifikasi mereka.

## Troubleshooting

### Scheduler Tidak Berjalan

**Problem:** Command tidak dijalankan otomatis.

**Solusi:**
1. Pastikan cron job sudah di-setup (production)
2. Atau jalankan `php artisan schedule:work` (development)
3. Cek `php artisan schedule:list` untuk memastikan schedule terdaftar

### Order Tidak Terhapus

**Problem:** Order pending masih ada setelah 5 jam.

**Solusi:**
1. Cek log di `storage/logs/laravel.log`
2. Jalankan manual: `php artisan orders:delete-expired-pending`
3. Periksa apakah ada error di output

### Permission Error

**Problem:** Error saat menulis log file.

**Solusi:**
```bash
# Windows (PowerShell as Administrator)
icacls "storage\logs" /grant Users:F /T

# Atau pastikan folder logs writable
```

## Customization

### Ubah Durasi Expired (dari 5 jam ke nilai lain)

Edit file `app/Console/Commands/DeleteExpiredPendingOrders.php`:

```php
// Ganti dari 5 jam menjadi nilai yang diinginkan
->where('created_at', '<=', Carbon::now()->subHours(5))

// Contoh: 3 jam
->where('created_at', '<=', Carbon::now()->subHours(3))

// Contoh: 24 jam
->where('created_at', '<=', Carbon::now()->subHours(24))
```

### Ubah Frekuensi Schedule

Edit file `routes/console.php`:

```php
// Setiap 30 menit
->everyThirtyMinutes()

// Setiap 2 jam
->everyTwoHours()

// Setiap hari jam 2 pagi
->dailyAt('02:00')

// Setiap jam di menit ke-15 (misal 10:15, 11:15, dst)
->hourlyAt(15)
```

## Security & Best Practices

✅ **Sudah Diterapkan:**
- Soft Delete (data tidak benar-benar dihapus, bisa di-restore)
- Database Transaction (rollback jika error)
- Comprehensive Logging
- Error Handling yang baik
- Notifikasi user sebelum hapus
- Prevent overlapping execution

⚠️ **Perhatian:**
- Command ini akan menghapus order secara permanen dari sudut pandang user
- Pastikan durasi 5 jam sudah sesuai dengan kebutuhan bisnis
- Monitor log secara berkala

## Performance

- **Efficient Query:** Hanya fetch order yang benar-benar expired
- **Batch Processing:** Process per order dengan error handling
- **Background Execution:** Tidak mengganggu performa aplikasi
- **Prevent Overlap:** Hindari multiple execution bersamaan

## Maintenance

### Weekly Check
1. Review log file: `storage/logs/delete-expired-orders.log`
2. Cek jumlah order yang dihapus
3. Monitor error rate

### Monthly
1. Clear old log files
2. Analyze pattern (jam berapa paling banyak order expired)
3. Pertimbangkan adjustment durasi jika perlu

---

**Dibuat:** 30 Januari 2026
**Version:** 1.0
**Status:** ✅ Production Ready
