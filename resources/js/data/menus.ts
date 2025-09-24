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
                title: 'Posts',
                roles: ['Administrators'],
                icon: Newspaper,
                children: [
                    {
                        title: 'Category',
                        href: route('categories.index'),
                        permission: 'view-permission',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Posting',
                        href: route('posts.index'),
                        permission: 'view-role',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Tags',
                        href: route('tags.index'),
                        permission: 'view-user',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
];
