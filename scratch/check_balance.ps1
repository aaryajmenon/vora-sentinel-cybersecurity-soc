$files = @(
    "js\data.js",
    "js\auth.js",
    "js\executive-registry.js",
    "js\app.js",
    "index.html"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content -Path $f -Raw
        Write-Host "Checking $f : Length = $($content.Length) chars"

        # Check basic bracket counts
        $openBraces = ($content.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $closeBraces = ($content.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        $openBrackets = ($content.ToCharArray() | Where-Object { $_ -eq '[' }).Count
        $closeBrackets = ($content.ToCharArray() | Where-Object { $_ -eq ']' }).Count
        $openParens = ($content.ToCharArray() | Where-Object { $_ -eq '(' }).Count
        $closeParens = ($content.ToCharArray() | Where-Object { $_ -eq ')' }).Count

        Write-Host "  Braces:   { $openBraces } vs } $closeBraces } (Diff: $($openBraces - $closeBraces))"
        Write-Host "  Brackets: [ $openBrackets ] vs ] $closeBrackets ] (Diff: $($openBrackets - $closeBrackets))"
        Write-Host "  Parens:   ( $openParens ) vs ) $closeParens ) (Diff: $($openParens - $closeParens))"
        
        if ($openBraces -ne $closeBraces) {
            Write-Host "  [WARN] Mismatched braces in $f" -ForegroundColor Red
        } else {
            Write-Host "  [OK] Braces balanced" -ForegroundColor Green
        }
    } else {
        Write-Host "File not found: $f" -ForegroundColor Red
    }
}
