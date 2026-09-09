<?php

namespace App\Filament\Resources\MenuGroups;

use App\Filament\Resources\MenuGroups\Pages\CreateMenuGroup;
use App\Filament\Resources\MenuGroups\Pages\EditMenuGroup;
use App\Filament\Resources\MenuGroups\Pages\ListMenuGroups;
use App\Filament\Resources\MenuGroups\Schemas\MenuGroupForm;
use App\Filament\Resources\MenuGroups\Tables\MenuGroupsTable;
use App\Models\MenuGroup;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MenuGroupResource extends Resource
{
    protected static ?string $model = MenuGroup::class;

    protected static string|BackedEnum|null $navigationIcon =
        Heroicon::OutlinedBars3BottomLeft;

    protected static string|\UnitEnum|null $navigationGroup =
        'Navigasi';

    protected static ?string $navigationLabel =
        'Kelompok Menu';

    protected static ?int $navigationSort = 2;

    // Disembunyikan dari sidebar karena kelompok menu sekarang
    // dikelola langsung dari form Halaman (tambah/edit/hapus).
    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return MenuGroupForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MenuGroupsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMenuGroups::route('/'),
            'create' => CreateMenuGroup::route('/create'),
            'edit' => EditMenuGroup::route('/{record}/edit'),
        ];
    }
}