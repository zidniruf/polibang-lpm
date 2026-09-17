// resources/js/Pages/Home/Components/Hero.jsx

import { useEffect, useRef, useState } from "react";
import WoofyRevealDual from "@/Components/lightswind/WoofyRevealDual";

export default function Hero({ setting }) {
    const srcFront = setting?.hero_image_1
        ? `/storage/${setting.hero_image_1}`
        : "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80";

    const srcReveal = setting?.hero_image_2
        ? `/storage/${setting.hero_image_2}`
        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80";

    const headline = "Pusat Penjamin Mutu Politeknik Balekambang";

    const parallaxRef = useRef(null);

    const [device, setDevice] = useState("desktop");

    /*
    |--------------------------------------------------------------------------
    | Deteksi perangkat
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        const updateDevice = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setDevice("mobile");
            } else if (width < 1024) {
                setDevice("tablet");
            } else {
                setDevice("desktop");
            }
        };

        updateDevice();

        window.addEventListener("resize", updateDevice);

        return () => {
            window.removeEventListener("resize", updateDevice);
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi Hero berdasarkan ukuran layar
    |--------------------------------------------------------------------------
    */
    const heroConfig = {
        mobile: {
            height: "72vh",
            minHeight: "520px",
            objectPosition: "71% center",
            overlay:
                "linear-gradient(to bottom, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.35) 38%, rgba(15,23,42,0.08) 65%, rgba(15,23,42,0.25) 100%)",
        },

        tablet: {
            height: "76vh",
            minHeight: "520px",
            objectPosition: "68% center",
            overlay:
                "linear-gradient(to right, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.45) 38%, rgba(15,23,42,0.12) 70%, rgba(15,23,42,0.05) 100%)",
        },

        desktop: {
            height: "82vh",
            minHeight: "560px",
            objectPosition: "78% center",
            overlay:
                "linear-gradient(to right, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.52) 34%, rgba(15,23,42,0.16) 62%, rgba(15,23,42,0.03) 100%)",
        },
    };

    const config = heroConfig[device];

    /*
    |--------------------------------------------------------------------------
    | Parallax scroll (background)
    |--------------------------------------------------------------------------
    |
    | Parallax hanya aktif pada desktop.
    |
    */
    useEffect(() => {
        if (device !== "desktop") {
            if (parallaxRef.current) {
                parallaxRef.current.style.transform = "translate3d(0, 0, 0)";
            }

            return;
        }

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (parallaxRef.current) {
                        const offset = window.scrollY * 0.12;

                        parallaxRef.current.style.transform =
                            `translate3d(0, ${offset}px, 0)`;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [device]);

    /*
    |--------------------------------------------------------------------------
    | Animasi teks judul (kata per kata)
    |--------------------------------------------------------------------------
    |
    | Judul dipecah menjadi kata-kata, lalu tiap kata dianimasikan muncul
    | secara berurutan (staggered) lewat JS. Elemen lain (eyebrow, subjudul,
    | tombol) tetap pakai animasi CSS fadeSlideUp yang sudah ada.
    |
    */
    const titleText = setting?.hero_title || headline;
    const titleWords = titleText.split(" ");

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes fadeSlideUp {
                            from {
                                opacity: 0;
                                transform: translateY(28px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes wordUp {
                            from {
                                opacity: 0;
                                transform: translateY(100%);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .hero-eyebrow {
                            animation: fadeSlideUp 0.7s ease both 0.05s;
                        }

                        .hero-title-word-wrap {
                            display: inline-block;
                            overflow: hidden;
                            vertical-align: top;
                        }

                        .hero-title-word {
                            display: inline-block;
                            animation: wordUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .hero-sub {
                            animation: fadeSlideUp 0.7s ease both 0.35s;
                        }

                        .hero-btns {
                            animation: fadeSlideUp 0.7s ease both 0.5s;
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .hero-eyebrow,
                            .hero-title-word,
                            .hero-sub,
                            .hero-btns {
                                animation: none !important;
                            }
                        }
                    `,
                }}
            />

            <section
                className="relative overflow-hidden"
                style={{
                    height: config.height,
                    minHeight: config.minHeight,
                }}
            >

                {/* BACKGROUND */}
                <div
                    ref={parallaxRef}
                    className="absolute inset-0 z-0"
                    style={{
                        willChange: "transform",
                    }}
                >
                    <WoofyRevealDual
                        srcFront={srcFront}
                        srcReveal={srcReveal}
                        alt="Hero background"
                        width="100%"
                        height="100%"
                        maskRadius={0.30}
                        turbulenceIntensity={0.18}
                        animationSpeed={1.0}
                        appearDuration={0.4}
                        disappearDuration={0.3}
                        objectPosition={config.objectPosition}
                    />
                </div>

                {/* OVERLAY */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: config.overlay,
                    }}
                />

                {/* BOTTOM OVERLAY */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(2,20,32,0.42) 0%, rgba(2,20,32,0) 38%)",
                    }}
                />

                {/* CONTENT */}
                <div
                    className="
                        relative z-20 h-full
                        flex
                        items-start
                        lg:items-center
                    "
                >
                    <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 lg:px-8">

                        <div
                            className="
                                max-w-xs
                                sm:max-w-lg
                                lg:max-w-xl
                                xl:max-w-2xl

                                pt-10
                                sm:pt-16
                                md:pt-20
                                lg:pt-0
                            "
                        >

                            {/* EYEBROW LABEL */}
                            <div
                                className="
                                    hero-eyebrow
                                    inline-flex
                                    items-center
                                    gap-3
                                    mb-4
                                    sm:mb-5
                                "
                            >
                                <span className="w-8 sm:w-10 h-[3px] rounded-full bg-green-500 shrink-0" />
                                <span
                                    className="
                                        text-[11px]
                                        sm:text-xs
                                        md:text-sm
                                        font-semibold
                                        uppercase
                                        tracking-[0.25em]
                                        text-white
                                    "
                                >
                                    Pusat Penjaminan Mutu
                                </span>
                            </div>

                            {/* TITLE — animasi kata per kata */}
                            <h1
                                className="
                                    text-2xl
                                    sm:text-3xl
                                    md:text-4xl
                                    lg:text-5xl
                                    xl:text-6xl
                                    font-bold
                                    leading-[1.15]
                                    sm:leading-[1.12]
                                    tracking-tight
                                    text-white
                                "
                            >
                                {titleWords.map((word, i) => (
                                    <span key={i} className="hero-title-word-wrap mr-2 sm:mr-3">
                                        <span
                                            className="hero-title-word"
                                            style={{
                                                animationDelay: `${0.15 + i * 0.08}s`,
                                            }}
                                        >
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </h1>

                            {/* SUBTITLE */}
                            <p
                                className="
                                    hero-sub
                                    mt-3
                                    sm:mt-4
                                    text-sm
                                    sm:text-base
                                    lg:text-lg
                                    leading-relaxed
                                    text-slate-200/90
                                "
                            >
                                {setting?.hero_subtitle ||
                                    "Mendorong budaya mutu yang berkelanjutan melalui PPEPP, Audit Mutu Internal, dan peningkatan kualitas pendidikan."}
                            </p>

                            {/* BUTTONS */}
                            <div
                                className="
                                    hero-btns
                                    mt-5
                                    sm:mt-6
                                    flex
                                    flex-col
                                    sm:flex-row
                                    gap-2.5
                                    sm:gap-3
                                "
                            >
                                <a
                                    href="/dokumen"
                                    className="
                                        px-5
                                        py-3
                                        text-sm
                                        bg-green-600
                                        hover:bg-green-700
                                        rounded-xl
                                        font-medium
                                        transition
                                        text-center
                                        text-white
                                        shadow-lg
                                        w-fit
                                    "
                                >
                                    Dokumen Mutu
                                </a>

                                <a
                                    href="/berita"
                                    className="
                                        hidden
                                        sm:inline-flex
                                        px-5
                                        py-3
                                        text-sm
                                        border
                                        border-white/60
                                        bg-white/10
                                        hover:bg-white/20
                                        rounded-xl
                                        font-medium
                                        transition
                                        text-center
                                        text-white
                                        backdrop-blur-sm
                                        shadow-lg
                                        w-fit
                                    "
                                >
                                    Berita Terbaru
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}