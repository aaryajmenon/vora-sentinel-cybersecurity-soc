$files = @("js\data.js", "js\auth.js", "js\executive-registry.js", "js\app.js")

foreach ($f in $files) {
    if (Test-Path $f) {
        $text = [System.IO.File]::ReadAllText((Resolve-Path $f))
        $oBraces = [System.Text.RegularExpressions.Regex]::Matches($text, '\{').Count
        $cBraces = [System.Text.RegularExpressions.Regex]::Matches($text, '\}').Count
        $oBracks = [System.Text.RegularExpressions.Regex]::Matches($text, '\[').Count
        $cBracks = [System.Text.RegularExpressions.Regex]::Matches($text, '\]').Count
        $oParens = [System.Text.RegularExpressions.Regex]::Matches($text, '\(').Count
        $cParens = [System.Text.RegularExpressions.Regex]::Matches($text, '\)').Count
        Write-Host "$f => Braces: $($oBraces - $cBraces), Brackets: $($oBracks - $cBracks), Parens: $($oParens - $cParens)"
    }
}
