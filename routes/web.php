<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Opcodes\LogViewer\Facades\LogViewer;
use App\Http\Controllers\Admin\Cms\TagController;
use App\Http\Controllers\Admin\Cms\PageController;
use App\Http\Controllers\Admin\Cms\PostController;
use App\Http\Controllers\Admin\Core\RoleController;
use App\Http\Controllers\Admin\Core\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Cms\SliderController;
use App\Http\Controllers\Admin\Cms\AnalyticController;
use App\Http\Controllers\Admin\Cms\CategoryController;
use App\Http\Controllers\Admin\Core\PermissionController;
use App\Http\Controllers\WelcomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'dashboard')->name('home');

Route::get('blog/data', [WelcomeController::class, 'blogData'])->name('blog.data');
Route::get('blog/{post:slug}', [WelcomeController::class, 'blogDetail'])->name('blog.details');
Route::get('blog', [WelcomeController::class, 'blog'])->name('blog');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('core')->as('core.')->group(function () {
        Route::get('permissions/data', [PermissionController::class, 'getData'])->name('permissions.data');
        Route::resource('permissions', PermissionController::class);

        Route::get('roles/access', [RoleController::class, 'manageAccessRole'])->name('roles.access');
        Route::post('roles/access', [RoleController::class, 'assignAccessRole'])->name('roles.access.assign');
        Route::get('roles/data', [RoleController::class, 'getData'])->name('roles.data');
        Route::resource('roles', RoleController::class);

        Route::post('users/verify', [UserController::class, 'verify'])->name('users.verify');
        Route::get('users/data', [UserController::class, 'getData'])->name('users.data');
        Route::resource('users', UserController::class);
    });

    Route::prefix('cms')->as('cms.')->group(function () {
        Route::get('categories/data', [CategoryController::class, 'getData'])->name('categories.data');
        Route::resource('categories', CategoryController::class);

        Route::get('posts/data', [PostController::class, 'getData'])->name('posts.data');
        Route::resource('posts', PostController::class);

        Route::get('tags/data', [TagController::class, 'getData'])->name('tags.data');
        Route::resource('tags', TagController::class);

        Route::get('pages/data', [PageController::class, 'getData'])->name('pages.data');
        Route::resource('pages', PageController::class);

        Route::get('sliders/data', [SliderController::class, 'getData'])->name('sliders.data');
        Route::resource('sliders', SliderController::class);

        Route::get('analytics/data', [AnalyticController::class, 'getData'])->name('analytics.data');
        Route::get('analytics', [AnalyticController::class, 'index'])->name('analytics.index');
    });

    Route::prefix('fundraising')->as('fundraising.')->group(function () {
        Route::get('categories/data', [PageController::class, 'getData'])->name('categories.data');
        Route::resource('categories', PageController::class);
    });
});

Route::middleware(['auth', 'role:Admin'])->group(function () {
    Route::view('/log-viewer/{any?}', 'log-viewer::index')
        ->where('any', '.*')
        ->name('log-viewer');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
