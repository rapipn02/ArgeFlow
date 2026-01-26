<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'progress_id',
        'user_id',
        'comment',
    ];

    /**
     * Get the progress that owns the comment
     */
    public function progress()
    {
        return $this->belongsTo(OrderProgress::class, 'progress_id');
    }

    /**
     * Get the user who created the comment
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
