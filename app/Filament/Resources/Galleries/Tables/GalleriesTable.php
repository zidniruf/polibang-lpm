<?php

namespace App\Filament\Resources\Galleries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class GalleriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                ImageColumn::make('image')
                    ->label('Foto')
                    ->disk('public')
                    ->square(),

                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),

                TextColumn::make('category.name')
                    ->label('Kategori'),

                TextColumn::make('sort_order')
                    ->label('Urutan'),

                IconColumn::make('is_published')
                    ->label('Publish')
                    ->boolean(),

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
