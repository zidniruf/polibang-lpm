<?php

namespace App\Filament\Resources\WebsiteSettings\Pages;

use App\Filament\Resources\WebsiteSettings\WebsiteSettingResource;
use App\Models\WebsiteSetting;
use Filament\Resources\Pages\EditRecord;

class EditWebsiteSetting extends EditRecord
{
    protected static string $resource = WebsiteSettingResource::class;

    public function mount($record = null): void
    {
        $record ??= WebsiteSetting::primary()?->getKey();

        if ($record === null) {
            abort(404, 'Pengaturan website belum tersedia.');
        }

        parent::mount($record);
    }
}