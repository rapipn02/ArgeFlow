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
        'revision_count',
        'completion_submitted_at',
        'accepted_at',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'dp_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'dp_paid_at' => 'datetime',
        'final_paid_at' => 'datetime',
        'completion_submitted_at' => 'datetime',
        'accepted_at' => 'datetime',
        'revision_count' => 'integer',
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
     * Get the rating for this order (team rating)
     */
    public function teamRating()
    {
        return $this->hasOne(TeamRating::class);
    }

    /**
     * Get the rating for this order (individual rating)
     */
    public function rating()
    {
        return $this->hasOne(Rating::class);
    }

    /**
     * Get all progress reports for this order
     */
    public function progress()
    {
        return $this->hasMany(OrderProgress::class);
    }

    /**
     * Get all files for this order
     */
    public function files()
    {
        return $this->hasMany(OrderFile::class);
    }

    /**
     * Get all revisions for this order
     */
    public function revisions()
    {
        return $this->hasMany(Revision::class);
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
        // Jika sudah ada team_id (client pilih sendiri), langsung in_progress
        // Jika belum (auto_assign), tetap dp_paid tunggu admin assign team
        $status = $this->team_id ? 'in_progress' : 'dp_paid';
        
        $this->update([
            'payment_status' => 'dp_paid',
            'status' => $status,
            'dp_paid_at' => now(),
        ]);
        
        // Catat transaksi pemasukan DP
        Transaction::create([
            'type' => 'income',
            'category' => 'project payment',
            'amount' => $this->dp_amount ?? ($this->total_amount * 0.5),
            'description' => 'Pembayaran DP - ' . $this->service->name . ' (Order #' . $this->order_number . ')',
            'reference_type' => 'App\\Models\\Order',
            'reference_id' => $this->id,
            'transaction_date' => now(),
            'created_by' => 1, // System/Admin ID
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
        
        // Catat transaksi pemasukan pelunasan
        Transaction::create([
            'type' => 'income',
            'category' => 'project payment',
            'amount' => $this->final_amount ?? ($this->total_amount * 0.5),
            'description' => 'Pelunasan - ' . $this->service->name . ' (Order #' . $this->order_number . ')',
            'reference_type' => 'App\\Models\\Order',
            'reference_id' => $this->id,
            'transaction_date' => now(),
            'created_by' => 1, // System/Admin ID
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

    /**
     * Check if can request revision (max 2)
     */
    public function canRequestRevision()
    {
        return $this->revision_count < 2 && $this->status === 'awaiting_review';
    }

    /**
     * Submit completion (progress 100%)
     */
    public function submitCompletion()
    {
        $this->update([
            'status' => 'awaiting_review',
            'completion_submitted_at' => now(),
        ]);
    }

    /**
     * Accept completion and move to final payment
     */
    public function acceptCompletion()
    {
        $this->update([
            'status' => 'final_payment',
            'accepted_at' => now(),
        ]);
    }

    /**
     * Request revision
     */
    public function requestRevision()
    {
        if (!$this->canRequestRevision()) {
            throw new \Exception('Maksimal revisi adalah 2 kali');
        }

        $this->update([
            'status' => 'revision_requested',
            'revision_count' => $this->revision_count + 1,
            'completion_submitted_at' => null,
        ]);
    }

    /**
     * Get latest progress
     */
    public function getLatestProgress()
    {
        return $this->progress()->orderBy('created_at', 'desc')->first();
    }

    /**
     * Check if has 100% progress
     */
    public function has100Progress()
    {
        return $this->progress()->where('progress_percentage', 100)->exists();
    }
}
