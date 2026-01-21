<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        TeamMember::create([
            'team_id' => $alphaTeam->id,
            'name' => 'Sarah Johnson',
            'role' => 'UI/UX Designer',
            'avatar' => '/images/members/sarah.png',
            'bio' => 'UI/UX Designer dengan 6 tahun pengalaman. Spesialis dalam user-centered design.',
        ]);

        TeamMember::create([
            'team_id' => $alphaTeam->id,
            'name' => 'Michael Chen',
            'role' => 'Frontend Developer',
            'avatar' => '/images/members/michael.png',
            'bio' => 'Frontend Developer expert dalam React, Vue, dan modern CSS frameworks.',
        ]);

        TeamMember::create([
            'team_id' => $alphaTeam->id,
            'name' => 'David Rodriguez',
            'role' => 'Backend Developer',
            'avatar' => '/images/members/david.png',
            'bio' => 'Backend Developer dengan keahlian Laravel, Node.js, dan database optimization.',
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
            'name' => 'Emma Wilson',
            'role' => 'UI/UX Designer',
            'avatar' => '/images/members/emma.png',
            'bio' => 'Creative UI/UX Designer dengan portfolio internasional.',
        ]);

        TeamMember::create([
            'team_id' => $betaTeam->id,
            'name' => 'James Anderson',
            'role' => 'Fullstack Developer',
            'avatar' => '/images/members/james.png',
            'bio' => 'Fullstack Developer dengan expertise di React, Laravel, dan cloud deployment.',
        ]);

        TeamMember::create([
            'team_id' => $betaTeam->id,
            'name' => 'Lisa Martinez',
            'role' => 'Backend Developer',
            'avatar' => '/images/members/lisa.png',
            'bio' => 'Backend specialist dengan fokus pada API development dan microservices.',
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
            'name' => 'Ryan Taylor',
            'role' => 'UI/UX Designer',
            'avatar' => '/images/members/ryan.png',
            'bio' => 'Mobile UI/UX specialist dengan pengalaman di berbagai platform.',
        ]);

        TeamMember::create([
            'team_id' => $gammaTeam->id,
            'name' => 'Kevin Brown',
            'role' => 'Frontend Developer',
            'avatar' => '/images/members/kevin.png',
            'bio' => 'Mobile frontend developer expert dalam React Native dan Flutter.',
        ]);

        TeamMember::create([
            'team_id' => $gammaTeam->id,
            'name' => 'Amanda White',
            'role' => 'Backend Developer',
            'avatar' => '/images/members/amanda.png',
            'bio' => 'Backend developer dengan fokus pada mobile API dan real-time features.',
        ]);

        // Team 4: Delta Crew (E-Commerce Specialist)
        $deltaTeam = Team::create([
            'name' => 'Delta Crew',
            'description' => 'Tim spesialis e-commerce dengan track record membangun toko online yang sukses. Expert dalam payment gateway integration.',
            'specialization' => 'web',
            'avatar' => '/images/teams/delta-crew.png',
            'is_available' => true,
            'average_rating' => 4.6,
            'total_projects' => 28,
            'completed_projects' => 26,
        ]);

        TeamMember::create([
            'team_id' => $deltaTeam->id,
            'name' => 'Sophia Garcia',
            'role' => 'UI/UX Designer',
            'avatar' => '/images/members/sophia.png',
            'bio' => 'E-commerce UX specialist dengan fokus pada conversion optimization.',
        ]);

        TeamMember::create([
            'team_id' => $deltaTeam->id,
            'name' => 'Daniel Lee',
            'role' => 'Frontend Developer',
            'avatar' => '/images/members/daniel.png',
            'bio' => 'Frontend developer dengan expertise dalam e-commerce platforms.',
        ]);

        TeamMember::create([
            'team_id' => $deltaTeam->id,
            'name' => 'Jessica Kim',
            'role' => 'Backend Developer',
            'avatar' => '/images/members/jessica.png',
            'bio' => 'Backend developer spesialis payment integration dan inventory management.',
        ]);

        // Team 5: Echo Unit (Startup Specialist)
        $echoTeam = Team::create([
            'name' => 'Echo Unit',
            'description' => 'Tim yang fokus pada startup dan MVP development. Cepat, agile, dan result-oriented.',
            'specialization' => 'fullstack',
            'avatar' => '/images/teams/echo-unit.png',
            'is_available' => false, // Currently busy
            'average_rating' => 5.0,
            'total_projects' => 25,
            'completed_projects' => 25,
        ]);

        TeamMember::create([
            'team_id' => $echoTeam->id,
            'name' => 'Alex Thompson',
            'role' => 'UI/UX Designer',
            'avatar' => '/images/members/alex.png',
            'bio' => 'Startup UX designer dengan pengalaman membangun produk dari 0 to 1.',
        ]);

        TeamMember::create([
            'team_id' => $echoTeam->id,
            'name' => 'Chris Miller',
            'role' => 'Fullstack Developer',
            'avatar' => '/images/members/chris.png',
            'bio' => 'Fullstack developer dengan rapid prototyping skills.',
        ]);

        TeamMember::create([
            'team_id' => $echoTeam->id,
            'name' => 'Maria Santos',
            'role' => 'Project Manager',
            'avatar' => '/images/members/maria.png',
            'bio' => 'Agile project manager dengan track record sukses di berbagai startup.',
        ]);
    }
}
