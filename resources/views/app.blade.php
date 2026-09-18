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

        <meta name="description" content="{{ $setting?->tagline ?? 'Situs web resmi Polibang LPM' }}">
        <link rel="canonical" href="{{ request()->url() }}">
        <meta property="og:title" content="{{ $setting?->site_name ?? config('app.name', 'Laravel') }}">
        <meta property="og:description" content="{{ $setting?->tagline ?? 'Situs web resmi Polibang LPM' }}">
        @if($setting?->logo)
            <meta property="og:image" content="{{ asset('storage/' . $setting->logo) }}">
        @endif
        <meta property="og:url" content="{{ request()->url() }}">
        <meta property="og:type" content="website">

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
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>