<?php

namespace Database\Seeders;

use App\Models\Cms\Tag;
use App\Models\Cms\Post;
use App\Models\Cms\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // -----------------------------
        // 1. Buat Categories
        // -----------------------------
        $categories = [
            ['name' => 'Technology', 'slug' => 'technology', 'parent_id' => 0, 'description' => 'Kategori teknologi'],
            ['name' => 'Business', 'slug' => 'business', 'parent_id' => 0, 'description' => 'Kategori bisnis'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'parent_id' => 0, 'description' => 'Kategori lifestyle'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // -----------------------------
        // 2. Buat Tags
        // -----------------------------
        $tags = [
            ['name' => 'PHP', 'slug' => 'php', 'description' => 'Kategori PHP'],
            ['name' => 'Laravel', 'slug' => 'laravel', 'description' => 'Kategori Laravel'],
            ['name' => 'React', 'slug' => 'react', 'description' => 'Kategori React'],
            ['name' => 'Vue', 'slug' => 'vue', 'description' => 'Kategori Vue'],
        ];

        foreach ($tags as $tag) {
            Tag::updateOrCreate(['slug' => $tag['slug']], $tag);
        }

        // -----------------------------
        // 3. Buat Posts
        // -----------------------------
        $posts = [
            [
                'title' => 'Belajar Laravel 10',
                'slug' => 'belajar-laravel-10',
                'description' => 'Konten tutorial Laravel 10...',
                'excerpt' => 'Konten tutorial Laravel 10...',
                'status' => 'PUBLISHED',
                'user_id' => 1,
            ],
            [
                'title' => 'React untuk Pemula',
                'slug' => 'react-untuk-pemula',
                'description' => 'Konten tutorial React...',
                'excerpt' => 'Konten tutorial React...',
                'status' => 'DRAFT',
                'user_id' => 1,
            ],
        ];

        foreach ($posts as $postData) {
            $post = Post::updateOrCreate(['slug' => $postData['slug']], $postData);

            // -----------------------------
            // 4. Attach Categories
            // -----------------------------
            if ($post->slug === 'belajar-laravel-10') {
                $post->categories()->sync([1, 2]); // Technology & Business
            } elseif ($post->slug === 'react-untuk-pemula') {
                $post->categories()->sync([1, 3]); // Technology & Lifestyle
            }

            // -----------------------------
            // 5. Attach Tags
            // -----------------------------
            if ($post->slug === 'belajar-laravel-10') {
                $post->tags()->sync([1, 2]); // PHP & Laravel
            } elseif ($post->slug === 'react-untuk-pemula') {
                $post->tags()->sync([3, 4]); // React & Vue
            }
        }
    }
}
