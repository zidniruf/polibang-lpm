<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="robots" content="noindex, nofollow">
    <title>404 — Halaman Tidak Ditemukan | P2M Polibang</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">

    <style>
        *, *::before, *::after { box-sizing: border-box; }

        html, body { height: 100%; }

        body {
            margin: 0;
            font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
            color: #0f1b2f;
            background: #fff;
            -webkit-font-smoothing: antialiased;
        }

        /* ===== Halaman ===== */
        .page {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            min-height: 100dvh;
            overflow: hidden;
            padding: 32px 20px;
            background:
                radial-gradient(ellipse 45% 55% at 0% 45%, #e6f3ec 0, transparent 70%),
                radial-gradient(ellipse 50% 45% at 100% 100%, #e3f3ea 0, transparent 70%),
                linear-gradient(180deg, #fbfdfc, #f6faf8);
        }

        /* ===== Dekorasi ===== */
        .deco { position: absolute; pointer-events: none; z-index: 0; }

        /* bentuk hijau di kiri */
        .deco-left {
            left: -17vw;
            top: 11%;
            width: 34vw;
            height: 34vw;
            max-width: 520px;
            max-height: 520px;
        }
        .deco-left::before,
        .deco-left::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9%;
            transform: rotate(45deg);
        }
        .deco-left::before {
            background: linear-gradient(135deg, #a9d8bd 0%, #d4ebdd 55%, #eef7f1 100%);
            opacity: .75;
        }
        .deco-left::after {
            inset: 9%;
            transform: translate(-6%, 4%) rotate(45deg);
            background: linear-gradient(135deg, #8ccaa6 0%, #cfe8d9 70%, #eaf5ee 100%);
            opacity: .55;
        }

        /* panel putih transparan di kiri atas */
        .deco-glass {
            left: -6vw;
            top: -6vh;
            width: 28vw;
            height: 30vh;
            border-radius: 40px;
            transform: rotate(-24deg);
            background: linear-gradient(135deg, #fff, rgba(255,255,255,.2));
            box-shadow: 0 10px 40px rgba(120,170,140,.12);
        }

        /* foto gedung kampus di kanan atas (opsional) */
        .deco-campus {
            right: -2vw;
            top: 4%;
            width: min(38vw, 600px);
            opacity: .38;
            filter: grayscale(.35) saturate(.7);
            -webkit-mask-image: linear-gradient(to left, #000 35%, transparent 100%),
                                linear-gradient(to bottom, #000 55%, transparent 100%);
            -webkit-mask-composite: source-in;
            mask-image: linear-gradient(to left, #000 35%, transparent 100%),
                        linear-gradient(to bottom, #000 55%, transparent 100%);
            mask-composite: intersect;
        }

        /* gundukan hijau di kanan bawah */
        .deco-hill {
            right: -12vw;
            bottom: -26vh;
            width: 52vw;
            height: 52vh;
            border-radius: 50%;
            background: linear-gradient(180deg, #cfe8d9, #e4f3ea);
            opacity: .7;
            filter: blur(2px);
        }

        /* ===== Konten ===== */
        .content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 760px;
            text-align: center;
        }

        .illustration {
            display: block;
            width: clamp(270px, 33vw, 540px);
            height: auto;
            margin: 0 auto;
            overflow: visible;
        }

        h1 {
            margin: clamp(2px, .6vw, 10px) 0 clamp(8px, 1vw, 14px);
            font-size: clamp(26px, 3vw, 46px);
            font-weight: 800;
            letter-spacing: -.02em;
            line-height: 1.2;
            color: #0f1b2f;
        }

        p {
            margin: 0 auto;
            max-width: 680px;
            color: #8e98aa;
            font-size: clamp(14px, 1.15vw, 18px);
            font-weight: 600;
            line-height: 1.7;
        }

        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-width: 236px;
            min-height: 48px;
            margin-top: clamp(22px, 2.4vw, 34px);
            padding: 12px 30px;
            border-radius: 10px;
            color: #fff;
            background: linear-gradient(135deg, #1b9a56, #087238);
            box-shadow: 0 6px 14px rgba(8, 114, 56, .22);
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: transform .2s ease, box-shadow .2s ease;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 22px rgba(8, 114, 56, .3);
        }
        .button:active { transform: translateY(0); }
        .button:focus-visible { outline: 3px solid #7dd9a5; outline-offset: 4px; }
        .button svg { width: 20px; height: 20px; fill: currentColor; flex: 0 0 auto; }

        /* ===== Tablet ===== */
        @media (max-width: 900px) {
            .illustration { width: clamp(280px, 56vw, 460px); }
            .deco-left { left: -24vw; width: 48vw; height: 48vw; }
            .deco-glass { width: 40vw; }
            .deco-campus { width: 52vw; opacity: .28; }
            .deco-hill { width: 80vw; right: -25vw; }
        }

        /* ===== Mobile ===== */
        @media (max-width: 600px) {
            .page { padding: 24px 18px; }
            .illustration { width: min(86vw, 340px); }
            h1 { font-size: clamp(24px, 7vw, 30px); margin-top: 6px; }
            p { max-width: 330px; font-size: 14px; line-height: 1.75; }
            .button { min-width: 0; width: min(100%, 250px); margin-top: 26px; }
            .deco-left { left: -40vw; top: 14%; width: 70vw; height: 70vw; }
            .deco-glass { display: none; }
            .deco-campus { top: 0; right: -14vw; width: 78vw; opacity: .16; }
            .deco-hill { width: 110vw; right: -35vw; bottom: -18vh; height: 36vh; }
        }

        /* layar sangat pendek (landscape HP) */
        @media (max-height: 480px) {
            .illustration { width: clamp(200px, 30vw, 300px); }
            h1 { font-size: 24px; }
            .button { margin-top: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition: none !important; }
        }
    </style>
</head>
<body>
<main class="page">

    <div class="deco deco-glass" aria-hidden="true"></div>
    <div class="deco deco-left" aria-hidden="true"></div>
    <div class="deco deco-hill" aria-hidden="true"></div>

    {{-- Opsional: simpan foto gedung di public/images/gedung-polibang.png
         Jika file belum ada, gambar otomatis disembunyikan. --}}
    <img class="deco deco-campus" src="{{ asset('images/gedung-polibang.png') }}"
         alt="" aria-hidden="true" onerror="this.style.display='none'">

    <section class="content" aria-labelledby="error-title">

        <svg class="illustration" viewBox="0 0 540 250" fill="none"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="404">
            <defs>
                <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1f9d5a"/>
                    <stop offset="1" stop-color="#06602f"/>
                </linearGradient>
                <linearGradient id="g4b" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                    <stop offset="1" stop-color="#000" stop-opacity=".12"/>
                </linearGradient>
                <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#17452b" flood-opacity=".14"/>
                </filter>
                <!-- angka 4 -->
                <path id="four" fill-rule="evenodd"
                      d="M70 38H126V136H159V166H126V220H70V166H4V138L70 38Z
                         M70 86L38 136H70V86Z"/>
            </defs>

            <!-- bayangan tanah -->
            <ellipse cx="285" cy="229" rx="124" ry="13" fill="#DCECE2"/>
            <ellipse cx="97" cy="223" rx="46" ry="5" fill="#DCECE2" opacity=".9"/>
            <ellipse cx="476" cy="223" rx="46" ry="5" fill="#DCECE2" opacity=".9"/>

            <!-- 4 kiri -->
            <use href="#four" fill="url(#g4)"/>
            <use href="#four" fill="url(#g4b)"/>
            <!-- 4 kanan -->
            <g transform="translate(375 0)">
                <use href="#four" fill="url(#g4)"/>
                <use href="#four" fill="url(#g4b)"/>
            </g>

            <!-- hantu kertas -->
            <g transform="translate(173 2) scale(1.2) rotate(-3 90 100)" filter="url(#soft)">
                <path d="M29 174V65C29 31 51 10 83 10C114 10 137 33 137 65V174L151 190L126 184L108 196L89 185L69 197L50 185L29 174Z"
                      fill="#F9F7F6" stroke="#E7E8E5" stroke-width="2"/>
                <path d="M102 12L136 45L111 45C104 45 100 40 100 33L102 12Z" fill="#E9E6E3"/>
                <path d="M103 13L135 44" stroke="#D9D7D4" stroke-width="2"/>
                <ellipse cx="57" cy="91" rx="12" ry="7" fill="#B7E5C6" opacity=".55"/>
                <ellipse cx="111" cy="91" rx="12" ry="7" fill="#B7E5C6" opacity=".55"/>
                <ellipse cx="66" cy="83" rx="7" ry="11" fill="#111827"/>
                <ellipse cx="103" cy="83" rx="7" ry="11" fill="#111827"/>
                <!-- tunas daun -->
                <path d="M79 149C73 138 64 135 59 139C56 144 66 151 79 149Z" fill="#16864B"/>
                <path d="M79 149C76 134 81 124 87 125C93 128 88 141 79 149Z" fill="#209957"/>
                <path d="M79 149C87 137 97 136 99 142C99 148 88 152 79 149Z" fill="#087A3D"/>
                <path d="M79 149L80 165" stroke="#087A3D" stroke-width="3" stroke-linecap="round"/>
                <!-- garis kilau -->
                <path d="M120 22L128 10M135 30L146 22M138 44L151 41"
                      stroke="#087A3D" stroke-width="3.5" stroke-linecap="round"/>
            </g>
        </svg>

        <h1 id="error-title">Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>

        <a class="button" href="{{ url('/') }}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z"/>
            </svg>
            Kembali ke Beranda
        </a>
    </section>
</main>
</body>
</html>