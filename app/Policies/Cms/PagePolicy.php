<?php

namespace App\Policies\Cms;

use App\Models\Cms\Page;
use App\Models\Core\User;
use Illuminate\Auth\Access\Response;

class PagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-page');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('view-page');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-page');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('update-page');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('delete-page');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('restore-page');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('force-delete-page');
    }

    /**
     * Determine whether the user can permanently getData the model.
     */
    public function getData(User $user, Page $page): bool
    {
        return $user->hasPermissionTo('data-page');
    }
}
