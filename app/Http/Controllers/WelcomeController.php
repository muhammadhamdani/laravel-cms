<?php

namespace App\Http\Controllers;

use App\Models\Cms\Category;
use Inertia\Inertia;
use App\Models\Cms\Post;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function blog()
    {
        $data = [];

        return Inertia::render('home/blog/index', $data);
    }

    public function blogDetail(Post $post)
    {
        // Load relasi categories, tags, user
        $post->load(['categories', 'tags', 'user']);

        $categories = Category::all();

        return Inertia::render('home/blog/detail', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    public function blogData(Request $request)
    {
        $perPage = $request->input('perPage', 6); // default 6 per page
        $page = $request->input('page', 1);
        $search = $request->input('search', '');
        $categoryId = $request->input('category', null);

        $query = Post::query()
            ->with(['categories', 'tags', 'user'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            })
            ->when($categoryId, function ($query, $categoryId) {
                $query->whereHas('categories', function ($q) use ($categoryId) {
                    $q->where('id', $categoryId);
                });
            })
            ->orderBy('created_at', 'desc');

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        // Ambil semua kategori untuk sidebar
        $categories = Category::all();

        return response()->json([
            'posts' => $data->items(),
            'categories' => $categories,
            'totalPages' => $data->lastPage(),
        ]);
    }
}
