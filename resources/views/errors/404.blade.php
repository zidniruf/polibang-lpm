<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>404 — Halaman Tidak Ditemukan | P2M Polibang</title>

    <style>
        :root {
            --green: #087a3d;
            --green-dark: #075b32;
            --navy: #101c30;
            --muted: #8993a5;
        }

        * {
            box-sizing: border-box;
        }

        html, body {
            min-height: 100%;
            margin: 0;
        }

        body {
            font-family: Inter, ui-sans-serif, system-ui, -apple-system,
                BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--navy);
            background: #fff;
        }

        .error-page {
            position: relative;
            isolation: isolate;
            display: flex;
            min-height: 100vh;
            min-height: 100svh;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 48px 20px;
            background:
                radial-gradient(ellipse at 50% 35%,
                    rgba(255,255,255,.98) 0%,
                    rgba(255,255,255,.95) 36%,
                    rgba(255,255,255,.75) 66%,
                    rgba(255,255,255,.92) 100%),
                #f8fbfa;
        }

        .decoration {
            position: absolute;
            z-index: -1;
            pointer-events: none;
            user-select: none;
        }

        .decoration-left {
            top: 12%;
            left: -100px;
            width: 340px;
            height: 350px;
            border-radius: 45% 55% 65% 35%;
            transform: rotate(-28deg);
            background: linear-gradient(
                135deg,
                rgba(25, 151, 91, .18),
                rgba(139, 211, 174, .04)
            );
        }

        .decoration-left::after {
            position: absolute;
            content: "";
            inset: 28px;
            border-radius: inherit;
            border: 30px solid rgba(42, 160, 100, .07);
        }

        .decoration-right {
            right: -100px;
            bottom: -120px;
            width: 460px;
            height: 360px;
            border-radius: 50%;
            background: radial-gradient(
                ellipse,
                rgba(88, 191, 139, .16),
                rgba(88, 191, 139, 0) 70%
            );
        }

        .campus {
            position: absolute;
            top: 0;
            right: 0;
            z-index: -1;
            width: min(43vw, 620px);
            height: 340px;
            opacity: .07;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(100, 125, 110, .3)
            );
            clip-path: polygon(30% 35%, 100% 0, 100% 100%, 0 100%);
        }

        .content {
            width: 100%;
            max-width: 850px;
            text-align: center;
            transform: translateY(-12px);
        }

        .illustration {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(0px, 1vw, 16px);
            margin: 0 auto 14px;
        }

        .number {
            color: var(--green);
            font-size: clamp(110px, 18vw, 220px);
            font-weight: 900;
            line-height: .9;
            letter-spacing: -0.09em;
            text-shadow: 0 8px 0 rgba(0, 86, 42, .05);
        }

        .ghost {
            flex: 0 0 auto;
            width: clamp(100px, 17vw, 210px);
            margin: 0 -4px;
            filter: drop-shadow(0 12px 9px rgba(15, 70, 42, .09));
        }

        h1 {
            margin: 18px 0 12px;
            font-size: clamp(28px, 4vw, 44px);
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: -.035em;
        }

        .description {
            margin: 0 auto;
            max-width: 650px;
            color: var(--muted);
            font-size: clamp(14px, 1.5vw, 17px);
            line-height: 1.8;
            font-weight: 600;
        }

        .home-button {
            display: inline-flex;
            min-height: 48px;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
            padding: 13px 32px;
            border: 1px solid rgba(255,255,255,.2);
            border-radius: 11px;
            color: #fff;
            background: linear-gradient(135deg, #159653, #066b36);
            box-shadow: 0 5px 12px rgba(0, 105, 52, .15);
            font-size: 13px;
            font-weight: 750;
            text-decoration: none;
            transition: transform .2s ease, box-shadow .2s ease;
        }

        .home-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 9px 20px rgba(0, 105, 52, .22);
        }

        .home-button:focus-visible {
            outline: 3px solid #7dd9a5;
            outline-offset: 4px;
        }

        .home-button svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        @media (max-width: 600px) {
            .error-page {
                padding: 30px 18px;
            }

            .content {
                transform: translateY(-5px);
            }

            .illustration {
                gap: 0;
                margin-bottom: 22px;
            }

            .number {
                font-size: clamp(82px, 23vw, 135px);
            }

            .ghost {
                width: clamp(78px, 21vw, 125px);
            }

            h1 {
                margin-top: 14px;
                font-size: clamp(25px, 7vw, 32px);
            }

            .description {
                max-width: 360px;
                font-size: 14px;
            }

            .home-button {
                margin-top: 24px;
                padding-inline: 25px;
            }

            .decoration-left {
                top: 10%;
                left: -180px;
                opacity: .7;
            }

            .campus {
                width: 80vw;
                opacity: .04;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                scroll-behavior: auto !important;
                transition: none !important;
            }
        }
    </style>
</head>
<body>
    <main class="error-page">
        <div class="decoration decoration-left" aria-hidden="true"></div>
        <div class="decoration decoration-right" aria-hidden="true"></div>
        <div class="campus" aria-hidden="true"></div>

        <section class="content" aria-labelledby="error-title">
            <div class="illustration" aria-hidden="true">
                <span class="number">4</span>

                <svg class="ghost" viewBox="0 0 180 220" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="91" cy="201" rx="72" ry="10"
                        fill="#DCECE2"/>

                    <path d="M29 174V65C29 31 51 10 83 10
                        C114 10 137 33 137 65V174
                        L151 190L126 184L108 196L89 185
                        L69 197L50 185L29 174Z"
                        fill="#F9F7F6" stroke="#E7E8E5" stroke-width="2"/>

                    <path d="M102 12L136 45L111 45
                        C104 45 100 40 100 33L102 12Z"
                        fill="#E9E6E3"/>

                    <path d="M103 13L135 44"
                        stroke="#D9D7D4" stroke-width="2"/>

                    <ellipse cx="57" cy="91" rx="12" ry="7"
                        fill="#B7E5C6" opacity=".38"/>
                    <ellipse cx="111" cy="91" rx="12" ry="7"
                        fill="#B7E5C6" opacity=".38"/>

                    <ellipse cx="66" cy="83" rx="7" ry="11"
                        fill="#111827"/>
                    <ellipse cx="103" cy="83" rx="7" ry="11"
                        fill="#111827"/>

                    <path d="M79 149C73 138 64 135 59 139
                        C56 144 66 151 79 149Z"
                        fill="#16864B"/>

                    <path d="M79 149C76 134 81 124 87 125
                        C93 128 88 141 79 149Z"
                        fill="#209957"/>

                    <path d="M79 149C87 137 97 136 99 142
                        C99 148 88 152 79 149Z"
                        fill="#087A3D"/>

                    <path d="M79 149L80 165"
                        stroke="#087A3D" stroke-width="3"
                        stroke-linecap="round"/>

                    <path d="M37 25L32 14M52 18L51 5M65 24L73 14"
                        stroke="#087A3D" stroke-width="3.5"
                        stroke-linecap="round"/>
                </svg>

                <span class="number">4</span>
            </div>

            <h1 id="error-title">Halaman Tidak Ditemukan</h1>

            <p class="description">
                Maaf, halaman yang Anda cari mungkin telah dipindahkan
                atau tidak tersedia.
            </p>

            <a class="home-button" href="{{ url('/') }}">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z"/>
                </svg>
                Kembali ke Beranda
            </a>
        </section>
    </main>
</body>
</html>