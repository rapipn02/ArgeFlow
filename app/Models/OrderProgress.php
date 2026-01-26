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
    ];

    protected $casts = [
        'progress_percentage' => 'integer',
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
}
