<?php

namespace App\Filament\Resources\MenuGroups\Pages;

use App\Filament\Resources\MenuGroups\MenuGroupResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMenuGroup extends EditRecord
{
    protected static string $resource = MenuGroupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
