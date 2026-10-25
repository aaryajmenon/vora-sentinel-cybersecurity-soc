try {
    $res = Invoke-WebRequest -Uri 'http://localhost:5050/' -Method Head -TimeoutSec 3
    Write-Host "Local server status: $($res.StatusCode)"
} catch {
    Write-Host "Local server error: $_"
}
