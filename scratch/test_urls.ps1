$urls = @(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tim_Cook_2017_%28cropped%29.jpg/440px-Tim_Cook_2017_%28cropped%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/440px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_at_Computex_2023.jpg/440px-Jensen_Huang_at_Computex_2023.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
  'https://ui-avatars.com/api/?name=Kalyan+Krishnamurthy&background=0284c7&color=fff&size=200&bold=true'
)
foreach ($u in $urls) {
  try {
    $res = Invoke-WebRequest -Uri $u -Method Head -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' -TimeoutSec 5
    Write-Host "$($res.StatusCode) : $u"
  } catch {
    Write-Host "ERR : $u : $($_.Exception.Message)"
  }
}
