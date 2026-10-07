<?php

namespace App\Filament\Resources\QuickAccessItems\Pages;

use App\Filament\Resources\QuickAccessItems\QuickAccessItemResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditQuickAccessItem extends EditRecord
{
    protected static string $resource = QuickAccessItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
