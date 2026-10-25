# VORA Platform - Universal Local HTTP Web Server
# Zero dependencies - Uses built-in Windows .NET HttpListener
param([int]$Port = 5050)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = (Get-Location).Path }
Set-Location $scriptDir

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

$listener = New-Object System.Net.HttpListener
$url1 = "http://localhost:$Port/"
$url2 = "http://127.0.0.1:$Port/"

try {
    $listener.Prefixes.Add($url1)
    $listener.Prefixes.Add($url2)
    $listener.Start()
} catch {
    Write-Error "Failed to start HTTP listener on port ${Port}: $_"
    exit 1
}

Write-Host "=========================================================="
Write-Host " VORA Platform Web Server is ACTIVE"
Write-Host " Local Access Link:  http://localhost:$Port/"
Write-Host " IP Access Link:     http://127.0.0.1:$Port/"
Write-Host " Compatible with EVERY browser:"
Write-Host "   * Google Chrome"
Write-Host "   * Microsoft Edge"
Write-Host "   * Mozilla Firefox"
Write-Host "   * Apple Safari"
Write-Host "   * Brave / Opera / Vivaldi"
Write-Host " Press Ctrl+C to stop the server"
Write-Host "=========================================================="

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS and universal browser headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }

        $relativePath = $path.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $fullPath = [System.IO.Path]::Combine($scriptDir, $relativePath)

        if ([System.IO.File]::Exists($fullPath)) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime
            $response.StatusCode = 200

            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $response.ContentLength64 = $notFoundBytes.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
            }
        }
        $response.Close()
    } catch {
        # Log and continue
    }
}
