<?php

namespace App\Filament\Resources\DocumentCategories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class DocumentCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('name')
                    ->label('Nama Kategori')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(
                        fn ($state, $set) => $set('slug', Str::slug($state))
                    ),

                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated(),

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
