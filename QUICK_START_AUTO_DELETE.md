# Quick Start - Auto Delete Pending Orders

## ✅ Setup Selesai!

Fitur auto-delete untuk order pending > 5 jam sudah aktif dan siap digunakan.

## 🚀 Cara Mengaktifkan Scheduler

### Development (Windows):
```powershell
# Opsi 1: Schedule Work (Recommended untuk testing)
php artisan schedule:work

# Opsi 2: Manual Run (untuk testing langsung)
php artisan orders:delete-expired-pending
```

### Production (Linux Server):
```bash
# Tambahkan ke crontab
crontab -e

# Tambahkan baris ini:
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

## 📋 Cara Kerja

✅ **Otomatis berjalan setiap 1 jam**
✅ **Hapus order pending > 5 jam**
✅ **Kirim notifikasi ke user**
✅ **Log semua aktivitas**

## 🔍 Monitoring

### Cek Log
```powershell
# Log schedule
Get-Content "storage/logs/delete-expired-orders.log" -Tail 20

# Log Laravel (detail)
Get-Content "storage/logs/laravel.log" -Tail 50
```

### Test Manual
```powershell
# Run manual
php artisan orders:delete-expired-pending

# Cek schedule
php artisan schedule:list
```

## ⚙️ Konfigurasi

| Setting | Value | File |
|---------|-------|------|
| Durasi Expired | 5 jam | `DeleteExpiredPendingOrders.php` line 45 |
| Frekuensi | Setiap 1 jam | `routes/console.php` |
| Log File | `storage/logs/delete-expired-orders.log` | Auto-created |

## 📝 Yang Dilakukan Command

1. ✅ Cari order dengan `payment_status = 'pending'`
2. ✅ Filter yang `created_at > 5 jam`
3. ✅ Buat notifikasi untuk user
4. ✅ Hapus file terkait
5. ✅ Soft delete order
6. ✅ Log hasil

## ⚠️ Penting!

- Data **soft delete** (masih bisa di-restore dari database)
- User akan dapat notifikasi otomatis
- Pastikan scheduler berjalan di production
- Monitor log secara berkala

## 📞 Troubleshooting

**Scheduler tidak berjalan?**
- Development: Jalankan `php artisan schedule:work`
- Production: Cek crontab sudah di-setup

**Order tidak terhapus?**
- Cek log: `storage/logs/laravel.log`
- Test manual: `php artisan orders:delete-expired-pending`

---

**Status:** ✅ Ready to Use
**Last Test:** 30 Januari 2026
**Result:** 5 orders berhasil dihapus
