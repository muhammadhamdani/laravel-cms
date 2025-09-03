# 📰 Laravel CMS

📦 **Laravel CMS** adalah Content Management System modern berbasis [Laravel](https://laravel.com/) yang fleksibel, ringan, dan mudah dikembangkan.  
Dibuat untuk membantu developer maupun non-teknis dalam mengelola website dengan cepat dan terstruktur.

---

## ✨ Fitur Utama

- ⚡ **Laravel 10+**
- 🔐 **Autentikasi & otorisasi** siap pakai
- 🛡️ **Role & Permission Management** (Spatie Laravel Permission)
- 📝 **Manajemen Konten**
  - Halaman statis (Page)
  - Artikel / Blog Post
  - Kategori & Tag
- 👤 **User Management** (Admin & User)
- 🎨 **Multi-theme & Dark Mode** berbasis Tailwind CSS (CSS variable + oklch)
- 📂 **Media Manager** untuk upload & kelola file/gambar
- 📰 **Editor Konten** (Rich Text / WYSIWYG)
- 📜 **Log Viewer** (opcodesio/log-viewer)
- 📝 **Custom Activity Logger** (success, info, warning, error)
- 🔍 **SEO Friendly** (slug otomatis, meta title, meta description)
- 📡 **API Ready** (Sanctum / Inertia.js)
- ♻️ **Struktur modular & reusable components**

---

## ⚙️ Instalasi

Clone repo dan jalankan instalasi berikut:

```bash
git clone https://github.com/username/laravel-cms.git
cd laravel-cms

cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed

npm install && npm run dev

## 🔐 Login Default (Seeder)
Role	Email	Password
Admin	admin@example.com
	password
User	user@example.com
	password
## 📂 Struktur Direktori
app/
├── Http/
│   ├── Controllers/
│   └── Middleware/
├── Models/
├── Policies/
├── Traits/

routes/
├── web.php
├── api.php

resources/
├── js/         ← React + Inertia (SPA Ready)
├── views/      ← Blade templates
├── css/        ← Tailwind themes

database/
├── migrations/
├── seeders/

🧰 Fitur Teknis
🔑 Role & Permission

Dibangun menggunakan Spatie Laravel Permission

Mendukung guard multi-auth (Admin/User)

Policy & middleware siap pakai

📝 CMS Modules

Page Builder → Halaman statis dengan slug & meta

Blog Module → Artikel, kategori, tag

Media Manager → Upload gambar, file, dokumen

Menu Builder → Navigasi dinamis

📜 Logging & Monitoring

Log Viewer → integrasi opcodesio/log-viewer

Activity Logger → Catat semua aksi penting ke storage/logs/activity.log

🎨 Theming System

Multi-theme berbasis CSS variable & Tailwind

Dukungan dark mode

Mudah di-extend untuk kebutuhan custom UI

📦 Perintah Artisan Tambahan
php artisan permission:cache-reset
php artisan make:policy MyPolicy --model=MyModel
php artisan make:trait LogsActivity

👨‍💻 Kontributor

👤 Your Name

📜 Lisensi

Proyek ini dilisensikan di bawah MIT License
.
Silakan gunakan, modifikasi, dan kontribusi untuk pengembangan lebih lanjut 🚀.

💡 Tips Penggunaan

Gunakan trait LogsActivity untuk mencatat aktivitas user.

Cek storage/logs/activity.log untuk log aktivitas berdasarkan aksi & user.

Gunakan seeder untuk membuat role & permission awal.

🔥 Dengan Laravel CMS, kamu bisa langsung membangun website & aplikasi konten tanpa repot setup dari nol!


---

Apakah kamu mau saya bikinkan juga **badge GitHub (stars, forks, issues, license, Laravel version)** di bagian atas README supaya lebih profesional, seperti repo open source populer?
