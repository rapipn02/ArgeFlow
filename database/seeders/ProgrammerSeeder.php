<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ProgrammerProfile;
use Illuminate\Support\Facades\Hash;

class ProgrammerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programmers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@programmer.com',
                'phone' => '081234567891',
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti@programmer.com',
                'phone' => '081234567892',
            ],
            [
                'name' => 'Ahmad Rahman',
                'email' => 'ahmad@programmer.com',
                'phone' => '081234567893',
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi@programmer.com',
                'phone' => '081234567894',
            ],
            [
                'name' => 'Rudi Hartono',
                'email' => 'rudi@programmer.com',
                'phone' => '081234567895',
            ],
            [
                'name' => 'Maya Angelina',
                'email' => 'maya@programmer.com',
                'phone' => '081234567896',
            ],
        ];

        foreach ($programmers as $progData) {
            $programmer = User::create([
                'name' => $progData['name'],
                'email' => $progData['email'],
                'password' => Hash::make('password'),
                'role' => 'programmer',
                'phone' => $progData['phone'],
            ]);

            // Create programmer profile
            ProgrammerProfile::create([
                'user_id' => $programmer->id,
                'bio' => 'Programmer berpengalaman dengan berbagai skill teknologi modern.',
                'hourly_rate' => rand(50000, 150000),
                'is_available' => true,
            ]);
        }

        $this->command->info('Programmers created successfully!');
    }
}
