import { ChevronRight, CpuIcon, Newspaper } from 'lucide-react';

export const NavigationList = [
    {
        title: 'Platform',
        roles: ['Administrators'],
        children: [
            {
                title: 'System Core',
                roles: ['Administrators'],
                icon: CpuIcon,
                children: [
                    {
                        title: 'Permissions',
                        href: route('permissions.index'),
                        permission: 'view-permission',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Roles',
                        href: route('roles.index'),
                        permission: 'view-role',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Users',
                        href: route('users.index'),
                        permission: 'view-user',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
    {
        title: 'CMS',
        roles: ['Administrators'],
        children: [
            {
                title: 'Postingan',
                roles: ['Administrators'],
                icon: Newspaper,
                children: [
                    {
                        title: 'Categories',
                        href: route('categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Posts',
                        href: route('posts.index'),
                        permission: 'view-post',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Tags',
                        href: route('tags.index'),
                        permission: 'view-tag',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Pages',
                        href: route('pages.index'),
                        permission: 'view-page',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
];
