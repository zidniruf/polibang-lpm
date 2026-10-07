<?php

namespace App\Filament\Resources\QuickAccessItems\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class QuickAccessItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->rows(3)
                    ->maxLength(65535),

                Select::make('type')
                    ->options([
                        'checkbox' => 'Checkbox',
                        'link' => 'Link',
                    ])
                    ->required()
                    ->live(),

                Toggle::make('display_on_frontend')
                    ->label('Tampilkan di Halaman User')
                    ->default(true),

                TextInput::make('link')
                    ->label('Link Tujuan')
                    ->visible(fn ($get) => $get('type') === 'link')
                    ->required(fn ($get) => $get('type') === 'link'),

                TextInput::make('order')
                    ->numeric()
                    ->default(0),

                TextInput::make('icon')
                    ->maxLength(255),
            ]);
    }
}
