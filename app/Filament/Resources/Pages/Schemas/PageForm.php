<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\Document;
use App\Models\DocumentCategory;
use App\Models\MenuGroup;
use Filament\Actions\Action;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->label('Judul Halaman')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, $set) {
                        $set('slug', Str::slug($state));
                    }),

                Hidden::make('slug'),

                FileUpload::make('banner_image')
                    ->label('Gambar Banner')
                    ->helperText('Gambar header yang ditampilkan di bagian atas halaman.')
                    ->image()
                    ->disk('public')
                    ->directory('pages')
                    ->visibility('public')
                    ->columnSpanFull(),

                Select::make('menu_group_id')
                    ->label('Kelompok Menu')
                    ->relationship('menuGroup', 'name')
                    ->searchable()
                    ->preload()
                    ->required()

                    // Tambah kelompok menu baru langsung dari select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kelompok Menu')
                            ->required()
                            ->unique(table: MenuGroup::class, column: 'name'),

                        Hidden::make('sort_order')->default(0),
                        Hidden::make('is_active')->default(true),
                    ])
                    ->createOptionModalHeading('Tambah Kelompok Menu')

                    // Edit kelompok menu yang sedang dipilih
                    ->editOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kelompok Menu')
                            ->required()
                            ->unique(table: MenuGroup::class, column: 'name', ignoreRecord: true),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                    ])
                    ->editOptionModalHeading('Edit Kelompok Menu')

                    // Hapus kelompok menu
                    ->hintAction(
                        Action::make('deleteMenuGroup')
                            ->label('Hapus Kelompok Menu')
                            ->icon('heroicon-m-trash')
                            ->color('danger')
                            ->modalHeading('Hapus Kelompok Menu')
                            ->requiresConfirmation()
                            ->form([
                                Select::make('menu_group_id')
                                    ->label('Pilih kelompok menu yang akan dihapus')
                                    ->options(fn () => MenuGroup::pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                            ])
                            ->action(function (array $data) {
                                $group = MenuGroup::find($data['menu_group_id']);

                                if (! $group) {
                                    return;
                                }

                                if ($group->pages()->exists()) {
                                    Notification::make()
                                        ->title('Kelompok menu tidak bisa dihapus')
                                        ->body('Masih ada halaman yang memakai kelompok menu ini.')
                                        ->danger()
                                        ->send();

                                    return;
                                }

                                $group->delete();

                                Notification::make()
                                    ->title('Kelompok menu berhasil dihapus')
                                    ->success()
                                    ->send();
                            })
                    ),

                TextInput::make('sort_order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0)
                    ->required(),

                RichEditor::make('content')
                    ->label('Isi Halaman')
                    ->required()
                    ->columnSpanFull(),

                Repeater::make('documentBlocks')
                    ->relationship()
                    ->label('Blok Dokumen')
                    ->helperText(
                        'Tambahkan satu atau lebih tabel dokumen yang akan ditampilkan di halaman.'
                    )
                    ->collapsed()
                    ->reorderable()
                    ->defaultItems(0)
                    ->schema([

                        TextInput::make('title')
                            ->label('Judul Tabel Dokumen')
                            ->required(),

                        Select::make('filter_type')
                            ->label('Filter Berdasarkan')
                            ->options([
                                'category' => 'Kategori',
                                'year' => 'Tahun',
                                'document' => 'Dokumen Tertentu',
                            ])
                            ->live()
                            ->required(),

                        Select::make('filter_value')
                            ->label('Nilai Filter')
                            ->options(function ($get) {

                                if ($get('filter_type') === 'category') {
                                    return \App\Models\DocumentCategory::query()
                                        ->orderBy('name')
                                        ->pluck('name', 'id')
                                        ->toArray();
                                }

                                if ($get('filter_type') === 'year') {
                                    return \App\Models\Document::query()
                                        ->whereNotNull('year')
                                        ->distinct()
                                        ->orderByDesc('year')
                                        ->pluck('year', 'year')
                                        ->toArray();
                                }

                                return [];
                            })
                            ->visible(fn ($get) =>
                                $get('filter_type') !== 'document'
                            ),

                        CheckboxList::make('documents')
                            ->relationship('documents', 'title')
                            ->columns(2)
                            ->searchable()
                            ->visible(fn ($get) =>
                                $get('filter_type') === 'document'
                            ),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),

                    ])

                    ->columnSpanFull(),

                Repeater::make('galleryBlocks')
                    ->relationship()
                    ->label('Blok Galeri')
                    ->helperText(
                        'Tambahkan satu atau lebih galeri pada halaman.'
                    )
                    ->collapsed()
                    ->reorderable()
                    ->defaultItems(0)
                    ->schema([

                        TextInput::make('title')
                            ->label('Judul Galeri')
                            ->required(),

                        Select::make('filter_type')
                            ->label('Filter Berdasarkan')
                            ->options([
                                'category' => 'Kategori Galeri',
                                'gallery' => 'Galeri Tertentu',
                            ])
                            ->live()
                            ->required(),

                        Select::make('filter_value')
                            ->label('Nilai Filter')
                            ->options(function ($get) {

                                if ($get('filter_type') === 'category') {

                                    return \App\Models\GalleryCategory::query()
                                        ->orderBy('name')
                                        ->pluck('name', 'id')
                                        ->toArray();
                                }

                                if ($get('filter_type') === 'gallery') {

                                    return \App\Models\Gallery::query()
                                        ->orderBy('title')
                                        ->pluck('title', 'id')
                                        ->toArray();
                                }

                                return [];
                            })
                            ->required(),

                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),

                    ])
                    ->columnSpanFull(),

                Toggle::make('show_gallery')
                    ->label('Tampilkan Galeri')
                    ->default(false),

                Toggle::make('show_structure')
                    ->label('Tampilkan Struktur Organisasi')
                    ->default(false),

                Toggle::make('is_published')
                    ->label('Publikasikan')
                    ->default(true),

            ]);
    }
}