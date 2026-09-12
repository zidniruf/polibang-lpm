<?php

namespace App\Filament\Resources\Documents\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('title')
                    ->searchable(),

                TextColumn::make('category.name')
                    ->label('Kategori')
                    ->badge()
                    ->searchable(),

                TextColumn::make('year'),

                IconColumn::make('is_published')
                    ->boolean(),

                TextColumn::make('created_at')
                    ->dateTime('d M Y'),

            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}
