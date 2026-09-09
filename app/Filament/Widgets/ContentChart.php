<?php

namespace App\Filament\Widgets;

use App\Models\Announcement;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\News;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class ContentChart extends ApexChartWidget
{

protected static ?int $sort = 2;

protected int|string|array $columnSpan = [
    'md' => 3,
    'xl' => 3,
];

    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'contentChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Statistik Konten Website';



    /**
     * Chart options (series, labels, types, size, animations...)
     * https://apexcharts.com/docs/options
     *
     * @return array
     */
protected function getOptions(): array
{
    return [

        'chart' => [
            'type' => 'bar',
            'height' => 260,
        ],

        'series' => [
            [
                'name' => 'Jumlah Data',
                'data' => [
                    News::count(),
                    Gallery::count(),
                    Document::count(),
                    Announcement::count(),
                ],
            ],
        ],

        'xaxis' => [
            'categories' => [
                'Berita',
                'Galeri',
                'Dokumen',
                'Pengumuman',
            ],
        ],

        'colors' => [
            '#2563eb',
        ],

    ];
}

}
