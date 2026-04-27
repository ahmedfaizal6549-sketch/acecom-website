@echo off
echo ========================================
echo   AceCom Lanka - Website Server
echo ========================================
echo.
echo Open your browser and go to:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.
python3 -m http.server 3000 2>nul || python -m http.server 3000
