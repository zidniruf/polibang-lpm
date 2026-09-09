<?php

namespace App\Filament\Resources\WebsiteSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\RichEditor;

class WebsiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
return $schema
    ->components([

        Section::make('Identitas Website')
            ->columns(2)
            ->schema([

                TextInput::make('site_name')
                    ->required(),

                FileUpload::make('logo')
                    ->image()
                    ->disk('public')
                    ->directory('website'),

            ]),

        Section::make('Hero Homepage')
            ->columns(2)
            ->schema([

                TextInput::make('hero_title'),

                Textarea::make('hero_subtitle')
                    ->rows(3),

                FileUpload::make('hero_image_1')
                    ->image()
                    ->disk('public')
                    ->directory('website'),

                FileUpload::make('hero_image_2')
                    ->image()
                    ->disk('public')
                    ->directory('website'),

            ]),

        Section::make('Tentang LPM')
            ->columns(2)
            ->schema([

                TextInput::make('about_title')
                    ->label('Judul Tentang'),

                FileUpload::make('about_image')
                    ->label('Gambar Tentang')
                    ->image()
                    ->disk('public')
                    ->directory('website'),

                RichEditor::make('about_content')
                    ->label('Deskripsi Tentang')
                    ->columnSpanFull(),

            ]),

        Section::make('Kontak')
            ->columns(2)
            ->schema([

                TextInput::make('email'),

                TextInput::make('phone'),

                TextInput::make('whatsapp'),

                Textarea::make('address'),

            ]),

        Section::make('Media Sosial')
            ->columns(2)
            ->schema([

                TextInput::make('instagram'),

                TextInput::make('facebook'),

                TextInput::make('youtube'),

                TextInput::make('tiktok'),

            ]),

    ]);
    }
}