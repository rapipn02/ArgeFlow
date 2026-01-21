<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'user_id',
        'service_id',
        'team_id',
        'team_preference',
        'total_amount',
        'dp_amount',
        'final_amount',
        'status',
        'payment_status',
        'payment_method',
        'midtrans_order_id',
        'midtrans_snap_token',
        'dp_paid_at',
        'final_paid_at',
        'notes',
        'requirements',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'dp_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'dp_paid_at' => 'datetime',
        'final_paid_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = 'ORD-' . strtoupper(Str::random(10));
            }

            // Calculate DP and Final amounts (40% DP, 60% Final)
            if ($order->total_amount) {
                $order->dp_amount = $order->total_amount * 0.4;
                $order->final_amount = $order->total_amount * 0.6;
            }
        });
    }

    /**
     * Get the user that owns the order
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the service for this order
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the team for this order
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the rating for this order
     */
    public function rating()
    {
        return $this->hasOne(TeamRating::class);
    }

    /**
     * Scope to get orders by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get orders by payment status
     */
    public function scopeByPaymentStatus($query, $paymentStatus)
    {
        return $query->where('payment_status', $paymentStatus);
    }

    /**
     * Check if order is paid (DP)
     */
    public function isDpPaid()
    {
        return in_array($this->payment_status, ['dp_paid', 'fully_paid']);
    }

    /**
     * Check if order is fully paid
     */
    public function isFullyPaid()
    {
        return $this->payment_status === 'fully_paid';
    }

    /**
     * Mark DP as paid
     */
    public function markDpAsPaid()
    {
        $this->update([
            'payment_status' => 'dp_paid',
            'status' => 'in_progress',
            'dp_paid_at' => now(),
        ]);
    }

    /**
     * Mark as fully paid
     */
    public function markAsFullyPaid()
    {
        $this->update([
            'payment_status' => 'fully_paid',
            'status' => 'completed',
            'final_paid_at' => now(),
        ]);
    }

    /**
     * Get payment URL
     */
    public function getPaymentUrl()
    {
        return route('payment.show', ['order' => $this->id]);
    }

    /**
     * Check if order can be paid
     */
    public function canBePaid()
    {
        return in_array($this->payment_status, ['pending', 'failed']);
    }

    /**
     * Check if order is pending
     */
    public function isPending()
    {
        return $this->payment_status === 'pending';
    }
}
