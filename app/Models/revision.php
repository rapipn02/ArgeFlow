<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Revision extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_id',
        'client_id',
        'description',
        'file_path',
        'status',
        'revision_number',
    ];

    /**
     * Get the order that owns the revision
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the client who requested the revision
     */
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
