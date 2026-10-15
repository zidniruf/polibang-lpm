<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\Document;
use App\Models\DocumentCategory;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\MenuGroup;
use App\Models\Page;
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
use App\Models\NavigationCategory;
use Filament\Schemas\Components\Utilities\Get;

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

Select::make('navigation_type')
    ->label('Jenis Navigasi')
    ->options([
        'main' => 'Navigasi Utama',
        'sub' => 'Sub Navigasi',
        'sub_sub' => 'Sub-sub Navigasi',
    ])
    ->default('sub')
    ->required()
    ->live()
    ->afterStateUpdated(function ($state, $set) {
        if ($state === 'main') {
            $set('menu_group_id', null);
            $set('parent_page_id', null);
            $set('navigation_category_id', null);
        } elseif ($state === 'sub') {
            $set('parent_page_id', null);
            $set('navigation_category_id', null);
        } else {
            $set('parent_page_id', null);
        }
    }),

    Select::make('menu_group_id')
    ->label('Navigasi Utama')
->visible(fn ($get) => in_array(
    $get('navigation_type'),
    ['sub', 'sub_sub'],
    true
))
->required(fn ($get) => in_array(
    $get('navigation_type'),
    ['sub', 'sub_sub'],
    true
))
    ->live()
->afterStateUpdated(function ($set) {
    $set('parent_page_id', null);
    $set('navigation_category_id', null);
})
    ->relationship('menuGroup', 'name')
    ->searchable()
    ->preload()

                    // Tambah kelompok menu baru langsung dari select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Nama Navigasi Utama')
                            ->required()
                            ->unique(table: MenuGroup::class, column: 'name'),

                        Hidden::make('sort_order')->default(0),
                        Hidden::make('is_active')->default(true),
                    ])
                    ->createOptionModalHeading('Tambah Navigasi Utama')

                    // Edit kelompok menu yang sedang dipilih
                    ->editOptionForm([
                        TextInput::make('name')
                            ->label('Nama Navigasi Utama')
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
                    ->editOptionModalHeading('Edit Navigasi Utama')

                    // Hapus kelompok menu
                    ->hintAction(
                        Action::make('deleteMenuGroup')
                            ->label('Hapus Navigasi Utama')
                            ->icon('heroicon-m-trash')
                            ->color('danger')
                            ->modalHeading('Hapus Navigasi Utama')
                            ->requiresConfirmation()
                            ->form([
                                Select::make('menu_group_id')
                                    ->label('Pilih Navigasi Utama yang akan dihapus')
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
                                        ->title('Navigasi Utama tidak bisa dihapus')
                                        ->body('Masih ada halaman yang memakai Navigasi Utama ini.')
                                        ->danger()
                                        ->send();

                                    return;
                                }

                                $group->delete();

                                Notification::make()
                                    ->title('Navigasi Utama berhasil dihapus')
                                    ->success()
                                    ->send();
                            })
                    ),


Select::make('navigation_category_id')
    ->label('Sub Navigasi Induk')
    ->options(function (Get $get): array {
        $menuGroupId = $get('menu_group_id');

        if (! $menuGroupId) {
            return [];
        }

        return NavigationCategory::query()
            ->where('menu_group_id', $menuGroupId)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->pluck('name', 'id')
            ->toArray();
    })
    ->searchable()
    ->live()
    ->visible(fn (Get $get): bool => $get('navigation_type') === 'sub_sub')
    ->required(fn (Get $get): bool => $get('navigation_type') === 'sub_sub')
    ->createOptionForm([
        TextInput::make('name')
            ->label('Nama Sub Navigasi')
            ->required()
            ->maxLength(255),

        TextInput::make('sort_order')
            ->label('Urutan')
            ->numeric()
            ->default(0),
    ])
    ->createOptionUsing(function (array $data, Get $get): int {
        $menuGroupId = $get('menu_group_id');

        if (! $menuGroupId) {
            throw new \RuntimeException(
                'Pilih Navigasi Utama terlebih dahulu.'
            );
        }

        return NavigationCategory::create([
            'name' => $data['name'],
            'menu_group_id' => $menuGroupId,
            'sort_order' => $data['sort_order'] ?? 0,
        ])->getKey();
    })
    ->editOptionForm([
        TextInput::make('name')
            ->label('Nama Sub Navigasi')
            ->required()
            ->maxLength(255),

        TextInput::make('sort_order')
            ->label('Urutan')
            ->numeric()
            ->default(0),
    ])
->updateOptionUsing(function (
    array $data,
    Select $component
): void {
    $categoryId = $component->getState();

    $category = NavigationCategory::query()
        ->findOrFail($categoryId);

    $category->update([
        'name' => $data['name'],
        'sort_order' => $data['sort_order'] ?? 0,
    ]);
})

->hintAction(
    Action::make('deleteNavigationCategory')
        ->label('Hapus Sub Navigasi')
        ->icon('heroicon-m-trash')
        ->color('danger')
        ->requiresConfirmation()
        ->modalHeading('Hapus Sub Navigasi')
        ->modalDescription(
            'Kategori hanya dapat dihapus jika belum memiliki halaman anak.'
        )
        ->form([
            Select::make('category_id')
                ->label('Pilih Sub Navigasi')
->options(function (Select $component): array {
    $menuGroupId = $component
        ->getContainer()
        ->getParentComponent()
        ?->getState();

    // Ambil kelompok menu dari form utama jika tersedia.
    $formState = $component->getLivewire()->data ?? [];
    $menuGroupId = $formState['menu_group_id'] ?? null;

    if (! $menuGroupId) {
        return NavigationCategory::query()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->pluck('name', 'id')
            ->toArray();
    }

    return NavigationCategory::query()
        ->where('menu_group_id', $menuGroupId)
        ->orderBy('sort_order')
        ->orderBy('name')
        ->pluck('name', 'id')
        ->toArray();
})
                ->required()
                ->searchable(),
        ])
        ->action(function (array $data) {
            $category = NavigationCategory::find(
                $data['category_id']
            );

            if (! $category) {
                Notification::make()
                    ->title('Sub Navigasi tidak ditemukan')
                    ->danger()
                    ->send();

                return;
            }

            if ($category->pages()->exists()) {
                Notification::make()
                    ->title('Sub Navigasi tidak bisa dihapus')
                    ->body(
                        'Kategori ini masih memiliki halaman anak. '
                        . 'Pindahkan atau hapus halaman anak terlebih dahulu.'
                    )
                    ->danger()
                    ->send();

                return;
            }

            $category->delete();

            Notification::make()
                ->title('Sub Navigasi berhasil dihapus')
                ->success()
                ->send();


        })
),


TextInput::make('sort_order')
    ->label('Urutan Navigasi')
    ->numeric()
    ->integer()
    ->default(0)
    ->minValue(0)
    ->required()
    ->helperText(
        'Angka lebih kecil akan ditampilkan lebih dahulu.'
    ),

    FileUpload::make('banner_image')
    ->label('Gambar Banner')
    ->helperText(
        'Gambar header yang ditampilkan di bagian atas halaman.'
    )
    ->image()
    ->disk('public')
    ->directory('pages')
    ->visibility('public')
    ->columnSpanFull(),

RichEditor::make('content')
    ->label('Isi Halaman')
    ->toolbarButtons([
        'bold',
        'italic',
        'underline',
        'h2',
        'h3',
        'bulletList',
        'orderedList',
        'blockquote',
        'link',
        'undo',
        'redo',
    ])
    ->nullable()
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
                                    return DocumentCategory::query()
                                        ->orderBy('name')
                                        ->pluck('name', 'id')
                                        ->toArray();
                                }

                                if ($get('filter_type') === 'year') {
                                    return Document::query()
                                        ->whereNotNull('year')
                                        ->distinct()
                                        ->orderByDesc('year')
                                        ->pluck('year', 'year')
                                        ->toArray();
                                }

                                return [];
                            })
                            ->visible(fn ($get) => $get('filter_type') !== 'document'
                            ),

                        CheckboxList::make('documents')
                            ->relationship('documents', 'title')
                            ->columns(2)
                            ->searchable()
                            ->visible(fn ($get) => $get('filter_type') === 'document'
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

                                    return GalleryCategory::query()
                                        ->orderBy('name')
                                        ->pluck('name', 'id')
                                        ->toArray();
                                }

                                if ($get('filter_type') === 'gallery') {

                                    return Gallery::query()
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
