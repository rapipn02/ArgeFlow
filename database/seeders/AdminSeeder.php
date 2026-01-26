<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Transaction;
use App\Models\FinancialReport;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create superadmin user
        $superadmin = User::firstOrCreate(
            ['email' => 'admin@argeflow.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '081234567890',
            ]
        );

        // Create sample transactions for the current month
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Income transactions
        $incomeTransactions = [
            [
                'type' => 'income',
                'category' => 'project payment',
                'amount' => 5000000,
                'description' => 'Pembayaran DP Website Landing Page - PT ABC',
                'transaction_date' => Carbon::now()->subDays(5),
            ],
            [
                'type' => 'income',
                'category' => 'project payment',
                'amount' => 3000000,
                'description' => 'Pelunasan Mobile App Development - CV XYZ',
                'transaction_date' => Carbon::now()->subDays(10),
            ],
            [
                'type' => 'income',
                'category' => 'project payment',
                'amount' => 2500000,
                'description' => 'Pembayaran DP E-Commerce Website',
                'transaction_date' => Carbon::now()->subDays(15),
            ],
        ];

        // Expense transactions
        $expenseTransactions = [
            [
                'type' => 'expense',
                'category' => 'salary',
                'amount' => 4000000,
                'description' => 'Gaji Programmer - Bulan ' . Carbon::now()->format('F'),
                'transaction_date' => Carbon::now()->subDays(2),
            ],
            [
                'type' => 'expense',
                'category' => 'operational',
                'amount' => 500000,
                'description' => 'Biaya Server & Hosting',
                'transaction_date' => Carbon::now()->subDays(7),
            ],
            [
                'type' => 'expense',
                'category' => 'equipment',
                'amount' => 1000000,
                'description' => 'Pembelian Software License',
                'transaction_date' => Carbon::now()->subDays(12),
            ],
        ];

        // Insert income transactions
        foreach ($incomeTransactions as $transaction) {
            Transaction::create(array_merge($transaction, [
                'created_by' => $superadmin->id,
            ]));
        }

        // Insert expense transactions
        foreach ($expenseTransactions as $transaction) {
            Transaction::create(array_merge($transaction, [
                'created_by' => $superadmin->id,
            ]));
        }

        // Generate financial report for current month
        FinancialReport::generateReport($currentMonth, $currentYear);

        // Create sample transactions for previous months
        for ($i = 1; $i <= 3; $i++) {
            $month = Carbon::now()->subMonths($i)->month;
            $year = Carbon::now()->subMonths($i)->year;

            // Random income
            Transaction::create([
                'type' => 'income',
                'category' => 'project payment',
                'amount' => rand(3000000, 10000000),
                'description' => 'Pembayaran Proyek - Bulan ' . Carbon::create($year, $month)->format('F'),
                'transaction_date' => Carbon::create($year, $month, 15),
                'created_by' => $superadmin->id,
            ]);

            // Random expense
            Transaction::create([
                'type' => 'expense',
                'category' => 'salary',
                'amount' => rand(2000000, 5000000),
                'description' => 'Gaji - Bulan ' . Carbon::create($year, $month)->format('F'),
                'transaction_date' => Carbon::create($year, $month, 25),
                'created_by' => $superadmin->id,
            ]);

            // Generate report
            FinancialReport::generateReport($month, $year);
        }

        $this->command->info('Admin seeder completed successfully!');
        $this->command->info('Superadmin credentials:');
        $this->command->info('Email: admin@argeflow.com');
        $this->command->info('Password: password');
    }
}
