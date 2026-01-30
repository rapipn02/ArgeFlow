<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Dynamic Pricing Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration untuk sistem dynamic timeline-based pricing
    |
    */

    // Default risk factor (0.0 - 1.0)
    'default_risk_factor' => 0.75,

    // Maximum price multiplier (harga tidak akan lebih dari ini)
    'max_price_multiplier' => 1.6,

    // Minimum price multiplier (harga tidak akan kurang dari ini)
    'min_price_multiplier' => 1.0,

    // Risk factor per kategori service
    'risk_factors' => [
        'landing-page' => 0.6,
        'company-profile' => 0.7,
        'ecommerce' => 0.8,
        'mobile-app' => 0.85,
        'web-app' => 0.9,
        'default' => 0.75,
    ],
];
