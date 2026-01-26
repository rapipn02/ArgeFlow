<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammerEarning extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'programmer_id',
        'total_amount',
        'platform_fee',
        'net_amount',
        'status',
        'paid_at',
        'payment_notes',
        'paid_by',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'total_amount' => 'decimal:2',
        'platform_fee' => 'decimal:2',
        'net_amount' => 'decimal:2',
    ];

    /**
     * Get the user (programmer) that owns the earning
     */
    public function programmer()
    {
        return $this->belongsTo(User::class, 'programmer_id');
    }

    /**
     * Get the order associated with this earning
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the admin who processed the payment
     */
    public function paidBy()
    {
        return $this->belongsTo(User::class, 'paid_by');
    }
}
