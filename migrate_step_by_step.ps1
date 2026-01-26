$migrations = @(
    "2026_01_15_032736_create_services_table.php",
    "2026_01_15_040505_create_skills_table.php",
    "2026_01_15_040448_create_programmer_profiles_table.php",
    "2026_01_15_040527_create_programmer_skills_table.php",
    "2026_01_20_130534_create_teams_table.php",
    "2026_01_20_130538_create_team_members_table.php",
    "2026_01_22_000954_add_user_id_to_team_members_table.php",
    "2026_01_20_130541_create_orders_table.php",
    "2026_01_15_032909_create_project_progress_table.php",
    "2026_01_15_032940_create_progress_comments_table.php",
    "2026_01_15_033031_create_revisions_table.php",
    "2026_01_15_033038_create_ratings_table.php",
    "2026_01_15_033138_create_project_files_table.php",
    "2026_01_20_130547_create_team_ratings_table.php",
    "2026_01_15_033047_create_notifications_table.php",
    "2026_01_15_034430_create_programmer_earnings_table.php",
    "2026_01_22_000001_create_transactions_table.php",
    "2026_01_22_000002_create_financial_reports_table.php",
    "2026_01_22_000003_add_admin_fields_to_services_table.php"
)

foreach ($migration in $migrations) {
    Write-Host "Running migration: $migration" -ForegroundColor Yellow
    $result = php artisan migrate --path="database/migrations/$migration" --force 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR in $migration" -ForegroundColor Red
        Write-Host $result
        break
    } else {
        Write-Host "SUCCESS: $migration" -ForegroundColor Green
    }
}
