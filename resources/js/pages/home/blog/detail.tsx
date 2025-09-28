import { HomeLayout } from '@/layouts/home-layout';
import { Head, usePage } from '@inertiajs/react';

export default function DetailBlogPage() {
    const { post }: any = usePage().props;

    return (
        <HomeLayout>
            <Head title={post.title || 'Blog Detail'} />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
                {/* Post Image */}
                {post.image && <img src={`/storage/${post.image}`} alt={post.title} className="w-full rounded-lg object-cover shadow-lg" />}

                {/* Post Title */}
                <h1 className="text-4xl leading-tight font-bold text-gray-900">{post.title}</h1>

                {/* Post Meta */}
                <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {post.categories.map((cat: any) => (
                            <span key={cat.id} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Post Content */}
                <div
                    dangerouslySetInnerHTML={{ __html: post.description }}
                    className="prose max-w-none text-base leading-relaxed text-gray-700 md:text-lg [&>p]:mb-4 [&>p]:text-base [&>p]:leading-relaxed [&>p]:md:text-lg"
                />
            </div>
        </HomeLayout>
    );
}

type Post = {
    id: number;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    image?: string;
    categories: Category[];
};
