<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressReaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_progress_id',
        'user_id',
        'type', // 'like' or 'dislike'
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        // Update progress counts when reaction is created
        static::created(function ($reaction) {
            $reaction->progress->updateReactionCounts();
        });

        // Update progress counts when reaction is updated
        static::updated(function ($reaction) {
            $reaction->progress->updateReactionCounts();
        });

        // Update progress counts when reaction is deleted
        static::deleted(function ($reaction) {
            $reaction->progress->updateReactionCounts();
        });
    }

    /**
     * Get the progress that owns the reaction
     */
    public function progress()
    {
        return $this->belongsTo(OrderProgress::class, 'order_progress_id');
    }

    /**
     * Get the user that owns the reaction
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
