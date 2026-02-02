# ArgeFlow - Freelance Project Management System

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=flat)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2-38B2AC?style=flat&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)

Platform manajemen proyek freelance yang menghubungkan klien dengan tim programmer profesional. Sistem ini menyediakan fitur lengkap untuk pemesanan layanan, manajemen proyek, pembayaran terintegrasi, dan tracking progress secara real-time.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [Struktur Database](#-struktur-database)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur Utama

### 🎯 Untuk Klien

#### 1. **Service Management**

- **Browse Layanan**: Katalog layanan pengembangan software yang tersedia
- **Detail Layanan**: Informasi lengkap tentang setiap layanan termasuk harga, durasi standar, dan risk factor
- **Kalkulator Harga**: Perhitungan otomatis harga berdasarkan durasi dan rush fee
- **Team Preference**: Pilihan untuk memilih tim sendiri atau auto-assign oleh admin

#### 2. **Order Management**

- **Create Order**: Pembuatan pesanan dengan requirements detail
- **Order Tracking**: Monitoring status pesanan secara real-time
- **Order History**: Riwayat semua pesanan yang pernah dibuat
- **Order Cancellation**: Pembatalan pesanan dengan syarat tertentu
- **Deadline Management**: Sistem deadline otomatis dengan rush fee untuk pengerjaan cepat

#### 3. **Payment System**

- **Midtrans Integration**: Integrasi payment gateway Midtrans
- **Split Payment**: Sistem pembayaran DP (40%) dan Pelunasan (60%)
- **Multiple Payment Methods**: Mendukung berbagai metode pembayaran
- **Payment Tracking**: Tracking status pembayaran real-time
- **Invoice Generation**: Generate dan download invoice PDF
- **Payment Success Page**: Halaman konfirmasi pembayaran dengan opsi rating

#### 4. **Progress Tracking**

- **Real-time Progress**: Monitoring progress proyek secara real-time
- **Progress Comments**: Komunikasi dengan programmer melalui komentar
- **Progress Reactions**: Like/dislike pada update progress
- **File Attachments**: Lihat file yang di-upload oleh programmer
- **Progress Percentage**: Visualisasi persentase penyelesaian proyek

#### 5. **Revision & Completion**

- **Request Revision**: Maksimal 2 kali revisi per proyek
- **Revision Tracking**: Monitoring status revisi
- **Accept Completion**: Approval hasil akhir proyek
- **Completion Review**: Review dan rating setelah proyek selesai

#### 6. **Team Rating**

- **Rate Team**: Memberikan rating (1-5 bintang) untuk tim
- **Written Review**: Memberikan review tertulis
- **Rating History**: Riwayat rating yang pernah diberikan

### 👨‍💻 Untuk Programmer

#### 1. **Dashboard**

- **Statistics Overview**: Ringkasan proyek aktif, completed, dan earnings
- **Project Analytics**: Visualisasi data proyek dengan Chart.js
- **Quick Actions**: Akses cepat ke fitur-fitur penting
- **Recent Projects**: Daftar proyek terbaru

#### 2. **Project Management**

- **Project List**: Daftar semua proyek yang ditugaskan
- **Project Details**: Informasi lengkap tentang proyek
- **Project Status**: Filter proyek berdasarkan status
- **Deadline Tracking**: Monitoring deadline proyek
- **Revision Status**: Indikator visual untuk proyek yang di-revisi

#### 3. **Progress Management**

- **Create Progress**: Buat update progress dengan persentase
- **Update Progress**: Edit update progress yang sudah dibuat
- **Delete Progress**: Hapus update progress
- **Upload Files**: Upload file hasil pekerjaan
- **Submit for Review**: Submit proyek untuk review klien (progress 100%)
- **Progress Comments**: Komunikasi dengan klien

#### 4. **Team Collaboration**

- **Team List**: Daftar tim yang diikuti
- **Team Members**: Informasi anggota tim
- **Team Projects**: Proyek yang dikerjakan tim
- **Team Statistics**: Statistik performa tim

#### 5. **Earnings Management**

- **Earnings Dashboard**: Dashboard pendapatan
- **Earnings History**: Riwayat pendapatan dari proyek
- **Earnings Analytics**: Analisis pendapatan dengan grafik
- **Payment Status**: Status pembayaran earnings

#### 6. **Profile Management**

- **Programmer Profile**: Setup dan edit profil programmer
- **Skills Management**: Tambah/edit skills
- **Portfolio**: Showcase portfolio proyek
- **Profile Setup**: Wizard untuk setup profil pertama kali

### 🔧 Untuk Admin

#### 1. **Dashboard Analytics**

- **Revenue Overview**: Total pendapatan dan statistik keuangan
- **Project Statistics**: Statistik proyek (active, completed, pending)
- **User Analytics**: Statistik pengguna (clients, programmers)
- **Team Performance**: Performa tim dengan rating
- **Financial Charts**: Visualisasi data keuangan dengan Chart.js
- **Recent Activities**: Aktivitas terbaru di sistem

#### 2. **User Management**

- **User List**: Daftar semua pengguna
- **Create User**: Tambah pengguna baru
- **Edit User**: Edit informasi pengguna
- **Delete User**: Hapus pengguna
- **User Roles**: Manajemen role (client, programmer, admin)
- **User Status**: Aktivasi/deaktivasi akun pengguna
- **Mobile Responsive**: Tampilan card untuk mobile view

#### 3. **Programmer Management**

- **Programmer List**: Daftar semua programmer
- **Programmer Details**: Detail profil programmer
- **Skills Overview**: Daftar skills programmer
- **Performance Metrics**: Metrik performa programmer
- **Earnings Overview**: Overview pendapatan programmer
- **Mobile Card Layout**: Tampilan responsif untuk mobile

#### 4. **Team Management**

- **Team List**: Daftar semua tim
- **Create Team**: Buat tim baru
- **Edit Team**: Edit informasi tim
- **Delete Team**: Hapus tim
- **Assign Members**: Tambah anggota ke tim
- **Remove Members**: Hapus anggota dari tim
- **Team Availability**: Toggle ketersediaan tim
- **Auto-assign**: Assign tim otomatis ke order
- **Manual Assign**: Assign tim manual ke order
- **Team Ratings**: Lihat rating dan review tim
- **Mobile Responsive**: Card view untuk mobile

#### 5. **Service Management**

- **Service List**: Daftar semua layanan
- **Create Service**: Tambah layanan baru
- **Edit Service**: Edit informasi layanan
- **Delete Service**: Hapus layanan
- **Toggle Active**: Aktifkan/nonaktifkan layanan
- **Price Management**: Atur harga layanan
- **Duration Settings**: Atur durasi standar dan risk factor
- **Service Analytics**: Statistik pemesanan per layanan

#### 6. **Transaction Management**

- **Transaction List**: Daftar semua transaksi
- **Transaction Details**: Detail transaksi
- **Income/Expense**: Filter berdasarkan tipe transaksi
- **Category Filter**: Filter berdasarkan kategori
- **Date Range**: Filter berdasarkan periode
- **Transaction Reports**: Generate laporan transaksi
- **Financial Reports**: Laporan keuangan periodik

#### 7. **Progress Monitoring**

- **All Progress**: Monitor semua progress dari semua proyek
- **Progress Details**: Detail update progress
- **Progress Comments**: Lihat dan moderasi komentar
- **Progress Analytics**: Analisis progress proyek
- **Intervention**: Intervensi jika ada masalah

### 🔐 Authentication & Authorization

- **Multi-role Authentication**: Support untuk 3 role (client, programmer, admin/superadmin)
- **Laravel Breeze**: Authentication scaffolding
- **Email Verification**: Verifikasi email pengguna
- **Password Reset**: Reset password via email
- **Remember Me**: Fitur remember me
- **Secure Sessions**: Session management yang aman
- **Role-based Access Control**: Middleware untuk kontrol akses berdasarkan role

### 💳 Payment Features

- **Midtrans Integration**:
    - Snap Payment Gateway
    - Multiple payment channels (Bank Transfer, E-wallet, Credit Card, dll)
    - Sandbox & Production mode
    - Webhook notification handling
- **Payment Flow**:
    - DP Payment (40% dari total)
    - Final Payment (60% dari total)
    - Rush fee calculation untuk deadline cepat
    - Automatic status update via webhook
- **Invoice System**:
    - PDF generation dengan DomPDF
    - Professional invoice layout
    - Download & print invoice
    - Invoice numbering system

### 📊 Reporting & Analytics

- **Dashboard Charts**: Visualisasi data dengan Chart.js
    - Donut charts untuk distribusi
    - Line charts untuk trend
    - Bar charts untuk perbandingan
- **Financial Reports**:
    - Income vs Expense
    - Revenue by service
    - Earnings by programmer
    - Monthly/Yearly reports
- **Project Analytics**:
    - Completion rate
    - Average project duration
    - Revision statistics
    - Team performance metrics

### 🔔 Notification System

- **Database Notifications**: Notifikasi tersimpan di database
- **Real-time Updates**: Update status real-time
- **Notification Types**:
    - Order status changes
    - Payment confirmations
    - Progress updates
    - Revision requests
    - Completion notifications

### 📱 Responsive Design

- **Mobile-First Approach**: Desain responsif untuk semua device
- **Card Layout**: Tampilan card untuk mobile view
- **Adaptive Tables**: Tabel yang adaptif di mobile
- **Touch-Friendly**: Interface yang touch-friendly
- **Modern UI/UX**:
    - Framer Motion animations
    - Lucide React icons
    - SweetAlert2 untuk alerts
    - Loading states & skeletons

## 🛠 Tech Stack

### Backend

- **Laravel 12.x**: PHP Framework
- **MySQL**: Database
- **Laravel Sanctum**: API Authentication
- **Laravel Breeze**: Authentication Scaffolding
- **DomPDF**: PDF Generation
- **Midtrans PHP**: Payment Gateway SDK

### Frontend

- **React 19.2**: JavaScript Library
- **Inertia.js 2.0**: Modern Monolith Stack
- **TailwindCSS 3.2**: Utility-first CSS Framework
- **Headless UI**: Unstyled UI Components
- **Framer Motion**: Animation Library
- **Chart.js**: Data Visualization
- **React Chart.js 2**: React wrapper for Chart.js
- **Lucide React**: Icon Library
- **SweetAlert2**: Beautiful Alerts
- **Axios**: HTTP Client

### Development Tools

- **Vite 6.0**: Build Tool & Dev Server
- **Laravel Pint**: Code Style Fixer
- **Concurrently**: Run multiple commands
- **PostCSS**: CSS Processing
- **Autoprefixer**: CSS Vendor Prefixing

## 📦 Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- NPM atau Yarn
- MySQL >= 8.0
- Git

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/rapipn02/ArgeFlow.git
cd ArgeFlow
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE freelance_projek;
exit;

# Run migrations
php artisan migrate

# (Optional) Run seeders
php artisan db:seed
```

### 5. Storage Link

```bash
php artisan storage:link
```

### 6. Build Assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 7. Run Application

```bash
# Option 1: Using Laravel's built-in server
php artisan serve

# Option 2: Using composer dev script (recommended)
composer dev
# This will run: server, queue, logs, and vite concurrently
```

Aplikasi akan berjalan di `http://localhost:8000`

## ⚙️ Konfigurasi

### Database Configuration

Edit file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=freelance_projek
DB_USERNAME=root
DB_PASSWORD=
```

### Midtrans Configuration

Daftar di [Midtrans](https://midtrans.com) dan dapatkan credentials:

```env
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false
```

**Sandbox Credentials** (untuk testing):

- Server Key: `SB-Mid-server-xxxxx`
- Client Key: `SB-Mid-client-xxxxx`

**Production Credentials**:

- Ubah `MIDTRANS_IS_PRODUCTION=true`
- Gunakan production server & client key

### Mail Configuration

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Queue Configuration

```env
QUEUE_CONNECTION=database
```

Jalankan queue worker:

```bash
php artisan queue:listen
```

## 📖 Penggunaan

### Default Accounts

Setelah menjalankan seeder, akun default:

**Admin:**

- Email: `admin@argeflow.com`
- Password: `password`

**Programmer:**

- Email: `programmer@argeflow.com`
- Password: `password`

**Client:**

- Email: `client@argeflow.com`
- Password: `password`

### User Flow

#### Client Flow:

1. Register/Login
2. Browse layanan yang tersedia
3. Pilih layanan dan tentukan requirements
4. Pilih tim atau auto-assign
5. Bayar DP (40%) via Midtrans
6. Monitor progress proyek
7. Request revisi (max 2x) atau accept completion
8. Bayar pelunasan (60%)
9. Berikan rating untuk tim

#### Programmer Flow:

1. Login dengan akun programmer
2. Setup profil dan skills (first time)
3. Lihat proyek yang ditugaskan
4. Update progress proyek
5. Upload file hasil kerja
6. Submit untuk review (100%)
7. Handle revisi jika ada
8. Monitor earnings

#### Admin Flow:

1. Login dengan akun admin
2. Monitor dashboard analytics
3. Manage users, programmers, teams
4. Manage services
5. Assign teams ke orders
6. Monitor progress semua proyek
7. View financial reports

## 🗄️ Struktur Database

### Main Tables

#### users

- Tabel pengguna dengan role (client, programmer, admin, superadmin)
- Fields: id, name, email, password, role, phone, avatar

#### services

- Layanan yang ditawarkan
- Fields: id, name, description, price, standard_days, risk_factor, is_active

#### teams

- Tim programmer
- Fields: id, name, description, is_available, completed_projects, average_rating

#### team_members

- Relasi many-to-many antara users dan teams
- Fields: id, team_id, user_id, role

#### orders

- Pesanan dari client
- Fields: id, order_number, user_id, service_id, team_id, total_amount, dp_amount, final_amount, status, payment_status, deadline_date, revision_count

#### order_progress

- Progress update dari programmer
- Fields: id, order_id, progress_percentage, description, files, likes_count, dislikes_count

#### progress_comments

- Komentar pada progress
- Fields: id, order_progress_id, user_id, comment

#### progress_reactions

- Like/dislike pada progress
- Fields: id, order_progress_id, user_id, reaction_type

#### revisions

- Request revisi dari client
- Fields: id, order_id, description, status

#### team_ratings

- Rating untuk tim
- Fields: id, team_id, order_id, user_id, rating, review

#### transactions

- Transaksi keuangan
- Fields: id, type, category, amount, description, reference_type, reference_id, transaction_date

#### programmer_profiles

- Profil programmer
- Fields: id, user_id, bio, portfolio_url, hourly_rate

#### programmer_earnings

- Pendapatan programmer
- Fields: id, user_id, order_id, amount, status, paid_at

### Relationships

```
users (1) -> (many) orders
users (1) -> (many) team_members
users (1) -> (1) programmer_profile
users (1) -> (many) programmer_earnings

services (1) -> (many) orders

teams (1) -> (many) team_members
teams (1) -> (many) orders
teams (1) -> (many) team_ratings

orders (1) -> (many) order_progress
orders (1) -> (many) revisions
orders (1) -> (1) team_rating
orders (1) -> (many) transactions

order_progress (1) -> (many) progress_comments
order_progress (1) -> (many) progress_reactions
```

## 🔌 API Documentation

### Service API

```
GET    /api/services              - List all services
GET    /api/services/{id}         - Get service details
POST   /api/services/calculate-price - Calculate price with rush fee
```

### Order API

```
GET    /orders                    - List user orders
POST   /orders                    - Create new order
GET    /orders/{order}            - Get order details
POST   /orders/{order}/cancel     - Cancel order
```

### Payment API

```
GET    /payment/{order}           - Payment page
POST   /payment/{order}/token     - Get Midtrans snap token
GET    /payment/{order}/status    - Check payment status
POST   /payment/notification      - Midtrans webhook
```

### Progress API

```
GET    /orders/{order}/progress   - Get order progress
POST   /orders/{order}/progress   - Create progress (programmer)
PUT    /orders/{order}/progress/{progress} - Update progress
DELETE /orders/{order}/progress/{progress} - Delete progress
POST   /progress/{progress}/reaction - Toggle like/dislike
```

### Team API

```
GET    /services/{serviceId}/teams - List teams for service
GET    /teams/{id}                 - Get team details
POST   /orders/{order}/team-rating - Rate team
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=OrderTest

# Run with coverage
php artisan test --coverage
```

### Test Categories

- **Unit Tests**: Model methods, helpers
- **Feature Tests**: Controllers, routes, middleware
- **Browser Tests**: End-to-end user flows

## 🚢 Deployment

### Production Checklist

1. **Environment**

    ```bash
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://yourdomain.com
    ```

2. **Database**

    ```bash
    php artisan migrate --force
    ```

3. **Optimize**

    ```bash
    composer install --optimize-autoloader --no-dev
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    npm run build
    ```

4. **Storage Permissions**

    ```bash
    chmod -R 775 storage bootstrap/cache
    ```

5. **Queue Worker**
    - Setup supervisor untuk queue worker
    - Configure cron untuk scheduled tasks

6. **SSL Certificate**
    - Install SSL certificate
    - Force HTTPS in production

### Deployment Platforms

- **VPS**: Ubuntu/CentOS dengan Nginx/Apache
- **Shared Hosting**: cPanel dengan PHP 8.2+
- **Cloud**: AWS, DigitalOcean, Heroku
- **Laravel Forge**: Automated deployment

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Standards

- Follow PSR-12 coding standard
- Use Laravel best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 Lisensi

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Tim Pengembang

- **Developer**: [Your Name]
- **Institusi**: [Your Institution]
- **Tahun**: 2026

## 📞 Kontak & Support

- **Email**: support@argeflow.com
- **Website**: https://argeflow.com
- **GitHub Issues**: [Create Issue](https://github.com/rapipn02/ArgeFlow/issues)

## 🙏 Acknowledgments

- Laravel Framework
- React & Inertia.js Community
- Midtrans Payment Gateway
- TailwindCSS
- All contributors and supporters

---

**Made with ❤️ for Final Project - PKL 2026**
