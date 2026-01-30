# Fitur Deadline & Rush Fee

## Ringkasan
Sistem deadline dengan date picker (kalender) dan biaya tambahan (rush fee) untuk pengerjaan lebih cepat dari estimasi standar.

## Fitur Utama

### 1. **Standard Days per Service**
- Setiap layanan memiliki estimasi pengerjaan standar (standard_days)
- Contoh: Website Landing Page = 7 hari, E-Commerce = 21 hari
- Admin dapat mengatur nilai ini di database tabel `services`

### 2. **Date Picker System**
- Client memilih tanggal deadline dari kalender (HTML5 date input)
- Sistem otomatis menghitung selisih hari dari tanggal sekarang
- Minimal deadline: besok (tidak bisa pilih hari ini atau kemarin)
- Formula: `requested_days = (deadline_date - today) dalam hari`

### 3. **Rush Fee Calculation**
- Biaya tambahan: **Rp 50.000 per hari** lebih cepat dari estimasi standar
- Formula: `rush_fee = (standard_days - requested_days) × 50000`
- Hanya berlaku jika `requested_days < standard_days`
- Contoh: 
  - Standard: 10 hari
  - Client pilih deadline: 8 hari dari sekarang
  - Rush fee: (10 - 8) × 50.000 = **Rp 100.000**
```
Total = Base Price + Rush Fee
DP (40%) = Total × 0.4
Final (60%) = Total × 0.6
```

## Database Schema

### Services Table
```sql
- standard_days (integer): Estimasi pengerjaan standar dalam hari
```

### Orders Table
```sql
- requested_days (integer): Jumlah hari yang diminta client
- rush_fee (decimal): Biaya tambahan untuk rush order
- deadline_date (date): Target tanggal selesai
```

## API Endpoints

### 1. Get All Services
```
GET /api/services
Response: {
  success: true,
  data: [...services],
  rush_fee_per_day: 50000
}
```

### 2. Get Single Service
```
GET /api/services/{id}
Response: {
  success: true,
  data: {...service},
  rush_fee_per_day: 50000
}
```

### 3. Calculate Price
```
POST /api/services/calculate-price
Body: {
  service_id: 1,
  requested_days: 8
}
Response: {
  success: true,
  data: {
    service_name: "Website Landing Page",
    standard_days: 10,
    requested_days: 8,
    days_rushed: 2,
    base_price: 3000000,
    rush_fee: 100000,
    total_price: 3100000,
    dp_amount: 1240000,
    final_amount: 1860000
  }
}
```

## User Flow

### Client Side
1. **Pilih Service** - Lihat estimasi standar di halaman Services
2. **Pilih Deadline dengan Kalender** 
   - Klik input date untuk membuka date picker
   - Pilih tanggal deadline (minimal besok)
   - Sistem otomatis hitung jumlah hari dari sekarang
   - Real-time calculation menampilkan:
     - Jumlah hari dari sekarang
     - Rush fee (jika deadline < standard)
     - Preview breakdown harga
3. **Create Order** - Submit dengan deadline yang dipilih
4. **Payment** - Lihat detail rush fee di halaman pembayaran
5. **Order Detail** - Lihat deadline dan rush fee di order summary

### Admin Side (Future Enhancement)
- Kelola standard_days per service
- Set rush_fee_per_day globally
- View statistics rush orders

## UI Components

### Services Index
- Menampilkan estimasi standar per layanan
- Badge "Estimasi: X hari"
- Info rush fee: "+ Rp 50k/hari untuk pengerjaan lebih cepat"

### Order Create Page
- **Date Picker** dengan HTML5 date input (modern & simple)
- Minimal date: besok (validasi otomatis)
- Real-time calculation saat pilih tanggal:
  - Tampilkan tanggal lengkap (format Indonesia)
  - Jumlah hari dari sekarang
  - Indicator rush (X hari lebih cepat ⚡)
- Visual breakdown:
  - Harga Layanan
  - Biaya Rush (jika ada) - warna orange dengan emoji ⚡
  - Info badge: "Tidak ada biaya tambahan" (hijau) atau "Rp 50k per hari" (orange)
  - Total Harga
  - DP & Pelunasan

### Payment Page
- Tampilkan rush fee di order summary
- Deadline info dengan target date
- Breakdown biaya lengkap

### Order Detail
- Rush fee dalam ringkasan biaya
- Deadline & target completion date
- Visual indicator untuk rush orders

## File Changes

### Migrations
- `2026_01_30_000001_add_standard_days_to_services_table.php`
- `2026_01_30_000002_add_deadline_fields_to_orders_table.php`

### Models
- `app/Models/Service.php` - Added standard_days to fillable
- `app/Models/Order.php` - Added requested_days, rush_fee, deadline_date

### Controllers
- `app/Http/Controllers/ServiceController.php` - New API endpoints
- `app/Http/Controllers/OrderController.php` - Rush fee calculation on store

### Views
- `resources/js/Pages/Services/Index.jsx` - Fetch from API, show standard days
- `resources/js/Pages/Orders/Create.jsx` - Deadline selector, price calculation
- `resources/js/Pages/Payment/CustomPayment.jsx` - Rush fee display
- `resources/js/Pages/Orders/Show.jsx` - Deadline & rush fee info

### Routes
- `routes/web.php` - Added service API routes

## Configuration

### Global Settings (Hardcoded)
```php
// Rush fee per day
const RUSH_FEE_PER_DAY = 50000;

// DP Percentage
const DP_PERCENTAGE = 0.4; // 40%

// Final Payment Percentage
const FINAL_PERCENTAGE = 0.6; // 60%
```

## Future Enhancements

1. **Admin Panel**
   - Manage standard_days per service
   - Configure rush_fee_per_day globally
   - Minimum rush days setting

2. **Notifications**
   - Alert admin for rush orders
   - Countdown reminder to team

3. **Analytics**
   - Rush order statistics
   - Revenue from rush fees
   - Popular deadline selections

4. **Advanced Pricing**
   - Weekend/holiday rush fee multiplier
   - Tiered rush pricing (faster = more expensive)
   - Seasonal adjustments

## Testing Checklist

- [ ] Service API returns standard_days
- [ ] Rush fee calculation correct
- [ ] Order creation with deadline
- [ ] Payment displays rush fee
- [ ] Order detail shows deadline
- [ ] Edge case: requested_days = standard_days (no rush fee)
- [ ] Edge case: requested_days > standard_days (no rush fee)
- [ ] DP & Final amount calculated correctly with rush fee
