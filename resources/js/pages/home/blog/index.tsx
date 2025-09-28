import InputTextComponent from '@/components/partials/input-components';
import { HomeLayout } from '@/layouts/home-layout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import parse from 'html-react-parser';
import { useCallback, useEffect, useState } from 'react';

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
    image?: string;
    categories: { id: number; name: string };
};

type Category = {
    id: number;
    name: string;
};

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = { page: currentPage };
            if (selectedCategory) params.category = selectedCategory;
            if (searchTerm) params.search = searchTerm;

            const { data } = await axios.get(route('blog.data'), { params });
            setPosts(data.posts);
            setCategories(data.categories);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [currentPage, selectedCategory, searchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <HomeLayout>
            <Head title="Blog" />
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
                {/* Main content */}
                <div className="space-y-6 md:col-span-3">
                    {loading ? (
                        <div className="py-20 text-center text-gray-500">Loading...</div>
                    ) : posts.length === 0 ? (
                        <p className="text-gray-500">Belum ada artikel.</p>
                    ) : (
                        posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                title={post.title}
                                slug={post.slug}
                                excerpt={post.excerpt}
                                created_at={post.created_at}
                                category={post.categories}
                                image={post.image ? `/storage/${post.image}` : undefined}
                            />
                        ))
                    )}

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center space-x-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`rounded-md px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Cari Artikel</h3>
                        <InputTextComponent
                            type="text"
                            value={search}
                            handleOnChange={(value: string) => setSearch(value)}
                            placeholder="Cari artikel..."
                        />
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="mb-4 text-lg font-semibold">Kategori</h3>
                        <ul className="space-y-2 text-gray-700">
                            {categories.map((cat) => (
                                <li key={cat.id} className="flex items-center space-x-2">
                                    <span className="text-gray-500">-</span>
                                    <button
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`hover:text-blue-600 ${selectedCategory === cat.id ? 'font-semibold text-blue-700' : ''}`}
                                    >
                                        <span className="text-sm">{cat.name}</span>
                                    </button>
                                </li>
                            ))}
                            <li className="flex items-center space-x-2">
                                <span className="text-gray-500">-</span>
                                <button onClick={() => setSelectedCategory(null)} className="hover:text-blue-600">
                                    <span className="text-sm">Semua</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </HomeLayout>
    );
}

export const BlogCard = ({ title, slug, excerpt, created_at, category, image }: BlogCardProps) => {
    return (
        <Link
            href={route('blog.details', { slug })}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:scale-[1.02] hover:shadow-xl md:flex-row"
        >
            {image && (
                <div className="h-48 flex-shrink-0 md:h-auto md:w-1/3">
                    <img src={image} alt={title} className="h-full w-full object-cover" />
                </div>
            )}
            <div className="flex flex-col justify-between p-6 md:w-2/3">
                <div>
                    <div className="mb-2 flex items-center space-x-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{category.name}</span>
                        <span className="text-xs text-gray-400">{new Date(created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-blue-600">{title}</h3>
                    <div className="line-clamp-3 text-sm text-gray-600">{parse(excerpt)}</div>
                </div>
                <span className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">Baca Selengkapnya →</span>
            </div>
        </Link>
    );
};

type BlogCardProps = {
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
    category: { id: number; name: string };
    image?: string; // optional thumbnail
};
