<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'payment_status',
        'payment_method',
        'midtrans_order_id',
        'midtrans_snap_token',
        'dp_paid_at',
        'final_paid_at',
    ];

    protected $casts = [
        'dp_paid_at' => 'datetime',
        'final_paid_at' => 'datetime',
    ];

    /**
     * Get the order that owns the payment
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
