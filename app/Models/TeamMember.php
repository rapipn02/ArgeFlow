<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'user_id',
        'name',
        'role',
        'avatar',
        'bio',
    ];

    /**
     * Get the team that owns the member
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the user associated with this team member
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
