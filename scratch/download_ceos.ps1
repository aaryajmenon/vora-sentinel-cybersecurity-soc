$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

$downloads = @{
    "tim_cook.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80"
    "mark_zuckerberg.jpg" = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80"
    "jensen_huang.jpg" = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80"
    "elon_musk.jpg" = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop&q=80"
    "kalyan_krishnamurthy.jpg" = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop&q=80"
    "deepinder_goyal.jpg" = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80"
    "sriharsha_majety.jpg" = "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&fit=crop&q=80"
    "bhavish_aggarwal.jpg" = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&fit=crop&q=80"
    "falguni_nayar.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop&q=80"
    "harshil_mathur.jpg" = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80"
    "vidit_aatrey.jpg" = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop&q=80"
    "sridhar_vembu.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80"
    "mukesh_ambani.jpg" = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80"
}

foreach ($k in $downloads.Keys) {
    $outPath = "assets\ceos\$k"
    if (!(Test-Path $outPath)) {
        try {
            $wc.DownloadFile($downloads[$k], $outPath)
            Write-Host "Downloaded: $k"
        } catch {
            Write-Host "Failed: $k - $_"
        }
    } else {
        Write-Host "Already exists: $k"
    }
}
