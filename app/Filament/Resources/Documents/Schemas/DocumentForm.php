<?php

namespace App\Filament\Resources\Documents\Schemas;

use App\Models\DocumentCategory;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->label('Judul Dokumen')
                    ->required()
                    ->maxLength(255),

                Select::make('document_category_id')
                    ->label('Kategori Dokumen')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required()

                    // Tambah kategori baru langsung dari select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: DocumentCategory::class, column: 'name'),

                        Hidden::make('sort_order')->default(0),
                        Hidden::make('is_active')->default(true),
                    ])
                    ->createOptionModalHeading('Tambah Kategori Dokumen')

                    // Edit kategori yang sedang dipilih
                    ->editOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: DocumentCategory::class, column: 'name', ignoreRecord: true),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                    ])
                    ->editOptionModalHeading('Edit Kategori Dokumen')

                    // Hapus kategori
                    ->hintAction(
                        Action::make('deleteCategory')
                            ->label('Hapus Kategori')
                            ->icon('heroicon-m-trash')
                            ->color('danger')
                            ->modalHeading('Hapus Kategori Dokumen')
                            ->requiresConfirmation()
                            ->form([
                                Select::make('category_id')
                                    ->label('Pilih kategori yang akan dihapus')
                                    ->options(fn () => DocumentCategory::pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                            ])
                            ->action(function (array $data) {
                                $category = DocumentCategory::find($data['category_id']);

                                if (! $category) {
                                    return;
                                }

                                if ($category->documents()->exists()) {
                                    Notification::make()
                                        ->title('Kategori tidak bisa dihapus')
                                        ->body('Masih ada dokumen yang memakai kategori ini.')
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

                TextInput::make('year')
                    ->label('Tahun')
                    ->numeric()
                    ->minValue(2000)
                    ->maxValue(date('Y') + 1),

                Radio::make('type')
                    ->label('Tipe Dokumen')
                    ->options([
                        'file' => 'Upload File',
                        'link' => 'Link Eksternal',
                    ])
                    ->default('file')
                    ->live()
                    ->afterStateUpdated(function ($state, callable $set) {
                        if ($state === 'file') {
                            $set('link', null);
                        } else {
                            $set('file', null);
                        }
                    }),

                FileUpload::make('file')
                    ->label('Masukkan Dokumen')
                    ->disk('public')
                    ->directory('documents')
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'application/vnd.ms-powerpoint',
                        'text/plain',
                        'application/zip',
                        'application/x-rar-compressed',
                        'application/octet-stream',
                    ])
                    ->visible(fn ($get) => $get('type') === 'file')
                    ->required(fn ($get) => $get('type') === 'file'),

                TextInput::make('link')
                    ->label('Link Dokumen')
                    ->url()
                    ->placeholder('https://...')
                    ->visible(fn ($get) => $get('type') === 'link')
                    ->required(fn ($get) => $get('type') === 'link'),

                Toggle::make('is_published')
                    ->label('Publikasikan')
                    ->default(true),

            ]);
    }
}
