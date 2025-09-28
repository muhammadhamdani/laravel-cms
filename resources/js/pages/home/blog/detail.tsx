import { HomeLayout } from '@/layouts/home-layout';
import { Head, usePage } from '@inertiajs/react';

export default function DetailBlogPage() {
    const { post, categories }: any = usePage().props;

    return (
        <HomeLayout>
            <Head title={post.title || 'Blog Detail'} />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Post Image */}
                {post.image && <img src={`/storage/${post.image}`} alt={post.title} className="mb-6 w-full rounded-lg object-cover shadow-lg" />}

                {/* Post Title */}
                <h1 className="mb-2 text-4xl font-bold text-gray-900">{post.title}</h1>

                {/* Post Meta */}
                <div className="mb-4 flex flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        {new Date(post.created_at).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2 sm:mt-0">
                        {post.categories.map((cat: any) => (
                            <span key={cat.id} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Post Content */}
                <div className="prose max-w-none text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: post.description }} />
                </div>
            </div>
        </HomeLayout>
    );
}

type Category = { id: number; name: string; slug: string };

type Post = {
    id: number;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    image?: string;
    categories: Category[];
};
