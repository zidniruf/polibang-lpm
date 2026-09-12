<?php

namespace App\Filament\Resources\Galleries\Schemas;

use App\Models\GalleryCategory;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Select::make('gallery_category_id')
                    ->label('Kategori Galeri')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()

                    // Tambah kategori baru langsung dari select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: GalleryCategory::class, column: 'name'),
                    ])
                    ->createOptionModalHeading('Tambah Kategori Galeri')

                    // Edit kategori yang sedang dipilih
                    ->editOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: GalleryCategory::class, column: 'name', ignoreRecord: true),
                    ])
                    ->editOptionModalHeading('Edit Kategori Galeri')

                    // Hapus kategori
                    ->hintAction(
                        Action::make('deleteCategory')
                            ->label('Hapus Kategori')
                            ->icon('heroicon-m-trash')
                            ->color('danger')
                            ->modalHeading('Hapus Kategori Galeri')
                            ->requiresConfirmation()
                            ->form([
                                Select::make('category_id')
                                    ->label('Pilih kategori yang akan dihapus')
                                    ->options(fn () => GalleryCategory::pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                            ])
                            ->action(function (array $data) {
                                $category = GalleryCategory::find($data['category_id']);

                                if (! $category) {
                                    return;
                                }

                                if ($category->galleries()->exists()) {
                                    Notification::make()
                                        ->title('Kategori tidak bisa dihapus')
                                        ->body('Masih ada foto galeri yang memakai kategori ini.')
                                        ->danger()
                                        ->send();

                                    return;
                                }

                                $category->delete();

                                Notification::make()
                                    ->title('Kategori berhasil dihapus')
                                    ->success()
                                    ->send();
                            })
                    ),

                TextInput::make('title')
                    ->label('Judul Foto')
                    ->required(),

                FileUpload::make('image')
                    ->label('Foto')
                    ->image()
                    ->disk('public')
                    ->directory('galleries')
                    ->required(),

                Textarea::make('description')
                    ->label('Deskripsi'),

                TextInput::make('sort_order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0),

                Toggle::make('is_published')
                    ->label('Publikasikan')
                    ->default(true),

            ]);
    }
}
