@echo off
title Setup GitHub Otomatis
echo ========================================================
echo SETUP GITHUB UNTUK UPDATE OTOMATIS OLEH AI
echo ========================================================
echo.

:: Cek apakah Git ada
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [PERHATIAN] Anda perlu menginstal Git terlebih dahulu!
    echo Saya akan membuka browser untuk mendownload Git.
    echo Silakan install, klik Next terus sampai selesai.
    pause
    start https://git-scm.com/download/win
    echo.
    echo Setelah Git selesai diinstal, silakan TUTUP jendela hitam ini
    echo dan BUKA KEMBALI file login_github.bat
    pause
    exit
)

echo [OK] Git sudah siap.
echo.
echo [LOGIN GITHUB]
echo Setelah ini, akan terbuka browser. Silakan klik tombol "Authorize"
echo untuk mengizinkan aplikasi ini mengakses akun GitHub Anda.
echo.
pause

gh auth login --web -h github.com

echo.
echo [PENGATURAN REPOSITORY]
echo Menyambungkan folder ini ke repository GitHub Anda...
git init
git remote add origin https://github.com/herifortuin-cmd/fincontrol.git
git fetch
git branch -M main
git reset --mixed origin/main

echo.
echo ========================================================
echo SUKSES! Anda bisa menutup jendela ini sekarang.
echo ========================================================
pause
