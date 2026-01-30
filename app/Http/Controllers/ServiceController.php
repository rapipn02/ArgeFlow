<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Get all active services for client
     * This API endpoint can be used by frontend to display available services
     */
    public function index()
    {
        $services = Service::active()
            ->select('id', 'name', 'description', 'price', 'standard_days', 'risk_factor', 'icon', 'features', 'category')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
            'pricing_config' => [
                'default_risk_factor' => config('pricing.default_risk_factor', 0.75),
                'max_multiplier' => config('pricing.max_price_multiplier', 1.6),
                'min_multiplier' => config('pricing.min_price_multiplier', 1.0),
            ],
        ]);
    }

    /**
     * Get single service details
     */
    public function show($id)
    {
        $service = Service::active()
            ->select('id', 'name', 'description', 'price', 'standard_days', 'risk_factor', 'icon', 'features', 'category')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $service,
            'pricing_config' => [
                'default_risk_factor' => config('pricing.default_risk_factor', 0.75),
                'max_multiplier' => config('pricing.max_price_multiplier', 1.6),
                'min_multiplier' => config('pricing.min_price_multiplier', 1.0),
            ],
        ]);
    }

    /**
     * Calculate pricing with deadline
     */
    public function calculatePrice(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'requested_days' => 'required|integer|min:1',
        ]);

        $basePrice = $service->price;
        $rushFee = 0;
        $daysRushed = 0;
        $accelerationFactor = 1.0;
        $percentageIncrease = 0;

        // Dynamic pricing calculation
        if ($requestedDays < $standardDays) {
            $daysRushed = $standardDays - $requestedDays;
            
            // Get risk factor
            $riskFactor = $service->risk_factor ?? config('pricing.default_risk_factor', 0.75);
            $maxMultiplier = config('pricing.max_price_multiplier', 1.6);
            $minMultiplier = config('pricing.min_price_multiplier', 1.0);
            
            // Calculate acceleration
            $accelerationRatio = $standardDays / $requestedDays;
            $accelerationFactor = 1 + (($accelerationRatio - 1) * $riskFactor);
            
            // Clamp to min/max
            $accelerationFactor = max($minMultiplier, min($maxMultiplier, $accelerationFactor));
            
            $totalPrice = $basePrice * $accelerationFactor;
            $rushFee = $totalPrice - $basePrice;
            $percentageIncrease = (($accelerationFactor - 1) * 100);
        } else {
            $totalPrice = $basePrice;
        }

        $dpAmount = $totalPrice * 0.4; // 40% DP
        $finalAmount = $totalPrice * 0.6; // 60% Final

        return response()->json([
            'success' => true,
            'data' => [
                'service_name' => $service->name,
                'standard_days' => $standardDays,
                'requested_days' => $requestedDays,
                'days_rushed' => $daysRushed,
                'base_price' => $basePrice,
                'acceleration_factor' => $accelerationFactor,
                'rush_fee' => $rushFee,
                'total_price' => $totalPrice,
                'percentage_increase' => $percentageIncreastedDays,
                'days_rushed' => $daysRushed,
                'base_price' => $basePrice,
                'rush_fee' => $rushFee,
                'total_price' => $totalPrice,
                'dp_amount' => $dpAmount,
                'final_amount' => $finalAmount,
            ],
        ]);
    }
}
