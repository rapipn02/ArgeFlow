$migrations = Get-ChildItem "database\migrations\*.php" | Sort-Object Name

foreach ($migration in $migrations) {
    $migrationName = $migration.Name
    Write-Host "`nRunning: $migrationName" -ForegroundColor Cyan
    
    $output = php artisan migrate --path="database/migrations/$migrationName" --force 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        if ($output -match "Nothing to migrate") {
            Write-Host "  SKIPPED (already migrated)" -ForegroundColor Gray
        } else {
            Write-Host "  SUCCESS" -ForegroundColor Green
        }
    } else {
        Write-Host "  FAILED" -ForegroundColor Red
        Write-Host "  Error: $output" -ForegroundColor Red
    }
}

Write-Host "`n=== Migration Summary ===" -ForegroundColor Yellow
php artisan migrate:status
