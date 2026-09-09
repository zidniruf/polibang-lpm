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
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();

    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
}, []);

useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
        if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
}, [isMobile]);

return (
    <>
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(28px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeSlideLeft {
                from { opacity: 0; transform: translateX(-20px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulseRing {
                0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.55); }
                70%  { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
                100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
            }
            @keyframes floatBadge {
                0%, 100% { transform: translateY(0px); }
                50%      { transform: translateY(-6px); }
            }
            .hero-badge  { animation: fadeSlideLeft 0.6s ease both 0.1s; }
            .hero-title  { animation: fadeSlideUp   0.7s ease both 0.25s; }
            .hero-sub    { animation: fadeSlideUp   0.7s ease both 0.45s; }
            .hero-btns   { animation: fadeSlideUp   0.7s ease both 0.62s; }
            .btn-primary { animation: pulseRing 2.4s ease-out 1.6s infinite; }
            .float-badge { animation: floatBadge 3.2s ease-in-out infinite; }
        `}} />

        <section
            className="relative overflow-hidden"
            style={{
                height: isMobile ? "70vh" : "88vh",
                minHeight: isMobile ? "460px" : "520px",
            }}
        >
            <div ref={parallaxRef} className="absolute inset-0 z-0" style={{ willChange: 'transform' }}>
                <WoofyRevealDual
                    srcFront            ={srcFront}
                    srcReveal           ={srcReveal}
                    alt                 ="Hero background"
                    width               ="100%"
                    height              ="100%"
                    maskRadius          ={0.30}
                    turbulenceIntensity ={0.22}
                    animationSpeed      ={1.0}
                    appearDuration      ={0.4}
                    disappearDuration   ={0.3}
                    objectPosition      ={isMobile ? "70% 25%" : "92% center"}
                />
            </div>

            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: isMobile
                        ? "linear-gradient(to bottom, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.55) 30%, rgba(15,23,42,0.2) 55%, rgba(15,23,42,0.0) 75%)"
                        : "linear-gradient(to right, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.55) 35%, rgba(15,23,42,0.15) 60%, rgba(15,23,42,0.0) 100%)",
                }}
            />
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.40) 0%, transparent 40%)" }} />

            <div className="relative z-20 h-full flex items-start sm:items-center">
                <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 pt-10 sm:pt-0">
                    <div className="max-w-xs sm:max-w-xl">


                        <h1 className="hero-title mt-4 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] text-white">
                            {setting?.hero_title || "Sistem Penjaminan Mutu Internal Politeknik Balekambang"}
                        </h1>

                        <p className="hero-sub mt-4 text-slate-200/90 text-base sm:text-lg leading-relaxed">
                            {setting?.hero_subtitle || "Mendorong budaya mutu yang berkelanjutan melalui PPEPP, Audit Mutu Internal, dan peningkatan kualitas pendidikan."}
                        </p>

                        <div className="hero-btns mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-row">
                            <a href="/dokumen" className="btn-primary px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition text-center text-white shadow-lg">
                                Dokumen Mutu
                            </a>
                            <a href="/berita" className="px-4 py-2.5 border border-white/60 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition text-center text-white backdrop-blur-sm shadow-lg">
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