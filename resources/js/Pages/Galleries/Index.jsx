import { useEffect, useMemo, useRef, useState } from "react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Index({
    categories,
}) {
    const [selected, setSelected] = useState(null);
    const [visibleIds, setVisibleIds] = useState(() => new Set());
    const itemRefs = useRef({});

    const galleries = useMemo(
        () =>
            categories.flatMap((category) =>
                category.galleries.map((gallery) => ({
                    ...gallery,
                    categoryName: category.name,
                }))
            ),
        [categories]
    );

    const selectedIndex = useMemo(
        () => (selected ? galleries.findIndex((g) => g.id === selected.id) : -1),
        [selected, galleries]
    );

    // Fade-in saat item masuk viewport (scroll reveal)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.dataset.galleryId;
                        setVisibleIds((prev) => {
                            if (prev.has(id)) return prev;
                            const next = new Set(prev);
                            next.add(id);
                            return next;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        Object.values(itemRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [galleries]);

    // Navigasi keyboard di lightbox: Esc, ArrowLeft, ArrowRight
    useEffect(() => {
        if (!selected) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelected(null);
            } else if (e.key === "ArrowRight") {
                setSelected(galleries[(selectedIndex + 1) % galleries.length]);
            } else if (e.key === "ArrowLeft") {
                setSelected(
                    galleries[
                        (selectedIndex - 1 + galleries.length) % galleries.length
                    ]
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selected, selectedIndex, galleries]);

    // Kunci scroll body saat lightbox terbuka
    useEffect(() => {
        document.body.style.overflow = selected ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selected]);

    const showPrev = () =>
        setSelected(
            galleries[(selectedIndex - 1 + galleries.length) % galleries.length]
        );
    const showNext = () =>
        setSelected(galleries[(selectedIndex + 1) % galleries.length]);

    return (
        <PublicLayout>

            <section className="py-10 sm:py-12 lg:py-16">

                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                        Galeri
                    </h1>

                    {galleries.length > 0 ? (

                        <div
                            className="
                                columns-3
                                md:columns-4
                                lg:columns-5
                                gap-3 sm:gap-4
                            "
                        >

                            {galleries.map((gallery, index) => {
                                const isVisible = visibleIds.has(
                                    String(gallery.id)
                                );

                                return (
                                    <button
                                        key={gallery.id}
                                        ref={(el) => {
                                            itemRefs.current[gallery.id] = el;
                                        }}
                                        data-gallery-id={gallery.id}
                                        onClick={() => setSelected(gallery)}
                                        style={{
                                            transitionDelay: isVisible
                                                ? `${(index % 10) * 60}ms`
                                                : "0ms",
                                        }}
                                        className={`
                                            block
                                            w-full
                                            mb-3 sm:mb-4
                                            break-inside-avoid
                                            rounded-xl
                                            overflow-hidden
                                            border
                                            bg-slate-100
                                            group
                                            transition-all
                                            duration-700
                                            ease-out
                                            ${
                                                isVisible
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-6"
                                            }
                                        `}
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={`/storage/${gallery.image}`}
                                                alt={
                                                    gallery.title ||
                                                    gallery.categoryName
                                                }
                                                className="
                                                    w-full
                                                    h-auto
                                                    object-cover
                                                    transition
                                                    duration-500
                                                    ease-out
                                                    group-hover:scale-110
                                                    group-hover:opacity-90
                                                "
                                                loading="lazy"
                                            />

                                            <div
                                                className="
                                                    absolute inset-0
                                                    bg-gradient-to-t
                                                    from-black/60
                                                    via-black/0
                                                    to-black/0
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition-opacity
                                                    duration-300
                                                    flex items-end
                                                    p-3
                                                "
                                            >
                                                {gallery.title && (
                                                    <span
                                                        className="
                                                            text-white
                                                            text-xs sm:text-sm
                                                            font-medium
                                                            translate-y-2
                                                            group-hover:translate-y-0
                                                            transition-transform
                                                            duration-300
                                                        "
                                                    >
                                                        {gallery.title}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            Belum ada galeri.
                        </p>

                    )}

                </div>

            </section>

            {selected && (

                <div
                    className="
                        fixed inset-0 z-[999]
                        bg-black/80
                        backdrop-blur-sm
                        flex items-center justify-center
                        p-3 sm:p-6
                        animate-[fadeIn_0.2s_ease-out]
                    "
                    onClick={() => setSelected(null)}
                >

                    <div
                        key={selected.id}
                        className="
                            bg-white
                            rounded-2xl
                            w-full
                            max-w-lg
                            max-h-full
                            flex flex-col
                            overflow-hidden
                            shadow-2xl
                            relative
                            animate-[scaleIn_0.25s_ease-out]
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="relative shrink-0 bg-black">

                            <img
                                src={`/storage/${selected.image}`}
                                alt={selected.title || ""}
                                className="
                                    w-full
                                    max-h-[38vh] sm:max-h-[50vh]
                                    object-contain
                                    bg-slate-100
                                    mx-auto
                                "
                            />

                            <button
                                onClick={() => setSelected(null)}
                                className="
                                    absolute top-2 right-2 sm:top-3 sm:right-3
                                    z-10
                                    bg-black/50
                                    backdrop-blur-sm
                                    rounded-full
                                    w-9 h-9
                                    flex items-center justify-center
                                    text-white
                                    hover:bg-black/70
                                    hover:rotate-90
                                    transition-all
                                    duration-200
                                "
                                aria-label="Tutup"
                            >
                                ✕
                            </button>

                            {galleries.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showPrev();
                                        }}
                                        className="
                                            absolute left-2 sm:left-3 top-1/2 -translate-y-1/2
                                            z-10
                                            bg-black/50
                                            backdrop-blur-sm
                                            rounded-full
                                            w-9 h-9
                                            flex items-center justify-center
                                            text-white
                                            hover:bg-black/70
                                            hover:scale-110
                                            transition
                                        "
                                        aria-label="Sebelumnya"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showNext();
                                        }}
                                        className="
                                            absolute right-2 sm:right-3 top-1/2 -translate-y-1/2
                                            z-10
                                            bg-black/50
                                            backdrop-blur-sm
                                            rounded-full
                                            w-9 h-9
                                            flex items-center justify-center
                                            text-white
                                            hover:bg-black/70
                                            hover:scale-110
                                            transition
                                        "
                                        aria-label="Berikutnya"
                                    >
                                        ›
                                    </button>
                                </>
                            )}

                        </div>

                        <div className="p-4 sm:p-6 overflow-y-auto">

                            <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                    {selected.categoryName}
                                </p>

                                {galleries.length > 1 && (
                                    <span className="shrink-0 text-xs text-gray-400">
                                        {selectedIndex + 1} / {galleries.length}
                                    </span>
                                )}
                            </div>

                            {selected.title && (
                                <h3 className="font-bold text-lg sm:text-xl mb-2">
                                    {selected.title}
                                </h3>
                            )}

                            {selected.description && (
                                <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
                                    {selected.description}
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>

        </PublicLayout>
    );
}