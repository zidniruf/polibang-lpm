<?php

namespace App\Filament\Widgets;

use App\Models\News;
use App\Models\Gallery;
use App\Models\Document;
use App\Models\Announcement;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStats extends StatsOverviewWidget
{
protected int|string|array $columnSpan = 'full';

protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [

            Stat::make('Berita', News::count())
                ->description('Total berita')
                ->descriptionIcon(Heroicon::OutlinedNewspaper)
                ->color('success'),

            Stat::make('Galeri', Gallery::count())
                ->description('Total galeri')
                ->descriptionIcon(Heroicon::OutlinedPhoto)
                ->color('info'),

            Stat::make('Dokumen', Document::count())
                ->description('Total dokumen')
                ->descriptionIcon(Heroicon::OutlinedDocumentText)
                ->color('warning'),

            Stat::make('Pengumuman', Announcement::count())
                ->description('Total pengumuman')
                ->descriptionIcon(Heroicon::OutlinedMegaphone)
                ->color('danger'),

        ];
    }
}