<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Dashboard (root)
Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Admin', route('dashboard'));
});

// Users
Breadcrumbs::for(
    'users.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Users', route('users.index'))
);

Breadcrumbs::for(
    'users.create',
    fn($trail) =>
    $trail->parent('users.index')->push('Create', route('users.create'))
);

Breadcrumbs::for(
    'users.show',
    fn($trail, $user) =>
    $trail->parent('users.index')->push($user->name, route('users.show', $user))
);

Breadcrumbs::for(
    'users.edit',
    fn($trail, $user) =>
    $trail->parent('users.show', $user)->push('Edit', route('users.edit', $user))
);

Breadcrumbs::for(
    'users.data',
    fn($trail) =>
    $trail->parent('users.index')->push('Users Data', route('users.data'))
);

// Permissions
Breadcrumbs::for(
    'permissions.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Permissions', route('permissions.index'))
);

Breadcrumbs::for(
    'permissions.create',
    fn($trail) =>
    $trail->parent('permissions.index')->push('Create', route('permissions.create'))
);

Breadcrumbs::for(
    'permissions.show',
    fn($trail, $permission) =>
    $trail->parent('permissions.index')->push($permission->name, route('permissions.show', $permission))
);

Breadcrumbs::for(
    'permissions.edit',
    fn($trail, $permission) =>
    $trail->parent('permissions.show', $permission)->push('Edit', route('permissions.edit', $permission))
);

Breadcrumbs::for(
    'permissions.data',
    fn($trail) =>
    $trail->parent('permissions.index')->push('Permissions Data', route('permissions.data'))
);

// Roles
Breadcrumbs::for(
    'roles.index',
    fn($trail) =>
    $trail->parent('dashboard')->push('Roles', route('roles.index'))
);

Breadcrumbs::for(
    'roles.create',
    fn($trail) =>
    $trail->parent('roles.index')->push('Create', route('roles.create'))
);

Breadcrumbs::for(
    'roles.show',
    fn($trail, $permission) =>
    $trail->parent('roles.index')->push($permission->name, route('roles.show', $permission))
);

Breadcrumbs::for(
    'roles.edit',
    fn($trail, $permission) =>
    $trail->parent('roles.show', $permission)->push('Edit', route('roles.edit', $permission))
);

Breadcrumbs::for(
    'roles.data',
    fn($trail) =>
    $trail->parent('roles.index')->push('Roles Data', route('roles.data'))
);

Breadcrumbs::for(
    'roles.access',
    fn($trail) =>
    $trail->parent('roles.index')->push('Roles Access', route('roles.access'))
);

// Categories Index
Breadcrumbs::for(
    'categories.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Categories', route('categories.index'))
);

// Categories Create
Breadcrumbs::for(
    'categories.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('categories.index')->push('Create', route('categories.create'))
);

// Categories Show
Breadcrumbs::for(
    'categories.show',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('categories.index')->push($categories->name, route('categories.show', $categories))
);

// Categories Edit
Breadcrumbs::for(
    'categories.edit',
    fn(BreadcrumbTrail $trail, $categories) =>
    $trail->parent('categories.show', $categories)->push('Edit', route('categories.edit', $categories))
);

// Categories Data
Breadcrumbs::for(
    'categories.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('categories.index')->push('categories Data', route('categories.data'))
);

// Tag Index
Breadcrumbs::for(
    'tags.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Tag', route('tags.index'))
);

// Tag Create
Breadcrumbs::for(
    'tags.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('tags.index')->push('Create', route('tags.create'))
);

// Tag Show
Breadcrumbs::for(
    'tags.show',
    fn(BreadcrumbTrail $trail, $tag) =>
    $trail->parent('tags.index')->push($tag->name, route('tags.show', $tag))
);

// Tag Edit
Breadcrumbs::for(
    'tags.edit',
    fn(BreadcrumbTrail $trail, $tag) =>
    $trail->parent('tags.show', $tag)->push('Edit', route('tags.edit', $tag))
);

// Tag Data
Breadcrumbs::for(
    'tags.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('tags.index')->push('Tag Data', route('tags.data'))
);

// Post Index
Breadcrumbs::for(
    'posts.index',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('dashboard')->push('Post', route('posts.index'))
);

// Post Create
Breadcrumbs::for(
    'posts.create',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('posts.index')->push('Create', route('posts.create'))
);

// Post Show
Breadcrumbs::for(
    'posts.show',
    fn(BreadcrumbTrail $trail, $post) =>
    $trail->parent('posts.index')->push($post->title, route('posts.show', $post))
);

// Post Edit
Breadcrumbs::for(
    'posts.edit',
    fn(BreadcrumbTrail $trail, $post) =>
    $trail->parent('posts.show', $post)->push('Edit', route('posts.edit', $post))
);

// Post Data
Breadcrumbs::for(
    'posts.data',
    fn(BreadcrumbTrail $trail) =>
    $trail->parent('posts.index')->push('Post Data', route('posts.data'))
);
