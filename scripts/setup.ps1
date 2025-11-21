# Setup script for TypeScript Microservice Demo (PowerShell)

Write-Host "🚀 Setting up TypeScript Microservice Demo..." -ForegroundColor Cyan

# Check Node.js version
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js >= 18.0.0" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Create logs directory
Write-Host "📁 Creating logs directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

# Copy env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from env.example..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "⚠️  Please update .env file with your configuration" -ForegroundColor Yellow
}

# Build the project
Write-Host "🔨 Building TypeScript project..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "  npm run dev"
Write-Host ""
Write-Host "To start the production server, run:" -ForegroundColor Cyan
Write-Host "  npm start"
Write-Host ""
Write-Host "To run tests, run:" -ForegroundColor Cyan
Write-Host "  npm test"

