<?php

namespace App\Filament\Resources\DocumentCategories;

use App\Filament\Resources\DocumentCategories\Pages\CreateDocumentCategory;
use App\Filament\Resources\DocumentCategories\Pages\EditDocumentCategory;
use App\Filament\Resources\DocumentCategories\Pages\ListDocumentCategories;
use App\Filament\Resources\DocumentCategories\Schemas\DocumentCategoryForm;
use App\Filament\Resources\DocumentCategories\Tables\DocumentCategoriesTable;
use App\Models\DocumentCategory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DocumentCategoryResource extends Resource
{
    protected static ?string $model = DocumentCategory::class;

    protected static string|\UnitEnum|null $navigationGroup =
        'Dokumen';

    protected static ?string $navigationLabel =
        'Kategori Dokumen';

    protected static string|BackedEnum|null $navigationIcon =
        Heroicon::OutlinedFolder;

    // Disembunyikan dari sidebar karena kategori sekarang
    // dikelola langsung dari form Dokumen Mutu (tambah/edit/hapus).
    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return DocumentCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DocumentCategoriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDocumentCategories::route('/'),
            'create' => CreateDocumentCategory::route('/create'),
            'edit' => EditDocumentCategory::route('/{record}/edit'),
        ];
    }
}
