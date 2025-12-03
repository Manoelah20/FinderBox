# Script para copiar arquivos para apps/finderbox
Write-Host "📦 Copiando arquivos para apps/finderbox..." -ForegroundColor Cyan

# Criar diretórios se não existirem
New-Item -ItemType Directory -Force -Path "apps\finderbox\src" | Out-Null
New-Item -ItemType Directory -Force -Path "apps\finderbox\assets" | Out-Null

# Copiar src/ (exceto o GoogleAnalytics que já foi atualizado)
Write-Host "📁 Copiando src/..." -ForegroundColor Yellow
$exclude = @("GoogleAnalytics.tsx")
Get-ChildItem -Path "src" -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring((Resolve-Path "src").Path.Length + 1)
    $destPath = Join-Path "apps\finderbox\src" $relativePath
    $destDir = Split-Path $destPath -Parent
    
    # Pular GoogleAnalytics.tsx (já foi atualizado)
    if ($_.Name -eq "GoogleAnalytics.tsx") {
        Write-Host "⏭️  Pulando $($_.Name) (já atualizado)" -ForegroundColor Gray
        return
    }
    
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Copy-Item -Path $_.FullName -Destination $destPath -Force
    Write-Host "✓ $relativePath" -ForegroundColor Green
}

# Copiar assets
Write-Host "🖼️  Copiando assets..." -ForegroundColor Yellow
if (Test-Path "src\assets\finderbox.png") {
    Copy-Item -Path "src\assets\finderbox.png" -Destination "apps\finderbox\assets\finderbox.png" -Force
    Write-Host "✓ assets/finderbox.png" -ForegroundColor Green
} elseif (Test-Path "public\assets\finderbox.png") {
    Copy-Item -Path "public\assets\finderbox.png" -Destination "apps\finderbox\assets\finderbox.png" -Force
    Write-Host "✓ assets/finderbox.png (de public)" -ForegroundColor Green
}

Write-Host "`n✅ Concluído! Agora execute: cd apps/finderbox && npm install && npm run dev:web" -ForegroundColor Green





