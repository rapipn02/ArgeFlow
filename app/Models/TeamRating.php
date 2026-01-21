<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'user_id',
        'order_id',
        'rating',
        'review',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        // Update team average rating after creating/updating/deleting a rating
        static::created(function ($rating) {
            $rating->team->updateAverageRating();
        });

        static::updated(function ($rating) {
            $rating->team->updateAverageRating();
        });

        static::deleted(function ($rating) {
            $rating->team->updateAverageRating();
        });
    }

    /**
     * Get the team that owns the rating
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the user that created the rating
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the order for this rating
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
