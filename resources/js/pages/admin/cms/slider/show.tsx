import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import moment from 'moment-timezone';

export default function DetailPage() {
    const { slider } = usePage<any>().props;

    return (
        <AppLayout>
            <Head title="Slider Detail" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="min-h-full p-4 md:p-6">
                    <div className="flex items-center space-x-2">
                        <InfoIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">Detail Information</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Name</span>
                            <span className="text-sm">{slider.name}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Link</span>
                            <span className="text-sm">{slider.link}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Created At</span>
                            <span className="text-sm">{moment(slider.created_at).tz('Asia/Jakarta').format('DD MMMM YYYY')}</span>
                        </li>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Updated At</span>
                            <span className="text-sm">{moment(slider.updated_at).tz('Asia/Jakarta').format('DD MMMM YYYY')}</span>
                        </li>
                    </ul>
                    <ul>
                        <li className="flex flex-col space-y-2">
                            <span className="text-sm font-semibold">Feature Image</span>
                            {slider.image ? (
                                <img src={`/storage/${slider.image}`} alt="Feature Image" className="h-24 w-40 rounded object-cover" />
                            ) : (
                                <span className="text-sm text-gray-500">No Image</span>
                            )}
                        </li>
                    </ul>
                </Card>
            </div>
        </AppLayout>
    );
}
