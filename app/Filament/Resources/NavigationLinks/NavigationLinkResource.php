<?php

namespace App\Filament\Resources\NavigationLinks;

use App\Filament\Resources\NavigationLinks\Pages\CreateNavigationLink;
use App\Filament\Resources\NavigationLinks\Pages\EditNavigationLink;
use App\Filament\Resources\NavigationLinks\Pages\ListNavigationLinks;
use App\Filament\Resources\NavigationLinks\Schemas\NavigationLinkForm;
use App\Filament\Resources\NavigationLinks\Tables\NavigationLinksTable;
use App\Models\NavigationLink;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class NavigationLinkResource extends Resource
{
    protected static ?string $model = NavigationLink::class;

    protected static ?string $navigationLabel = 'Navigasi Langsung';

protected static string|\UnitEnum|null $navigationGroup = 'Website';
    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon =
        Heroicon::OutlinedLink;

    public static function form(Schema $schema): Schema
    {
        return NavigationLinkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NavigationLinksTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNavigationLinks::route('/'),
            'create' => CreateNavigationLink::route('/create'),
            'edit' => EditNavigationLink::route('/{record}/edit'),
        ];
    }
}