<?php

namespace App\Filament\Resources\WebsiteSettings\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class WebsiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('site_name')
                    ->searchable(),

                TextColumn::make('email'),

                TextColumn::make('phone'),

                TextColumn::make('created_at')
                    ->dateTime(),

            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])

            ->toolbarActions([]);

    }
}
