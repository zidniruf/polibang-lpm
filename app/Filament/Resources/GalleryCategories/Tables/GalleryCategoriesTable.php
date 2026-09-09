<?php

namespace App\Filament\Resources\GalleryCategories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class GalleryCategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
->columns([

    TextColumn::make('name')
        ->label('Kategori'),

    TextColumn::make('created_at')
        ->label('Dibuat')
        ->dateTime('d M Y'),

])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
