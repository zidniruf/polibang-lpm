<?php

namespace App\Providers;

use App\Models\MenuGroup;
use App\Models\NavigationLink;
use App\Models\Page;
use App\Models\NavigationCategory;
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

            // Halaman yang tampil langsung sebagai tautan utama.
            'mainPages' => fn () => Page::query()
                ->where('is_published', true)
                ->where('navigation_type', 'main')
                ->orderBy('sort_order')
                ->get(),

            // Kelompok menu berisi sub navigasi dan anak-anaknya.

'menuGroups' => fn () => MenuGroup::query()
    ->where('is_active', true)
    ->with([
        // Halaman Sub Navigasi lama tetap dipertahankan.
        'pages' => fn ($q) => $q
            ->where('is_published', true)
            ->where('navigation_type', 'sub')
            ->whereNull('parent_page_id')
            ->with([
                // Anak dari sistem navigasi lama.
                'childPages' => fn ($children) => $children
                    ->where('is_published', true)
                    ->where('navigation_type', 'sub_sub')
                    ->orderBy('sort_order'),
            ])
            ->orderBy('sort_order'),

        // Kategori teks baru beserta halaman anaknya.
        'navigationCategories' => fn ($q) => $q
            ->with([
                'pages' => fn ($pages) => $pages
                    ->where('is_published', true)
                    ->where('navigation_type', 'sub_sub')
                    ->orderBy('sort_order'),
            ])
            ->orderBy('sort_order'),
    ])
    ->orderBy('sort_order')
    ->get(),

                // Sub Navigasi teks yang menjadi induk halaman Sub-sub Navigasi.
'navigationCategories' => fn () => NavigationCategory::query()
    ->whereHas('menuGroup', fn ($query) => $query->where('is_active', true))
    ->with([
        'menuGroup',
        'pages' => fn ($query) => $query
            ->where('is_published', true)
            ->where('navigation_type', 'sub_sub')
            ->orderBy('sort_order'),
    ])
    ->orderBy('sort_order')
    ->get(),

            // Tautan eksternal yang sudah ada tetap dipertahankan.
            'navigationLinks' => fn () => NavigationLink::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
        ]);
    }
}