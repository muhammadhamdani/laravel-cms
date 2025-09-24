import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { InfoIcon } from 'lucide-react';
import moment from 'moment-timezone';

export default function DetailPage() {
    const { post } = usePage<any>().props;

    return (
        <AppLayout>
            <Head title="Post Detail" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="min-h-full p-4 md:p-6">
                    <div className="flex items-center space-x-2">
                        <InfoIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">Detail Information</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Title</span>
                            <span className="text-sm">{post.title}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Slug</span>
                            <span className="text-sm">{post.slug}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Categories</span>
                            <span className="text-sm">{post.categories.map((c: any) => c.name).join(', ')}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Tags</span>
                            <span className="text-sm">{post.tags.map((t: any) => t.name).join(', ')}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Created At</span>
                            <span className="text-sm">{moment(post.created_at).tz('Asia/Jakarta').format('DD MMMM YYYY')}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Updated At</span>
                            <span className="text-sm">{moment(post.updated_at).tz('Asia/Jakarta').format('DD MMMM YYYY')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Description</span>
                            <span>{parse(post.content)}</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </AppLayout>
    );
}
