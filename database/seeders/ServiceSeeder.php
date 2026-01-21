<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Website Landing Page',
                'description' => 'Pembuatan website landing page modern dan responsif untuk bisnis Anda. Termasuk desain UI/UX, optimasi SEO, dan integrasi dengan tools marketing.',
                'price' => 3000000,
                'icon' => '🌐',
                'is_active' => true,
            ],
            [
                'name' => 'Web Company Profile',
                'description' => 'Website company profile profesional dengan fitur lengkap seperti about us, services, portfolio, team, dan contact form. Dilengkapi dengan CMS untuk kemudahan update konten.',
                'price' => 8000000,
                'icon' => '🏢',
                'is_active' => true,
            ],
            [
                'name' => 'E-Commerce Website',
                'description' => 'Platform e-commerce lengkap dengan sistem pembayaran, manajemen produk, keranjang belanja, dan dashboard admin. Terintegrasi dengan payment gateway populer.',
                'price' => 15000000,
                'icon' => '🛒',
                'is_active' => true,
            ],
            [
                'name' => 'Mobile App (Android)',
                'description' => 'Aplikasi mobile Android native dengan performa optimal. Termasuk desain UI/UX, backend API, dan deployment ke Google Play Store.',
                'price' => 20000000,
                'icon' => '📱',
                'is_active' => true,
            ],
            [
                'name' => 'Mobile App (iOS)',
                'description' => 'Aplikasi mobile iOS native dengan desain mengikuti Human Interface Guidelines. Termasuk backend API dan deployment ke App Store.',
                'price' => 22000000,
                'icon' => '🍎',
                'is_active' => true,
            ],
            [
                'name' => 'Custom Web Application',
                'description' => 'Aplikasi web custom sesuai kebutuhan bisnis Anda. Bisa berupa sistem internal, dashboard analytics, atau platform khusus lainnya.',
                'price' => 25000000,
                'icon' => '⚙️',
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
