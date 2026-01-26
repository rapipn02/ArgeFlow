<?php

use Illuminate\Support\Facades\Artisan;

try {
    Artisan::call('migrate', ['--force' => true]);
    echo Artisan::output();
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "\nStack trace:\n" . $e->getTraceAsString();
}
