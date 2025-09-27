import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'recharts';

export default function ListPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [visitors, setVisitors] = useState<VisitorItem[]>([]);
    const [popularPages, setPopularPages] = useState<PopularPage[]>([]);
    const [days, setDays] = useState<number>(30);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (periodDays = 30) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(route('cms.analytics.data'), { params: { days: periodDays } });
            if (res.data.ok) {
                setVisitors(res.data.visitors);
                setPopularPages(res.data.popularPages);
            } else {
                setError('Gagal mengambil data analytics');
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || 'Request error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(days);
    }, [days]);

    // Prepare data for chart
    const chartData = {
        labels: visitors.map((v) => v.date),
        datasets: [
            {
                label: 'Visitors',
                data: visitors.map((v) => v.visitors),
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Page Views',
                data: visitors.map((v) => v.pageViews),
                fill: true,
                tension: 0.3,
            },
        ],
    };

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center gap-3">
                            <Select value={days.toString()} onValueChange={(val) => setDays(Number(val))}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Pilih periode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">7 hari</SelectItem>
                                    <SelectItem value="14">14 hari</SelectItem>
                                    <SelectItem value="30">30 hari</SelectItem>
                                    <SelectItem value="90">90 hari</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => fetchData(days)}>Refresh</Button>
                        </div>

                        {loading ? <p>Loading...</p> : error ? <p className="text-red-500">Error: {error}</p> : <Line data={chartData} />}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Path</TableHead>
                                        <TableHead className="text-right">Views</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popularPages.map((p, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="max-w-[200px] truncate">{p.path}</TableCell>
                                            <TableCell className="text-right">{p.pageViews}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Data points: {visitors.length}</p>
                            <p className="text-sm text-gray-600">Total Visitors: {visitors.reduce((sum, v) => sum + v.visitors, 0)}</p>
                            <p className="text-sm text-gray-600">Total Page Views: {visitors.reduce((sum, v) => sum + v.pageViews, 0)}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

type VisitorItem = {
    date: string;
    visitors: number;
    pageViews: number;
};

type PopularPage = {
    path: string;
    pageViews: number;
};
