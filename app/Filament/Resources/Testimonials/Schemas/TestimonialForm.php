<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Data Testimoni')
                    ->columns(2)
                    ->schema([

                        FileUpload::make('photo')
                            ->label('Foto')
                            ->image()
                            ->disk('public')
                            ->directory('testimonials'),

                        TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('position')
                            ->label('Jabatan / Instansi')
                            ->maxLength(255),

                        Select::make('rating')
                            ->label('Rating')
                            ->options([
                                1 => '⭐ 1',
                                2 => '⭐⭐ 2',
                                3 => '⭐⭐⭐ 3',
                                4 => '⭐⭐⭐⭐ 4',
                                5 => '⭐⭐⭐⭐⭐ 5',
                            ])
                            ->default(5)
                            ->required(),

                        Toggle::make('is_active')
                            ->label('Tampilkan di Website')
                            ->default(true),

                    ]),

                Section::make('Isi Testimoni')
                    ->schema([

                        Textarea::make('content')
                            ->label('Testimoni')
                            ->rows(6)
                            ->required()
                            ->columnSpanFull(),

                    ]),

            ]);
    }
}