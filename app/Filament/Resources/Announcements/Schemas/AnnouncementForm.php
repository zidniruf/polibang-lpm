<?php

namespace App\Filament\Resources\Announcements\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Slider;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class AnnouncementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->label('Judul Pengumuman')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, $set) {
                        $set('slug', Str::slug($state));
                    }),

                Hidden::make('slug'),

                FileUpload::make('image')
                    ->label('Gambar Pengumuman')
                    ->image()
                    ->disk('public')
                    ->directory('announcements')
                    ->live(),

                \Filament\Schemas\Components\Grid::make(2)
                    ->schema([
                        Slider::make('image_focus_x')
                            ->label('Fokus Horizontal (%)')
                            ->helperText('Geser untuk atur fokus kiri-kanan')
                            ->default(50)
                            ->minValue(0)
                            ->maxValue(100)
                            ->step(1)
                            ->live(),

                        Slider::make('image_focus_y')
                            ->label('Fokus Vertikal (%)')
                            ->helperText('Geser untuk atur fokus atas-bawah')
                            ->default(50)
                            ->minValue(0)
                            ->maxValue(100)
                            ->step(1)
                            ->live(),
                    ]),

                DateTimePicker::make('published_at')
                    ->label('Tanggal Publikasi')
                    ->default(now())
                    ->required(),

                RichEditor::make('content')
                    ->label('Isi Pengumuman')
                    ->required()
                    ->columnSpanFull(),

                Section::make('Detail Kegiatan')
                    ->description('4 kolom informasi ini akan tampil di halaman detail pengumuman.')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([

                        DatePicker::make('event_start_date')
                            ->label('Tanggal Mulai'),

                        DatePicker::make('event_end_date')
                            ->label('Tanggal Selesai'),

                        TextInput::make('location')
                            ->label('Lokasi'),

                        TextInput::make('organizer')
                            ->label('Penyelenggara'),

                    ]),

                Toggle::make('is_published')
                    ->label('Publikasikan')
                    ->default(true),

                Toggle::make('show_on_home')
                    ->label('Tampilkan sebagai Popup di Beranda')
                    ->helperText('Jika aktif, pengumuman ini akan muncul sebagai popup saat pengunjung pertama kali membuka website.')
                    ->default(false),

            ]);
    }
}
