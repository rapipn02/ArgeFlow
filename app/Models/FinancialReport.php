<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'month',
        'year',
        'total_income',
        'total_expense',
        'balance',
        'notes',
    ];

    protected $casts = [
        'total_income' => 'decimal:2',
        'total_expense' => 'decimal:2',
        'balance' => 'decimal:2',
    ];

    /**
     * Scope untuk filter by month
     */
    public function scopeMonth($query, $month)
    {
        return $query->where('month', $month);
    }

    /**
     * Scope untuk filter by year
     */
    public function scopeYear($query, $year)
    {
        return $query->where('year', $year);
    }

    /**
     * Generate report dari transactions
     */
    public static function generateReport($month, $year)
    {
        $income = Transaction::income()
            ->monthYear($month, $year)
            ->sum('amount');

        $expense = Transaction::expense()
            ->monthYear($month, $year)
            ->sum('amount');

        $balance = $income - $expense;

        return self::updateOrCreate(
            ['month' => $month, 'year' => $year],
            [
                'total_income' => $income,
                'total_expense' => $expense,
                'balance' => $balance,
            ]
        );
    }

    /**
     * Accessor untuk formatted income
     */
    public function getFormattedIncomeAttribute()
    {
        return 'Rp ' . number_format((float) $this->total_income, 0, ',', '.');
    }

    /**
     * Accessor untuk formatted expense
     */
    public function getFormattedExpenseAttribute()
    {
        return 'Rp ' . number_format((float) $this->total_expense, 0, ',', '.');
    }

    /**
     * Accessor untuk formatted balance
     */
    public function getFormattedBalanceAttribute()
    {
        return 'Rp ' . number_format((float) $this->balance, 0, ',', '.');
    }

    /**
     * Accessor untuk month name
     */
    public function getMonthNameAttribute()
    {
        $months = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember'
        ];
        return $months[$this->month] ?? '';
    }
}
