<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProgress extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'order_progress';

    protected $fillable = [
        'order_id',
        'programmer_id',
        'description',
        'file_path',
        'progress_percentage',
        'likes_count',
        'dislikes_count',
    ];

    protected $casts = [
        'progress_percentage' => 'integer',
        'likes_count' => 'integer',
        'dislikes_count' => 'integer',
    ];

    /**
     * Get the order that owns the progress
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the programmer who created this progress
     */
    public function programmer()
    {
        return $this->belongsTo(User::class, 'programmer_id');
    }

    /**
     * Get the comments for this progress
     */
    public function comments()
    {
        return $this->hasMany(ProgressComment::class, 'progress_id');
    }

    /**
     * Get the reactions for this progress
     */
    public function reactions()
    {
        return $this->hasMany(ProgressReaction::class, 'order_progress_id');
    }

    /**
     * Update reaction counts
     */
    public function updateReactionCounts()
    {
        $this->update([
            'likes_count' => $this->reactions()->where('type', 'like')->count(),
            'dislikes_count' => $this->reactions()->where('type', 'dislike')->count(),
        ]);
    }

    /**
     * Get user's reaction for this progress
     */
    public function userReaction($userId)
    {
        return $this->reactions()->where('user_id', $userId)->first();
    }
}
