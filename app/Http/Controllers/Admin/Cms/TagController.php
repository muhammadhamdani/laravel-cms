<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use App\Models\Cms\Tag;
use App\Traits\LogActivity;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\StoreTagRequest;
use App\Http\Requests\Cms\UpdateTagRequest;

class TagController extends Controller
{
    use LogActivity;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Tag::class);

        $data = [];

        return Inertia::render('admin/cms/tag/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Tag::class);

        $data = [];

        return Inertia::render('admin/cms/tag/create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $this->authorize('create', Tag::class);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        if ($tag) {
            $this->logSuccess('create-tag', "Created Tag: {$tag->name}", [
                'tag_id' => $tag->id,
                'new_data' => $tag->toArray(),
            ]);
        } else {
            $this->logError('create-tag', "Failed to create tag: {$tag->name}", [
                'tag_id' => $tag->id,
                'new_data' => $tag->toArray(),
            ]);
        }

        return redirect()->route('cms.tags.index')->with('success', 'Tag created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        $this->authorize('view', $tag);

        $findData = Tag::find($tag->id);

        $data = [
            'tag' => $findData,
        ];

        return Inertia::render('admin/cms/tag/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        $this->authorize('update', $tag);

        $findData = Tag::find($tag->id);

        $data = [
            'tag' => $findData,
        ];

        return Inertia::render('admin/cms/tag/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $this->authorize('update', $tag);

        $oldData = $tag->replicate();

        $tag->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        if ($tag) {
            $this->logSuccess('update-tag', "Update Tag: {$tag->name}", [
                'tag_id' => $tag->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $tag->toArray(),
            ]);
        } else {
            $this->logError('update-tag', "Failed to update tag: {$tag->name}", [
                'tag_id' => $tag->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $tag->toArray(),
            ]);
        }

        return redirect()->route('cms.tags.index')->with('success', 'Tag updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $this->authorize('delete', $tag);

        $tag->delete();

        return redirect()->route('cms.tags.index')->with('success', 'Tag deleted successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-tag', Tag::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');

        $query = Tag::query()
            ->with(['posts'])
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
