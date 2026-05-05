$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\User\AppData\Local\Temp\voxshots'
$dst = 'C:\Users\User\Desktop\work\web\myself-web\myself-web\public\cases\voxplan'

$targetPhoneHeight = 1100
$gap = 32
$padX = 40
$padY = 40

function New-Composite {
    param([string[]]$Files, [string]$OutputName)

    Write-Output "building $OutputName from $($Files.Count) files"

    $imgs = New-Object 'System.Collections.Generic.List[System.Drawing.Image]'
    foreach ($name in $Files) {
        $path = Join-Path $src $name
        if (-not (Test-Path $path)) { throw "missing: $path" }
        $imgs.Add([System.Drawing.Image]::FromFile($path))
    }

    $widths = @()
    $totalPhoneWidth = 0
    foreach ($im in $imgs) {
        $scale = $targetPhoneHeight / [double]$im.Height
        $w = [int]([math]::Round($im.Width * $scale))
        $widths += $w
        $totalPhoneWidth += $w
    }

    $count = $imgs.Count
    $canvasW = $padX * 2 + $totalPhoneWidth + $gap * ($count - 1)
    $canvasH = $padY * 2 + $targetPhoneHeight

    $bmp = New-Object System.Drawing.Bitmap($canvasW, $canvasH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)

    $x = $padX
    for ($i = 0; $i -lt $count; $i++) {
        $rect = New-Object System.Drawing.Rectangle($x, $padY, $widths[$i], $targetPhoneHeight)
        $g.DrawImage($imgs[$i], $rect)
        $x += $widths[$i] + $gap
    }
    $g.Dispose()

    $outPath = Join-Path $dst $OutputName
    $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [int64]88)
    $bmp.Save($outPath, $jpegEncoder, $params)
    $bmp.Dispose()
    foreach ($im in $imgs) { $im.Dispose() }

    Write-Output "  -> $outPath ($canvasW x $canvasH)"
}

# 1. Shared calendars: month view -> account/calendar list -> members -> calendar settings
New-Composite -Files @(
    'LINE_ALBUM_202655_260505_7.jpg',
    'LINE_ALBUM_202655_260505_6.jpg',
    'LINE_ALBUM_202655_260505_2.jpg',
    'LINE_ALBUM_202655_260505_11.jpg'
) -OutputName 'shared-calendars.jpg'

# 2. Voice input: idle -> recording -> transcribing -> result
New-Composite -Files @(
    'LINE_ALBUM_202655_260505_9.jpg',
    'LINE_ALBUM_202655_260505_13.jpg',
    'LINE_ALBUM_202655_260505_12.jpg',
    'LINE_ALBUM_202655_260505_14.jpg'
) -OutputName 'voice-input.jpg'

# 3. Group events: entry menu -> edit group -> manage active -> manage past -> sub-event detail
New-Composite -Files @(
    'LINE_ALBUM_202655_260505_16.jpg',
    'LINE_ALBUM_202655_260505_15.jpg',
    'LINE_ALBUM_202655_260505_3.jpg',
    'LINE_ALBUM_202655_260505_1.jpg',
    'LINE_ALBUM_202655_260505_4.jpg'
) -OutputName 'group-events.jpg'

# 4. Timezones: settings -> switch viewer -> dual-column day view
New-Composite -Files @(
    'LINE_ALBUM_202655_260505_5.jpg',
    'LINE_ALBUM_202655_260505_8.jpg',
    'LINE_ALBUM_202655_260505_10.jpg'
) -OutputName 'timezones.jpg'

Write-Output 'done'
