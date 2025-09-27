<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Page Index
Breadcrumbs::for(
    'cms.pages.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Page', route('cms.pages.index'))
);

// Page Create
Breadcrumbs::for(
    'cms.pages.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.pages.index')->push('Create', route('cms.pages.create'))
);

// Page Show
Breadcrumbs::for(
    'cms.pages.show',
    fn(BreadcrumbTrail $trail, $page) =>
    $trail->parent('cms.pages.index')->push($page->name, route('cms.pages.show', $page))
);

// Page Edit
Breadcrumbs::for(
    'cms.pages.edit',
    fn(BreadcrumbTrail $trail, $page) =>
    $trail->parent('cms.pages.show', $page)->push('Edit', route('cms.pages.edit', $page))
);

// Page Data
Breadcrumbs::for(
    'cms.pages.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.pages.index')->push('Page Data', route('cms.pages.data'))
);

// Post Index
Breadcrumbs::for(
    'cms.posts.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Post', route('cms.posts.index'))
);

// Post Create
Breadcrumbs::for(
    'cms.posts.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.posts.index')->push('Create', route('cms.posts.create'))
);

// Post Show
Breadcrumbs::for(
    'cms.posts.show',
    fn(BreadcrumbTrail $trail, $post) =>
    $trail->parent('cms.posts.index')->push($post->title, route('cms.posts.show', $post))
);

// Post Edit
Breadcrumbs::for(
    'cms.posts.edit',
    fn(BreadcrumbTrail $trail, $post) =>
    $trail->parent('cms.posts.show', $post)->push('Edit', route('cms.posts.edit', $post))
);

// Post Data
Breadcrumbs::for(
    'cms.posts.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.posts.index')->push('Post Data', route('cms.posts.data'))
);

// Tag Index
Breadcrumbs::for(
    'cms.tags.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Tag', route('cms.tags.index'))
);

// Tag Create
Breadcrumbs::for(
    'cms.tags.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.tags.index')->push('Create', route('cms.tags.create'))
);

// Tag Show
Breadcrumbs::for(
    'cms.tags.show',
    fn(BreadcrumbTrail $trail, $tag) =>
    $trail->parent('cms.tags.index')->push($tag->name, route('cms.tags.show', $tag))
);

// Tag Edit
Breadcrumbs::for(
    'cms.tags.edit',
    fn(BreadcrumbTrail $trail, $tag) =>
    $trail->parent('cms.tags.show', $tag)->push('Edit', route('cms.tags.edit', $tag))
);

// Tag Data
Breadcrumbs::for(
    'cms.tags.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.tags.index')->push('Tag Data', route('cms.tags.data'))
);

// Categories Index
Breadcrumbs::for(
    'cms.categories.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Categories', route('cms.categories.index'))
);

// Categories Create
Breadcrumbs::for(
    'cms.categories.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.categories.index')->push('Create', route('cms.categories.create'))
);

// Categories Show
Breadcrumbs::for(
    'cms.categories.show',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('cms.categories.index')->push($categories->name, route('cms.categories.show', $categories))
);

// Categories Edit
Breadcrumbs::for(
    'cms.categories.edit',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('cms.categories.show', $categories)->push('Edit', route('cms.categories.edit', $categories))
);

// Categories Data
Breadcrumbs::for(
    'cms.categories.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('cms.categories.index')->push('categories Data', route('cms.categories.data'))
);

// Users
Breadcrumbs::for(
    'core.users.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Users', route('core.users.index'))
);

Breadcrumbs::for(
    'core.users.update',
    fn($trail) =>
    $trail->parent('core.users.index')->push('Create', route('core.users.update'))
);

Breadcrumbs::for(
    'core.users.show',
    fn($trail, $user) =>
    $trail->parent('core.users.index')->push($user->name, route('core.users.show', $user))
);

Breadcrumbs::for(
    'core.users.edit',
    fn($trail, $user) =>
    $trail->parent('core.users.show', $user)->push('Edit', route('core.users.edit', $user))
);

Breadcrumbs::for(
    'core.users.data',
    fn($trail) =>
    $trail->parent('core.users.index')->push('Users Data', route('core.users.data'))
);

// Roles
Breadcrumbs::for(
    'core.roles.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Roles', route('core.roles.index'))
);

Breadcrumbs::for(
    'core.roles.create',
    fn($trail) =>
    $trail->parent('core.roles.index')->push('Create', route('core.roles.create'))
);

Breadcrumbs::for(
    'core.roles.show',
    fn($trail, $permission) =>
    $trail->parent('core.roles.index')->push($permission->name, route('core.roles.show', $permission))
);

Breadcrumbs::for(
    'core.roles.edit',
    fn($trail, $permission) =>
    $trail->parent('core.roles.show', $permission)->push('Edit', route('core.roles.edit', $permission))
);

Breadcrumbs::for(
    'core.roles.data',
    fn($trail) =>
    $trail->parent('core.roles.index')->push('Roles Data', route('core.roles.data'))
);

// Permissions
Breadcrumbs::for(
    'core.permissions.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Permissions', route('core.permissions.index'))
);

Breadcrumbs::for(
    'core.permissions.create',
    fn($trail) =>
    $trail->parent('core.permissions.index')->push('Create', route('core.permissions.create'))
);

Breadcrumbs::for(
    'core.permissions.show',
    fn($trail, $permission) =>
    $trail->parent('core.permissions.index')->push($permission->name, route('core.permissions.show', $permission))
);

Breadcrumbs::for(
    'core.permissions.edit',
    fn($trail, $permission) =>
    $trail->parent('core.permissions.show', $permission)->push('Edit', route('core.permissions.edit', $permission))
);

Breadcrumbs::for(
    'core.permissions.data',
    fn($trail) =>
    $trail->parent('core.permissions.index')->push('Permissions Data', route('core.permissions.data'))
);

// Dashboard (root)
Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Admin', route('dashboard'));
});
