<x-filament-panels::page.simple>
    @php
        $setting = \App\Models\WebsiteSetting::query()->first();

        $logoSrc = $setting?->logo
            ? asset('storage/' . ltrim($setting->logo, '/'))
            : null;

        $siteName = $setting?->site_name ?: 'P2M Polibang';
    @endphp

    <style>
        /* ===== Reset bawaan Filament simple layout ===== */
        .fi-simple-header,
        .fi-simple-footer { display: none !important; }

        .fi-simple-layout {
            background:
                radial-gradient(ellipse 60% 50% at 50% 0%, #fff 0, transparent 70%),
                #f6f9f8 !important;
        }
        .fi-simple-main-ctn { display: block !important; width: 100% !important; }
        .fi-simple-main {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            --tw-ring-shadow: 0 0 #0000 !important;
            border-radius: 0 !important;
        }
        .fi-simple-page { margin: 0 !important; }

        /* ===== Halaman ===== */
        .p2m-login {
            --u: .9px;
            --green: #0a9150;
            --green-dark: #08793f;
            --navy: #0b1630;
            --muted: #6f7a90;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            min-height: 100dvh;
            padding: 32px;
            font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
            color: var(--navy);
        }

        .p2m-card {
            position: relative;
            display: grid;
            grid-template-columns: 1.25fr 1fr;
            width: min(1180px, 100%);
            min-height: 610px;
            overflow: hidden;
            border-radius: 28px;
            background: #fff;
            box-shadow: 0 30px 80px rgb(40 70 55 / 12%), 0 4px 18px rgb(40 70 55 / 6%);
        }

        /* ===== Dekorasi ===== */
        .p2m-deco { position: absolute; pointer-events: none; z-index: 0; }

        .p2m-deco--tl-b,
        .p2m-deco--tl-a,
        .p2m-deco--tr-a,
        .p2m-deco--tr-b { border-radius: calc(36 * var(--u)); transform: rotate(45deg); }

        .p2m-deco--tl-b {
            left: calc(-139 * var(--u)); top: calc(-54 * var(--u));
            width: calc(300 * var(--u)); height: calc(300 * var(--u));
            background: linear-gradient(45deg, rgb(168 216 189 / 38%), rgb(168 216 189 / 6%));
        }
        .p2m-deco--tl-a {
            left: calc(-180 * var(--u)); top: calc(-7 * var(--u));
            width: calc(260 * var(--u)); height: calc(260 * var(--u));
            background: linear-gradient(45deg, #a3d6b8, #d6ecdf);
        }
        .p2m-deco--tr-a,
        .p2m-deco--tr-b { display: none; }

        .p2m-deco--dots {
            left: calc(88 * var(--u)); top: calc(218 * var(--u));
            width: calc(90 * var(--u)); height: calc(180 * var(--u));
            background-image: radial-gradient(circle, #dcede3 calc(4 * var(--u)), transparent calc(4.5 * var(--u)));
            background-size: calc(30 * var(--u)) calc(30 * var(--u));
        }
        .p2m-deco--ring {
            left: calc(395 * var(--u)); top: calc(118 * var(--u));
            width: calc(230 * var(--u)); height: calc(230 * var(--u));
            border: calc(30 * var(--u)) solid #eff6f2;
            border-radius: 50%;
        }
        .p2m-deco--bl {
            left: 0; bottom: 0;
            width: calc(290 * var(--u)); height: calc(248 * var(--u));
            background: linear-gradient(135deg, #098a4b 0%, #3fae78 55%, #d9eee2 100%);
            clip-path: polygon(0 0, 0 100%, 100% 100%);
        }
        .p2m-deco--bl::after {
            content: ""; position: absolute; inset: 0;
            background: linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 22%) 100%);
        }
        .p2m-deco--line {
            left: 0; bottom: calc(273 * var(--u));
            width: calc(398 * var(--u)); height: 1px;
            background: #0b9a54;
            transform-origin: 0 0;
            transform: rotate(43.3deg);
        }

        /* ===== Panel brand (kiri) ===== */
        .p2m-brand {
            position: relative; z-index: 1;
            display: flex; align-items: center; justify-content: center;
            padding: 40px 0;
        }
        .p2m-brand__inner { width: calc(380 * var(--u)); max-width: 100%; }
        .p2m-brand__logo {
            display: block;
            width: calc(310 * var(--u));
            max-width: 100%;
            height: auto;
            margin-left: calc(-4 * var(--u));
        }
        .p2m-brand__name { margin: 0; font-size: 28px; font-weight: 800; color: var(--green); }
        .p2m-brand__line { display: block; width: 60px; height: 2px; margin: 26px 0 14px; background: var(--green); }
        .p2m-brand__tagline {
            margin: 0;
            color: #5c667a;
            font-size: 15px;
            line-height: 1.65;
            letter-spacing: .16em;
        }

        /* ===== Panel form (kanan) ===== */
        .p2m-panel {
            position: relative; z-index: 1;
            display: flex; align-items: center;
            padding: 40px clamp(28px, 4.2vw, 56px) 40px 0;
        }
        .p2m-panel__inner { width: 100%; }

        .p2m-eyebrow { margin: 0; color: var(--green); font-size: 18px; font-weight: 700; }
        .p2m-title {
            margin: 10px 0 12px;
            color: var(--navy);
            font-size: clamp(30px, 3vw, 38px);
            font-weight: 800;
            letter-spacing: -.025em;
            line-height: 1.2;
        }
        .p2m-sub { margin: 0 0 28px; color: var(--muted); font-size: 16px; line-height: 1.75; }

        .p2m-form { display: flex; flex-direction: column; gap: 16px; }

        .p2m-input {
            display: flex; align-items: center; gap: 16px;
            height: 56px; padding: 0 20px;
            border: 1px solid #dfe5f2;
            border-radius: 12px;
            background: #f1f4fd;
            transition: border-color .15s, box-shadow .15s, background .15s;
        }
        .p2m-input:focus-within {
            border-color: var(--green);
            background: #fff;
            box-shadow: 0 0 0 4px rgb(10 145 80 / 12%);
        }
        .p2m-input.is-invalid { border-color: #e5484d; }
        .p2m-input svg { width: 22px; height: 22px; flex: 0 0 auto; fill: none; stroke: var(--navy); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .p2m-input input {
            flex: 1 1 0%; width: 0; min-width: 0; height: 100%;
            padding: 0; border: 0; outline: 0; box-shadow: none !important;
            background: transparent;
            color: var(--navy); font: inherit; font-size: 16px;
        }
        .p2m-input input::placeholder { color: #98a2b8; }
        .p2m-eye { display: flex; padding: 4px; border: 0; background: none; cursor: pointer; }
        .p2m-error { margin: 6px 4px 0; color: #e5484d; font-size: 13px; }

        .p2m-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .p2m-check { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-size: 15px; font-weight: 500; }
        .p2m-check input {
            appearance: none; -webkit-appearance: none;
            width: 24px; height: 24px; margin: 0;
            border: 1.5px solid #c5cedd; border-radius: 7px;
            background: #fff center / 16px no-repeat;
            cursor: pointer; transition: background-color .15s, border-color .15s;
        }
        .p2m-check input:checked {
            border-color: var(--green);
            background-color: var(--green);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E");
        }
        .p2m-check input:focus-visible { outline: 3px solid #7dd9a5; outline-offset: 2px; }
        .p2m-forgot { color: #f26a0f; font-size: 15px; font-weight: 600; text-decoration: none; white-space: nowrap; }
        .p2m-forgot:hover { text-decoration: underline; }

        .p2m-btn {
            display: flex; align-items: center; justify-content: center; gap: 14px;
            width: 100%; height: 58px;
            border-radius: 13px;
            font: inherit; font-size: 17px; font-weight: 700;
            text-decoration: none; cursor: pointer;
            transition: transform .15s, box-shadow .15s, background .15s;
        }
        .p2m-btn svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .p2m-btn:focus-visible { outline: 3px solid #7dd9a5; outline-offset: 3px; }
        .p2m-btn--primary { margin-top: 2px; border: 0; color: #fff; background: var(--green); box-shadow: 0 6px 14px rgb(10 145 80 / 22%); }
        .p2m-btn--primary:hover { background: var(--green-dark); transform: translateY(-1px); }
        .p2m-btn--primary[disabled] { opacity: .7; cursor: wait; }
        .p2m-btn--outline { height: 56px; border: 1.5px solid var(--green); color: var(--green); background: #fff; }
        .p2m-btn--outline:hover { background: #f1faf5; }

        /* ===== Tablet & mobile ===== */
        @media (max-width: 900px) {
            .p2m-login {
                --u: min(1px, calc((100vw - 32px) / 685));
                align-items: flex-start;
                padding: 16px;
            }
            .p2m-card { grid-template-columns: minmax(0, 1fr); width: min(560px, 100%); min-height: 0; margin: auto; border-radius: 36px; }
            .p2m-brand, .p2m-panel, .p2m-panel__inner, .p2m-form > * { min-width: 0; max-width: 100%; }

            .p2m-deco--bl, .p2m-deco--line, .p2m-deco--ring { display: none; }
            .p2m-deco--dots {
                left: calc(15 * var(--u)); top: calc(190 * var(--u));
                width: calc(100 * var(--u)); height: calc(110 * var(--u));
                background-size: calc(32 * var(--u)) calc(32 * var(--u));
            }
            .p2m-deco--tr-a, .p2m-deco--tr-b { display: block; }
            .p2m-deco--tr-a {
                right: calc(-124 * var(--u)); top: calc(-25 * var(--u));
                width: calc(200 * var(--u)); height: calc(200 * var(--u));
                background: linear-gradient(90deg, #eef7f1, #d3ebdd);
            }
            .p2m-deco--tr-b {
                right: calc(-150 * var(--u)); top: calc(50 * var(--u));
                width: calc(230 * var(--u)); height: calc(230 * var(--u));
                background: linear-gradient(90deg, #eef7f2, #9dd2b4);
            }

            .p2m-brand { padding: calc(100 * var(--u)) 24px 0; }
            .p2m-brand__inner { width: auto; }
            .p2m-brand__logo { width: clamp(150px, calc(300 * var(--u)), 220px); margin: 0 auto; }
            .p2m-brand__line, .p2m-brand__tagline { display: none; }

            .p2m-panel { padding: 28px clamp(20px, 7vw, 40px) 36px; text-align: center; }
            .p2m-eyebrow { font-size: 16px; }
            .p2m-title { font-size: clamp(25px, 7vw, 32px); }
            .p2m-sub { font-size: 14px; margin-bottom: 24px; }
            .p2m-form { text-align: left; }
            .p2m-input { height: 52px; }
            .p2m-btn { height: 54px; font-size: 16px; }
            .p2m-btn--outline { height: 52px; }
        }

        @media (max-width: 480px) {
            .p2m-login { padding: 12px; }
            .p2m-card { border-radius: 28px; }

            .p2m-brand { padding: calc(96 * var(--u)) 20px 0; }
            .p2m-brand__logo { width: clamp(120px, 38vw, 150px); }

            .p2m-panel { padding: 18px 20px 26px; }
            .p2m-eyebrow { font-size: 14px; }
            .p2m-title { margin: 6px 0 8px; font-size: 22px; }
            .p2m-sub { margin-bottom: 18px; font-size: 12.5px; line-height: 1.65; }
            .p2m-sub br { display: none; }

            .p2m-form { gap: 12px; }
            .p2m-input { height: 46px; gap: 12px; padding: 0 14px; border-radius: 10px; }
            .p2m-input svg { width: 18px; height: 18px; }
            .p2m-input input { font-size: 14px; }
            .p2m-eye { padding: 2px; }

            .p2m-row { gap: 8px; }
            .p2m-check { gap: 8px; font-size: 13px; }
            .p2m-check input { width: 20px; height: 20px; border-radius: 6px; background-size: 13px; }
            .p2m-forgot { font-size: 13px; }

            .p2m-btn { height: 46px; gap: 10px; border-radius: 10px; font-size: 14px; }
            .p2m-btn--outline { height: 44px; }
            .p2m-btn svg { width: 18px; height: 18px; }
        }

        @media (max-width: 360px) {
            .p2m-login { padding: 8px; }
            .p2m-panel { padding-right: 16px; padding-left: 16px; }
            .p2m-title { font-size: 20px; }
            .p2m-row { flex-wrap: wrap; }
        }

        @media (prefers-reduced-motion: reduce) {
            .p2m-login * { transition: none !important; }
        }
    </style>

    <div class="p2m-login">
        <div class="p2m-card">

            {{-- dekorasi --}}
            <span class="p2m-deco p2m-deco--tl-b" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--tl-a" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--tr-a" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--tr-b" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--dots" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--ring" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--bl" aria-hidden="true"></span>
            <span class="p2m-deco p2m-deco--line" aria-hidden="true"></span>

            {{-- kiri: logo & tagline --}}
            <section class="p2m-brand">
                <div class="p2m-brand__inner">
                    @if ($logoSrc)
                        <img src="{{ $logoSrc }}" alt="Logo {{ $siteName }}" class="p2m-brand__logo">
                    @else
                        <p class="p2m-brand__name">{{ $siteName }}</p>
                    @endif

                    <span class="p2m-brand__line"></span>
                    <p class="p2m-brand__tagline">
                        Mengawal Mutu Vokasi,<br>
                        Membangun Generasi Berprestasi<br>
                        dan Berakhlak
                    </p>
                </div>
            </section>

            {{-- kanan: form --}}
            <section class="p2m-panel">
                <div class="p2m-panel__inner">
                    <p class="p2m-eyebrow">{{ $siteName }}</p>
                    <h1 class="p2m-title">Masuk ke akun Anda</h1>
                    <p class="p2m-sub">
                        Silakan masuk untuk mengakses sistem<br>
                        Pusat Penjamin Mutu Politeknik Balekambang.
                    </p>

                    <form wire:submit="authenticate" class="p2m-form" novalidate>
                        {{-- Email --}}
                        <div>
                            <label class="p2m-input @error('data.email') is-invalid @enderror">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="3" y="5" width="18" height="14" rx="1.5"/>
                                    <path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>
                                </svg>
                                <input
                                    type="email"
                                    wire:model="data.email"
                                    placeholder="Email"
                                    autocomplete="username"
                                    aria-label="Email"
                                    required
                                    autofocus
                                >
                            </label>
                            @error('data.email')
                                <p class="p2m-error">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Password --}}
                        <div x-data="{ show: false }">
                            <label class="p2m-input @error('data.password') is-invalid @enderror">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="4.5" y="10.5" width="15" height="10" rx="2"/>
                                    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>
                                    <circle cx="12" cy="15.5" r=".8" fill="currentColor"/>
                                </svg>
                                <input
                                    :type="show ? 'text' : 'password'"
                                    type="password"
                                    wire:model="data.password"
                                    placeholder="Kata sandi"
                                    autocomplete="current-password"
                                    aria-label="Kata sandi"
                                    required
                                >
                                <button type="button" class="p2m-eye" x-on:click="show = !show"
                                        :aria-label="show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'">
                                    <svg x-show="!show" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                    <svg x-show="show" x-cloak viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M4 4l16 16"/>
                                    </svg>
                                </button>
                            </label>
                            @error('data.password')
                                <p class="p2m-error">{{ $message }}</p>
                            @enderror
                        </div>

                        {{-- Ingat saya & lupa sandi --}}
                        <div class="p2m-row">
                            <label class="p2m-check">
                                <input type="checkbox" wire:model="data.remember">
                                Ingat saya
                            </label>

                            @if (filament()->hasPasswordReset())
                                <a href="{{ filament()->getRequestPasswordResetUrl() }}" class="p2m-forgot">
                                    Lupa kata sandi?
                                </a>
                            @endif
                        </div>

                        {{-- Tombol --}}
                        <button type="submit" class="p2m-btn p2m-btn--primary" wire:loading.attr="disabled" wire:target="authenticate">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>
                                <path d="M3 12h11M10 8l4 4-4 4"/>
                            </svg>
                            Masuk
                        </button>

                        <a href="{{ url('/') }}" class="p2m-btn p2m-btn--outline">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20 12H4M10 6l-6 6 6 6"/>
                            </svg>
                            Kembali ke Beranda
                        </a>
                    </form>
                </div>
            </section>
        </div>
    </div>
</x-filament-panels::page.simple>