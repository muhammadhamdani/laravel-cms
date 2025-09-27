<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use App\Models\Cms\Slider;
use App\Traits\LogActivity;
use App\Traits\UploadFiles;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Cms\StoreSliderRequest;
use App\Http\Requests\Cms\UpdateSliderRequest;

class SliderController extends Controller
{
    use LogActivity, UploadFiles;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Slider::class);

        $data = [];

        return Inertia::render('admin/cms/slider/list', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Slider::class);

        $data = [];

        return Inertia::render('admin/cms/slider/create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSliderRequest $request)
    {
        $this->authorize('create', Slider::class);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadFile(null, $request->file('image'), 'uploads/sliders');
        }

        $slider = Slider::create($data);

        if ($slider) {
            $this->logSuccess('create-slider', "Created Slider: {$slider->name}", [
                'slider_id' => $slider->id,
                'new_data' => $slider->toArray(),
            ]);
        } else {
            $this->logError('create-slider', "Failed to create Slider: {$slider->name}", [
                'slider_id' => $slider->id,
                'new_data' => $slider->toArray(),
            ]);
        }

        return redirect()->route('cms.sliders.index')->with('success', 'Slider created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Slider $slider)
    {
        $this->authorize('view', $slider);

        $findData = Slider::find($slider->id);

        $data = [
            'slider' => $findData,
        ];

        return Inertia::render('admin/cms/slider/show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Slider $slider)
    {
        $this->authorize('update', $slider);

        $findData = Slider::find($slider->id);

        $data = [
            'slider' => $findData,
        ];

        return Inertia::render('admin/cms/slider/edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSliderRequest $request, Slider $slider)
    {
        $this->authorize('update', $slider);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
        ];

        if ($request->hasFile('image')) {
            $this->deleteFile($slider->image);
            $data['image'] = $this->uploadFile(null, $request->file('image'), 'uploads/posts');
        }

        $oldData = $slider->replicate();
        $slider->update($data);

        if ($slider) {
            $this->logSuccess('update-slider', "Update Slider: {$slider->name}", [
                'slider_id' => $slider->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $slider->toArray(),
            ]);
        } else {
            $this->logError('update-slider', "Failed to update Slider: {$slider->name}", [
                'slider_id' => $slider->id,
                'old_data' => $oldData->toArray(),
                'new_data' => $slider->toArray(),
            ]);
        }

        return redirect()->route('cms.sliders.index')->with('success', 'Slider updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        $this->authorize('delete', $slider);

        $this->deleteFile($slider->image);

        $slider->delete();

        return redirect()->route('cms.sliders.index')->with('success', 'slider deleted successfully');
    }

    public function getData(Request $request)
    {
        $this->authorize('data-slider', Slider::class);

        $perPage = $request->input('perPage', null);
        $page = $request->input('page', null);
        $globalSearch = $request->input('globalSearch', '');
        $orderDirection = $request->input('orderDirection', 'desc');
        $orderBy = $request->input('orderBy', 'id');

        $query = Slider::query()
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
