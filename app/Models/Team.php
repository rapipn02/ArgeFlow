<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'specialization',
        'avatar',
        'is_available',
        'average_rating',
        'total_projects',
        'completed_projects',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'average_rating' => 'decimal:2',
        'total_projects' => 'integer',
        'completed_projects' => 'integer',
    ];

    /**
     * Get the team members
     */
    public function members()
    {
        return $this->hasMany(TeamMember::class);
    }

    /**
     * Get the team ratings
     */
    public function ratings()
    {
        return $this->hasMany(TeamRating::class);
    }

    /**
     * Get the orders for this team
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Scope to get only available teams
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    /**
     * Scope to get teams by specialization
     */
    public function scopeBySpecialization($query, $specialization)
    {
        return $query->where('specialization', $specialization);
    }

    /**
     * Update average rating
     */
    public function updateAverageRating()
    {
        $this->average_rating = $this->ratings()->avg('rating') ?? 0;
        $this->save();
    }

    /**
     * Increment project counts
     */
    public function incrementProjects()
    {
        $this->increment('total_projects');
    }

    /**
     * Increment completed projects
     */
    public function incrementCompletedProjects()
    {
        $this->increment('completed_projects');
    }
}
