<?php

namespace App\Filament\Resources\News\Schemas;

use App\Models\NewsCategory;
use Filament\Actions\Action;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('slug', Str::slug($state));
                    }),

                Hidden::make('slug'),

                Select::make('news_category_id')
                    ->label('Kategori Berita')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required()

                    // Tambah kategori baru langsung dari select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: NewsCategory::class, column: 'name'),

                        Hidden::make('sort_order')->default(0),
                        Hidden::make('is_active')->default(true),
                    ])
                    ->createOptionModalHeading('Tambah Kategori Berita')

                    // Edit kategori yang sedang dipilih
                    ->editOptionForm([
                        TextInput::make('name')
                            ->label('Nama Kategori')
                            ->required()
                            ->unique(table: NewsCategory::class, column: 'name', ignoreRecord: true),

                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true),
                    ])
                    ->editOptionModalHeading('Edit Kategori Berita')

                    // Hapus kategori
                    ->hintAction(
                        Action::make('deleteCategory')
                            ->label('Hapus Kategori')
                            ->icon('heroicon-m-trash')
                            ->color('danger')
                            ->modalHeading('Hapus Kategori Berita')
                            ->requiresConfirmation()
                            ->form([
                                Select::make('category_id')
                                    ->label('Pilih kategori yang akan dihapus')
                                    ->options(fn () => NewsCategory::pluck('name', 'id'))
                                    ->required()
                                    ->searchable(),
                            ])
                            ->action(function (array $data) {
                                $category = NewsCategory::find($data['category_id']);

                                if (! $category) {
                                    return;
                                }

                                if ($category->news()->exists()) {
                                    Notification::make()
                                        ->title('Kategori tidak bisa dihapus')
                                        ->body('Masih ada berita yang memakai kategori ini.')
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

                Textarea::make('excerpt')
                    ->rows(3),

                RichEditor::make('content')
                    ->columnSpanFull()
                    ->required(),

                FileUpload::make('thumbnail')
                    ->image()
                    ->disk('public')
                    ->directory('news')
                    ->visibility('public'),

                Toggle::make('is_published')
                    ->default(true),

                DateTimePicker::make('published_at'),

            ]);
    }
}