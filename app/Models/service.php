<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'standard_days',
        'risk_factor',
        'icon',
        'is_active',
        'features',
        'estimated_days',
        'category',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'risk_factor' => 'decimal:2',
        'is_active' => 'boolean',
        'features' => 'array',
    ];

    /**
     * Scope untuk active services
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Accessor untuk formatted price
     */
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format((float) $this->price, 0, ',', '.');
    }


    /**
     * Get orders for this service
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
