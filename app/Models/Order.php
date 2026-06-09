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
        'notes',
        'requirements',
        'requested_days',
        'rush_fee',
        'deadline_date',
        'revision_count',
        'completion_submitted_at',
        'accepted_at',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'dp_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'rush_fee' => 'decimal:2',
        'deadline_date' => 'date',
        'completion_submitted_at' => 'datetime',
        'accepted_at' => 'datetime',
        'revision_count' => 'integer',
        'requested_days' => 'integer',
    ];

    /**
     * Atribut yang selalu di-append saat serialisasi (agar frontend tetap menerima data payment)
     */
    protected $appends = [
        'payment_status',
        'payment_method',
        'midtrans_order_id',
        'midtrans_snap_token',
        'dp_paid_at',
        'final_paid_at',
    ];

   
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = 'ORD-' . strtoupper(Str::random(10));
            }

         
            if ($order->total_amount) {
                $order->dp_amount = $order->total_amount * 0.4;
                $order->final_amount = $order->total_amount * 0.6;
            }
        });

        static::created(function ($order) {
            OrderPayment::create([
                'order_id' => $order->id,
                'payment_status' => 'pending',
            ]);
        });
    }

    // =============================================
    // RELASI
    // =============================================

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
     * Get the payment data for this order (1:1)
     */
    public function payment()
    {
        return $this->hasOne(OrderPayment::class);
    }

    /**
     * Get the rating for this order (team rating)
     */
    public function teamRating()
    {
        return $this->hasOne(TeamRating::class);
    }

    /**
     * Get all progress reports for this order
     */
    public function progress()
    {
        return $this->hasMany(OrderProgress::class);
    }

    /**
     * Get all revisions for this order
     */
    public function revisions()
    {
        return $this->hasMany(Revision::class);
    }

    // =============================================
    // ACCESSOR (backward compatibility — agar $order->payment_status dll tetap bisa diakses)
    // =============================================

    public function getPaymentStatusAttribute()
    {
        return $this->payment?->payment_status;
    }

    public function getPaymentMethodAttribute()
    {
        return $this->payment?->payment_method;
    }

    public function getMidtransOrderIdAttribute()
    {
        return $this->payment?->midtrans_order_id;
    }

    public function getMidtransSnapTokenAttribute()
    {
        return $this->payment?->midtrans_snap_token;
    }

    public function getDpPaidAtAttribute()
    {
        return $this->payment?->dp_paid_at;
    }

    public function getFinalPaidAtAttribute()
    {
        return $this->payment?->final_paid_at;
    }

    // =============================================
    // SCOPE
    // =============================================

    /**
     * Scope to get orders by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get orders by payment status (query melalui relasi)
     */
    public function scopeByPaymentStatus($query, $paymentStatus)
    {
        return $query->whereHas('payment', function ($q) use ($paymentStatus) {
            $q->where('payment_status', $paymentStatus);
        });
    }

    // =============================================
    // BUSINESS LOGIC
    // =============================================

    /**
     * Check if order is paid (DP)
     */
    public function isDpPaid()
    {
        return in_array($this->payment?->payment_status, ['dp_paid', 'fully_paid']);
    }

    /**
     * Check if order is fully paid
     */
    public function isFullyPaid()
    {
        return $this->payment?->payment_status === 'fully_paid';
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
            'status' => $status,
        ]);

        $this->payment->update([
            'payment_status' => 'dp_paid',
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
            'status' => 'completed',
        ]);

        $this->payment->update([
            'payment_status' => 'fully_paid',
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

        // Increment team completed projects
        if ($this->team) {
            $this->team->incrementCompletedProjects();
        }
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
        return in_array($this->payment?->payment_status, ['pending', 'failed']);
    }

    /**
     * Check if order is pending
     */
    public function isPending()
    {
        return $this->payment?->payment_status === 'pending';
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
