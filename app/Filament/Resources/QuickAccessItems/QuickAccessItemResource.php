<?php

namespace App\Filament\Resources\QuickAccessItems;

use App\Filament\Resources\QuickAccessItems\Pages\CreateQuickAccessItem;
use App\Filament\Resources\QuickAccessItems\Pages\EditQuickAccessItem;
use App\Filament\Resources\QuickAccessItems\Pages\ListQuickAccessItems;
use App\Filament\Resources\QuickAccessItems\Schemas\QuickAccessItemForm;
use App\Filament\Resources\QuickAccessItems\Tables\QuickAccessItemsTable;
use App\Models\QuickAccessItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class QuickAccessItemResource extends Resource
{
    protected static ?string $model = QuickAccessItem::class;

    protected static string|BackedEnum|null $navigationIcon =
        Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Konten';

    protected static ?string $navigationLabel =
        'Quick Access Item';
    
    public static function form(Schema $schema): Schema
    {
        return QuickAccessItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return QuickAccessItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListQuickAccessItems::route('/'),
            'create' => CreateQuickAccessItem::route('/create'),
            'edit' => EditQuickAccessItem::route('/{record}/edit'),
        ];
    }
}
