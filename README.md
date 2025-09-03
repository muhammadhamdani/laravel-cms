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

## 🛠️ Instalasi

```bash
git clone https://github.com/muhammadhamdani/laravel-starter-kit.git
cd laravel-starter-kit
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
npm install && npm run dev
```

## 🔐 Login Default (Seeder)

| Role     | Email               | Password  |
|----------|---------------------|-----------|
| Admin    | admin@example.com   | password  |
| Users    | user@example.com    | password  |

---

## 🧩 Struktur Utama

```
app/
├── Http/
│   ├── Controllers/
│   └── Middleware/
├── Models/
├── Policies/
├── Traits/
routes/
├── web.php
resources/
├── js/         ← React + Inertia
├── views/
database/
├── migrations/
├── seeders/
```

---

## 🧰 Fitur Teknis

- **Spatie Laravel Permission**  
  Role dan permission berbasis middleware & policy.

- **Inertia.js + React**  
  SPA tanpa API tambahan.

- **Log Viewer**  
  Integrasi `opcodesio/log-viewer` untuk melihat log Laravel.

- **Activity Logger (Custom Logging)**  
  Logging actions ke file `activity.log` berdasarkan tipe (`success`, `error`, `info`, `warning`).

- **Theming System**  
  Support multiple themes berbasis `oklch()` dan CSS variable.

---

## 📦 Perintah Artisan Tambahan

```bash
php artisan permission:cache-reset
php artisan make:policy MyPolicy --model=MyModel
php artisan make:trait LogsActivity
```

---

## 🧑‍💻 Kontributor

👤 [muhammadhamdani](https://github.com/muhammadhamdani)

---

## 📜 Lisensi

MIT License. Silakan gunakan, modifikasi, dan kontribusi!

---

## 💡 Tips

> Gunakan `trait LogsActivity` untuk mencatat setiap aktivitas penting.  
> Cek `storage/logs/activity.log` untuk log aktivitas berdasarkan user & action.
> Gunakan `trait LogsActivity` untuk mencatat setiap aktivitas penting.  
> Cek `storage/logs/activity.log` untuk log aktivitas berdasarkan user & action.
