<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use App\Models\Cms\Page;
use App\Traits\LogActivity;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\StorePageRequest;
use App\Http\Requests\Cms\UpdatePageRequest;
use App\Traits\UploadFiles;

class PageController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Page::class);

        $data = [];

        return Inertia::render('admin/cms/page/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Page::class);

        $data = [];

        return Inertia::render('admin/cms/page/create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        $this->authorize('create', Page::class);

        $data = [
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'status' => 'PUBLISHED',
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadFile(null, $request->file('image'), 'uploads/posts');
        }

        $page = Page::create($data);

        if ($page) {
            $this->logSuccess('create-page', "Created Page: {$page->name}", [
                'page_id' => $page->id,
                'new_data' => $page->toArray(),
            ]);
        } else {
            $this->logError('create-page', "Failed to create Page: {$page->name}", [
                'page_id' => $page->id,
                'new_data' => $page->toArray(),
            ]);
        }

        return redirect()->route('cms.pages.index')->with('success', 'Page created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        $this->authorize('view', $page);

        $findData = Page::find($page->id);

        $data = [
            'page' => $findData,
        ];

        return Inertia::render('admin/cms/page/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        $this->authorize('update', $page);

        $findData = Page::find($page->id);

        $data = [
            'page' => $findData,
        ];

        return Inertia::render('admin/cms/page/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page)
    {
        $this->authorize('update', $page);

        $oldData = $page->replicate();

        if ($request->hasFile('image')) {
            $this->deleteFile($page->image);

            $page->update([
                'image' => $this->uploadFile($page->image, $request->file('image'), 'uploads/posts'),
            ]);
        }

        $page->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'status' => 'PUBLISHED',
        ]);

        if ($page) {
            $this->logSuccess('update-page', "Update Page: {$page->name}", [
                'page_id' => $page->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $page->toArray(),
            ]);
        } else {
            $this->logError('update-page', "Failed to update Page: {$page->name}", [
                'page_id' => $page->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $page->toArray(),
            ]);
        }

        return redirect()->route('cms.pages.index')->with('success', 'Page updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);

        if ($page->image) {
            $this->deleteFile($page->image);
        }

        $page->delete();

        return redirect()->route('cms.pages.index')->with('success', 'Page deleted successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-page', Page::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');

        $query = Page::query()
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
