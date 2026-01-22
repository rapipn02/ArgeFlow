<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammerSkill extends Model
{
    use HasFactory;

    protected $fillable = [
        'programmer_profile_id',
        'skill_id',
        'level',
        'years_experience',
    ];

    /**
     * Get the programmer profile that owns the skill
     */
    public function programmerProfile()
    {
        return $this->belongsTo(ProgrammerProfile::class);
    }

    /**
     * Get the skill
     */
    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}
