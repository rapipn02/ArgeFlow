<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammerProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'hourly_rate',
        'bank_name',
        'bank_account_number',
        'bank_account_holder',
        'portfolio_url',
        'is_available',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'hourly_rate' => 'decimal:2',
    ];

    /**
     * Get the user that owns the programmer profile
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the skills for the programmer
     */
    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'programmer_skills')
            ->withPivot('level', 'years_experience')
            ->withTimestamps();
    }

    /**
     * Get the programmer skills
     */
    public function programmerSkills()
    {
        return $this->hasMany(ProgrammerSkill::class);
    }
}
