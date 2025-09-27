import { ChartArea, ChevronRight, CpuIcon, DatabaseIcon, Newspaper, ShoppingCartIcon } from 'lucide-react';

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
                        href: route('core.permissions.index'),
                        permission: 'view-permission',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Roles',
                        href: route('core.roles.index'),
                        permission: 'view-role',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Users',
                        href: route('core.users.index'),
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
                        href: route('cms.categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Posts',
                        href: route('cms.posts.index'),
                        permission: 'view-post',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Tags',
                        href: route('cms.tags.index'),
                        permission: 'view-tag',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Pages',
                        href: route('cms.pages.index'),
                        permission: 'view-page',
                        icon: ChevronRight,
                    },
                ],
            },
            {
                title: 'Master Data',
                roles: ['Administrators'],
                icon: DatabaseIcon,
                children: [
                    {
                        title: 'Sliders',
                        href: route('cms.sliders.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Faqs',
                        href: route('cms.categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                ],
            },
            {
                title: 'Analytics',
                roles: ['Administrators'],
                icon: ChartArea,
                children: [
                    {
                        title: 'Reports Analytics',
                        href: route('cms.analytics.index'),
                        permission: 'view-analytic',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
    {
        title: 'Fundraising',
        roles: ['Administrators'],
        children: [
            {
                title: 'Master Data',
                roles: ['Administrators'],
                icon: DatabaseIcon,
                children: [
                    {
                        title: 'Categories',
                        href: route('cms.categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Campaigns',
                        href: route('cms.posts.index'),
                        permission: 'view-post',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Faqs',
                        href: route('cms.tags.index'),
                        permission: 'view-tag',
                        icon: ChevronRight,
                    },
                    {
                        title: 'Bank Accounts',
                        href: route('cms.pages.index'),
                        permission: 'view-page',
                        icon: ChevronRight,
                    },
                ],
            },
            {
                title: 'Transactions',
                roles: ['Administrators'],
                icon: ShoppingCartIcon,
                children: [
                    {
                        title: 'Donations',
                        href: route('cms.categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                ],
            },
            {
                title: 'Analytics',
                roles: ['Administrators'],
                icon: ChartArea,
                children: [
                    {
                        href: route('cms.categories.index'),
                        permission: 'view-category',
                        icon: ChevronRight,
                    },
                ],
            },
        ],
    },
];
