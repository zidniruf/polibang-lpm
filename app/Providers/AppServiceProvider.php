<?php

namespace App\Providers;

use App\Models\MenuGroup;
use App\Models\NavigationLink;
use App\Models\WebsiteSetting;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Inertia::share([

            'setting' => fn () => WebsiteSetting::first(),

            'menuGroups' => fn () => MenuGroup::query()
                ->where('is_active', true)
                ->with([
                    'pages' => fn ($q) => $q->where('is_published', true)
                        ->orderBy('sort_order'),
                ])
                ->orderBy('sort_order')
                ->get(),

            'navigationLinks' => fn () => NavigationLink::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),

        ]);
    }
}
