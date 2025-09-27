<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use App\Models\Cms\Tag;
use App\Models\Cms\Post;
use App\Traits\LogActivity;
use Illuminate\Support\Str;
use App\Models\Cms\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Cms\StorePostRequest;
use App\Http\Requests\Cms\UpdatePostRequest;
use App\Traits\UploadFiles;

class PostController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Post::class);

        $data = [];

        return Inertia::render('admin/cms/post/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Post::class);

        $data = [
            'categories' => Category::get()
        ];

        return Inertia::render('admin/cms/post/create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $this->authorize('create', Post::class);

        $data = [
            'title' => Str::title($request->title),
            'slug' => Str::slug($request->title),
            'excerpt' => $request->description,
            'description' => $request->description,
            'status' => 'PUBLISHED',
            'user_id' => Auth::user()->id
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadFile(null, $request->file('image'), 'uploads/posts');
        }

        $post = Post::create($data);

        $post->categories()->sync($request->category_id ?? []);

        $tagIds = collect($request->tag_name)->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name])->id;
        })->toArray();

        $post->tags()->sync($tagIds);

        if ($post) {
            $this->logSuccess('create-post', "Created Post: {$post->title}", [
                'post_id' => $post->id,
                'new_data' => $post->toArray(),
            ]);
        } else {
            $this->logError('create-post', "Failed to create post: {$post->title}", [
                'post_id' => $post->id,
                'new_data' => $post->toArray(),
            ]);
        }

        return redirect()->route('cms.posts.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $this->authorize('view', $post);

        $findData = Post::with(['categories', 'tags'])->find($post->id);

        $data = [
            'post' => $findData,
        ];

        return Inertia::render('admin/cms/post/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        $findData = Post::with(['categories', 'tags'])->find($post->id);

        $data = [
            'categories' => Category::get(),
            'post' => $findData,
        ];

        return Inertia::render('admin/cms/post/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $oldData = $post->replicate();

        $data = [
            'title' => Str::title($request->title),
            'slug' => Str::slug($request->title),
            'excerpt' => $request->description,
            'description' => $request->description,
            'status' => 'PUBLISHED',
            'user_id' => Auth::user()->id
        ];

        if ($request->hasFile('image')) {
            $this->deleteFile($post->image);

            $data['image'] = $this->uploadFile($post->image, $request->file('image'), 'uploads/posts');
        }

        $post->update($data);

        $post->categories()->sync($request->category_id ?? []);

        $tagIds = collect($request->tag_name)->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name])->id;
        })->toArray();

        $post->tags()->sync($tagIds);

        if ($post) {
            $this->logSuccess('update-post', "Update Post: {$post->title}", [
                'post_id' => $post->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $post->toArray(),
            ]);
        } else {
            $this->logError('update-post', "Failed to update post: {$post->title}", [
                'post_id' => $post->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $post->toArray(),
            ]);
        }

        return redirect()->route('cms.posts.index')->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        if ($post->image) {
            $this->deleteFile($post->image);
        }

        $post->delete();

        return redirect()->route('cms.posts.index')->with('success', 'Post deleted successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-category', Post::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');

        $query = Post::query()
            ->with(['categories', 'tags', 'user'])
            ->latest()
            ->when($globalSearch, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->orderBy($orderBy, $orderDirection);

        if ($perPage) {
            $data = $query->paginate($perPage, ['*'], 'page', $page);
        } else {
            $data = $query->get();
        }

        return response()->json($data);
    }
}
