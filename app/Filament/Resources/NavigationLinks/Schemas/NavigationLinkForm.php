<?php

namespace App\Filament\Resources\NavigationLinks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use App\Models\NavigationLink;
use Filament\Schemas\Schema;

class NavigationLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Select::make('menu_group_id')
                    ->label('Navigasi Utama')
                    ->relationship('menuGroup', 'name')
                    ->required()
                    ->live(),

                Select::make('parent_id')
                    ->label('Sub Navigasi (Opsional)')
                    ->placeholder('Pilih jika ini adalah sub-sub navigasi')
                    ->options(fn (Get $get) => NavigationLink::query()
                        ->where('menu_group_id', $get('menu_group_id'))
                        ->whereNull('parent_id')
                        ->whereDoesntHave('pages')
                        ->pluck('title', 'id')
                    )
                    ->helperText('Hanya sub navigasi yang belum memiliki halaman yang muncul di sini.'),

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
