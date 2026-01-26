<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rating extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'client_id',
        'programmer_id',
        'rating',
        'review',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Get the order that owns the rating
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the client who gave the rating
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the programmer who received the rating
     */
    public function programmer()
    {
        return $this->belongsTo(User::class, 'programmer_id');
    }
}
