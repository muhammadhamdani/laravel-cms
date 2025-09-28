<?php

namespace App\Http\Controllers\Admin\Cms;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Analytics\Period;
use App\Http\Controllers\Controller;
use Spatie\Analytics\Facades\Analytics;

class AnalyticController extends Controller
{
    public function index()
    {
        $data = [];

        return Inertia::render('admin/cms/analytic/index', $data);
    }

    /**
     * Return JSON data untuk chart (fetch via axios)
     */
    public function getData(Request $request)
    {
        // periode: last 30 days (bisa override via query param ?days=7)
        $days = (int) $request->query('days', 30);
        $period = Period::days($days);

        // ambil visitors & pageviews per hari (fetchTotalVisitorsAndPageViews)
        $visitorsRaw = Analytics::fetchTotalVisitorsAndPageViews($period);
        // visitorsRaw is a Collection of ['date' => 'YYYY-mm-dd', 'visitors' => int, 'pageViews' => int]

        // ambil top pages (top 10)
        $popularPagesRaw = Analytics::fetchMostVisitedPages($period, 10);

        // Transform data agar aman dikonsumsi di frontend
        $visitors = $visitorsRaw->map(function ($item) {
            return [
                'date' => $item['date'],
                'visitors' => (int) $item['visitors'],
                'pageViews' => (int) $item['pageViews'],
            ];
        })->values();

        $popularPages = collect($popularPagesRaw)->map(function ($row) {
            // spatie returns array like [pagePath, pageViews, ...]
            return [
                'path' => $row['url'] ?? ($row[0] ?? '/'),
                'pageViews' => isset($row['pageViews']) ? (int) $row['pageViews'] : (int) ($row[1] ?? 0),
            ];
        })->values();

        return response()->json([
            'ok' => true,
            'period' => $days,
            'visitors' => $visitors,
            'popularPages' => $popularPages,
        ]);
    }
}
