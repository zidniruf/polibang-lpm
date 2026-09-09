<?php

namespace App\Filament\Resources\WebsiteSettings\Pages;

use App\Models\WebsiteSetting;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\WebsiteSettings\WebsiteSettingResource;

class EditWebsiteSetting extends EditRecord
{
    protected static string $resource =
        WebsiteSettingResource::class;

    public function mount($record = null): void
    {
        $record ??= WebsiteSetting::firstOrCreate([
            'site_name' => 'P2M Polibang',
        ])->id;

        parent::mount($record);
    }
}