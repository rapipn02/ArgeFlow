<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get programmers (pastikan sudah run ProgrammerSeeder dulu)
        $programmers = User::where('role', 'programmer')->get();

        if ($programmers->count() < 6) {
            $this->command->warn('Warning: Tidak cukup programmer. Jalankan ProgrammerSeeder terlebih dahulu.');
            return;
        }

        // Team 1: Alpha Team (Web Specialist)
        $alphaTeam = Team::create([
            'name' => 'Alpha Team',
            'description' => 'Tim spesialis web development dengan pengalaman 5+ tahun. Fokus pada website modern dan responsif dengan performa tinggi.',
            'specialization' => 'web',
            'avatar' => '/images/teams/alpha-team.png',
            'is_available' => true,
            'average_rating' => 4.8,
            'total_projects' => 45,
            'completed_projects' => 42,
        ]);

        // Assign programmers ke Alpha Team
        TeamMember::create([
            'team_id' => $alphaTeam->id,
            'user_id' => $programmers[0]->id,
            'role' => 'Team Leader',
        ]);

        TeamMember::create([
            'team_id' => $alphaTeam->id,
            'user_id' => $programmers[1]->id,
            'role' => 'Frontend Developer',
        ]);

        // Team 2: Beta Squad (Fullstack)
        $betaTeam = Team::create([
            'name' => 'Beta Squad',
            'description' => 'Tim fullstack yang versatile, mampu handle project web dan mobile. Berpengalaman dalam berbagai teknologi modern.',
            'specialization' => 'fullstack',
            'avatar' => '/images/teams/beta-squad.png',
            'is_available' => true,
            'average_rating' => 4.9,
            'total_projects' => 38,
            'completed_projects' => 37,
        ]);

        TeamMember::create([
            'team_id' => $betaTeam->id,
            'user_id' => $programmers[2]->id,
            'role' => 'Fullstack Developer',
        ]);

        TeamMember::create([
            'team_id' => $betaTeam->id,
            'user_id' => $programmers[3]->id,
            'role' => 'Backend Developer',
        ]);

        // Team 3: Gamma Force (Mobile Specialist)
        $gammaTeam = Team::create([
            'name' => 'Gamma Force',
            'description' => 'Tim spesialis mobile app development. Expert dalam Android native dan cross-platform development.',
            'specialization' => 'mobile',
            'avatar' => '/images/teams/gamma-force.png',
            'is_available' => true,
            'average_rating' => 4.7,
            'total_projects' => 32,
            'completed_projects' => 30,
        ]);

        TeamMember::create([
            'team_id' => $gammaTeam->id,
            'user_id' => $programmers[4]->id,
            'role' => 'Mob Developer',
        ]);

        if (isset($programmers[5])) {
            TeamMember::create([
                'team_id' => $gammaTeam->id,
                'user_id' => $programmers[5]->id,
                'role' => 'UI/UX Designer',
            ]);
        }

        $this->command->info('Teams created successfully with programmer members!');
    }
}
