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

    const parallaxRef = useRef(null);

    const [device, setDevice] = useState("desktop");

    /*
    |--------------------------------------------------------------------------
    | Deteksi perangkat
    |--------------------------------------------------------------------------
    |
    | mobile  : < 640px
    | tablet  : 640px - 1023px
    | desktop : >= 1024px
    |
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
            minHeight: "500px",

            // Gambar lebih ke tengah agar kedua mahasiswa tetap terlihat
            objectPosition: "71% center",

            overlay:
                "linear-gradient(to bottom, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.35) 38%, rgba(15,23,42,0.08) 65%, rgba(15,23,42,0.25) 100%)",
        },

        tablet: {
            height: "76vh",
            minHeight: "520px",

            // Tablet jangan menggunakan 92%
            objectPosition: "68% center",

            overlay:
                "linear-gradient(to right, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.45) 38%, rgba(15,23,42,0.12) 70%, rgba(15,23,42,0.05) 100%)",
        },

        desktop: {
            height: "82vh",
            minHeight: "560px",

            // Desktop bisa sedikit lebih ke kanan
            objectPosition: "78% center",

            overlay:
                "linear-gradient(to right, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.52) 34%, rgba(15,23,42,0.16) 62%, rgba(15,23,42,0.03) 100%)",
        },
    };

    const config = heroConfig[device];

    /*
    |--------------------------------------------------------------------------
    | Parallax
    |--------------------------------------------------------------------------
    |
    | Parallax hanya aktif pada desktop.
    | Tablet dan smartphone dibuat lebih stabil.
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

                    .hero-title {
                        animation: fadeSlideUp 0.7s ease both 0.15s;
                    }

                    .hero-sub {
                        animation: fadeSlideUp 0.7s ease both 0.35s;
                    }

                    .hero-btns {
                        animation: fadeSlideUp 0.7s ease both 0.5s;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .hero-title,
                        .hero-sub,
                        .hero-btns {
                            animation: none;
                        }
                    }
                `,
            }}
        />

        <style
    dangerouslySetInnerHTML={{
        __html: `
            @media (min-width: 640px) and (max-width: 1023px) {
                .hero-title {
                    font-size: 2.25rem;
                }

                .hero-sub {
                    font-size: 1.125rem;
                }

                .hero-btns a {
                    font-size: 1rem;
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
    className={`
        relative z-20 h-full
        flex
        ${
            device === "mobile"
                ? "items-start"
                : device === "tablet"
                    ? "items-start"
                    : "items-center"
        }
    `}
>
                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">

<div
    className={`
        max-w-xs
        sm:max-w-lg
        lg:max-w-xl
        xl:max-w-2xl

        ${
            device === "mobile"
                ? "pt-10"
                : device === "tablet"
                    ? "pt-20"
                    : ""
        }
    `}
>

                        {/* TITLE */}
<h1
    className="
        hero-title
        text-2xl
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        xl:text-6xl
        font-bold
        leading-[1.12]
        tracking-tight
        text-white
    "
>
                            {setting?.hero_title ||
                                "Sistem Penjaminan Mutu Internal Politeknik Balekambang"}
                        </h1>

                        {/* SUBTITLE */}
                        <p
                            className="
hero-sub
mt-4
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
{device !== "mobile" && (
    <div
        className="
            hero-btns
            mt-6
            flex
            flex-row
            gap-3
        "
    >
        <a
            href="/dokumen"
            className="
                px-5
                py-3
                bg-green-600
                hover:bg-green-700
                rounded-xl
                text-sm
                font-medium
                transition
                text-center
                text-white
                shadow-lg
            "
        >
            Dokumen Mutu
        </a>

        <a
            href="/berita"
            className="
                px-5
                py-3
                border
                border-white/60
                bg-white/10
                hover:bg-white/20
                rounded-xl
                text-sm
                font-medium
                transition
                text-center
                text-white
                backdrop-blur-sm
                shadow-lg
            "
        >
            Berita Terbaru
        </a>
    </div>
)}

                    </div>
                </div>
            </div>
        </section>
    </>
);
}