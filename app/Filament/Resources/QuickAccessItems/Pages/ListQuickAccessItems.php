<?php

namespace App\Filament\Resources\QuickAccessItems\Pages;

use App\Filament\Resources\QuickAccessItems\QuickAccessItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListQuickAccessItems extends ListRecords
{
    protected static string $resource = QuickAccessItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
