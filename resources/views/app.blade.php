<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $setting = \App\Models\WebsiteSetting::first();
        @endphp

        <title inertia>
            {{ $setting?->site_name ?? config('app.name', 'Laravel') }}
        </title>

        {{-- Default description website --}}
        <meta
            name="description"
            content="{{ $setting?->tagline ?? 'Situs web resmi Pusat Penjamin Mutu Politeknik Balekambang Jepara' }}"
        >

        {{-- Canonical URL --}}
        <link rel="canonical" href="{{ request()->url() }}">

        {{-- Favicon --}}
        @if($setting?->logo)
            <link
                rel="icon"
                type="image/png"
                href="{{ asset('storage/' . $setting->logo) }}"
            >
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link
            href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
            rel="stylesheet"
        />

        <!-- Scripts -->
        @routes

        @viteReactRefresh

        @vite([
            'resources/js/app.jsx',
            "resources/js/Pages/{$page['component']}.jsx"
        ])

        {{-- Inertia SEO / Open Graph / Twitter metadata --}}
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>