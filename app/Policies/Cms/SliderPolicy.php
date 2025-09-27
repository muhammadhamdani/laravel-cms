<?php

namespace App\Policies\Cms;

use App\Models\Cms\Slider;
use App\Models\Core\User;
use Illuminate\Auth\Access\Response;

class SliderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-slider');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('view-slider');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-slider');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('update-slider');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('delete-slider');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('restore-slider');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('force-delete-slider');
    }

    /**
     * Determine whether the user can permanently getData the model.
     */
    public function getData(User $user, Slider $Slider): bool
    {
        return $user->hasPermissionTo('data-slider');
    }
}
