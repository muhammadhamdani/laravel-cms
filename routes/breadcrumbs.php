<?php

use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('about', function (BreadcrumbTrail $trail) {
    $trail->push('About Us', route('about'));
});

Breadcrumbs::for('blog.data', function (BreadcrumbTrail $trail) {
    $trail->push('Blog Data', route('blog.data'));
});

Breadcrumbs::for(
    'blog.details',
    fn(BreadcrumbTrail $trail, $post) =>
    $trail->parent('blog')->push($post->slug, route('blog.details', $post))
);

Breadcrumbs::for('blog', function (BreadcrumbTrail $trail) {
    $trail->push('Blog', route('blog'));
});

Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Home', route('home'));
});

Breadcrumbs::for('log-viewer.index', function (BreadcrumbTrail $trail) {
    $trail->push('Log Viewer', route('log-viewer.index'));
});

require __DIR__ . '/breadcrumbs/auth-breadcrumbs.php';
require __DIR__ . '/breadcrumbs/admin-breadcrumbs.php';
