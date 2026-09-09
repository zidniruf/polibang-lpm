<?php

namespace App\Filament\Resources\NavigationLinks\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NavigationLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->label('Nama Menu')
                    ->required(),

                TextInput::make('url')
                    ->label('Link Tujuan')
                    ->required()
                    ->helperText(
                        'Contoh: /dokumen atau https://google.com'
                    ),

                TextInput::make('sort_order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0),

                Toggle::make('is_active')
                    ->label('Aktif')
                    ->default(true),

            ]);
    }
}