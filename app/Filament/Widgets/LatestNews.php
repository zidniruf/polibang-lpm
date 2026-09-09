<?php

namespace App\Filament\Widgets;

use App\Models\News;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class LatestNews extends TableWidget
{

protected static ?int $sort = 4;

protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Berita Terbaru';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                News::query()
                    ->latest('published_at')
            )

            ->columns([

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),

                TextColumn::make('published_at')
                    ->label('Tanggal')
                    ->dateTime('d M Y H:i'),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y'),

            ]);
    }
}