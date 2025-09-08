<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use App\Traits\LogActivity;
use Illuminate\Support\Str;
use App\Models\Cms\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Cache\Store;
use App\Http\Requests\Crm\StoreCategoryRequest;
use App\Http\Requests\Crm\UpdateCategoryRequest;

class CategoryController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Category::class);

        $data = [];

        return Inertia::render('admin/cms/category/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Category::class);

        $categories = Category::get();

        $data = [
            'categories' => $categories,
        ];

        return Inertia::render('admin/cms/category/create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('create', Category::class);

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'parent_id' => $request->parent_id,
            'description' => $request->description,
        ]);

        if ($category) {
            $this->logSuccess('create-category', "Created Category: {$category->name}", [
                'category_id' => $category->id,
                'new_data' => $category->toArray(),
            ]);
        } else {
            $this->logError('create-category', "Failed to create category: {$category->name}", [
                'category_id' => $category->id,
                'new_data' => $category->toArray(),
            ]);
        }

        if ($request->saveBack) {
            return redirect()->route('categories.index')->with('success', 'Category created successfully');
        }

        return redirect()->back()->with('success', 'Category created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->authorize('view', $category);

        $findData = Category::find($category->id);

        $data = [
            'category' => $findData,
        ];

        return Inertia::render('admin/cms/category/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $this->authorize('update', $category);

        $findData = Category::find($category->id);

        $categories = Category::get();

        $data = [
            'categories' => $categories,
            'category' => $findData,
        ];

        return Inertia::render('admin/cms/category/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $oldData = $category->replicate();

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'parent_id' => $request->parent_id,
            'description' => $request->description,
        ]);

        if ($category) {
            $this->logSuccess('update-category', "Update Category: {$category->name}", [
                'category_id' => $category->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $category->toArray(),
            ]);
        } else {
            $this->logError('update-category', "Failed to update category: {$category->name}", [
                'category_id' => $category->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $category->toArray(),
            ]);
        }

        if ($request->saveBack) {
            return redirect()->route('categories.index')->with('success', 'Category updated successfully');
        }

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-category', Category::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');

        $query = Category::query()
            ->with(['parent', 'children', 'posts'])
            ->latest()
            ->when($globalSearch, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
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
