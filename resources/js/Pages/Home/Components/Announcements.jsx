import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Announcements({
    announcements = [],
}) {
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Animasi muncul saat elemen masuk ke layar (scroll reveal)
    |--------------------------------------------------------------------------
    |
    | Header muncul lebih dulu, lalu tiap item pengumuman muncul
    | berurutan (staggered) mengikuti urutan datanya.
    |
    */
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes annHeaderIn {
                            from {
                                opacity: 0;
                                transform: translateY(14px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes annItemIn {
                            from {
                                opacity: 0;
                                transform: translateX(-14px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }

                        .ann-card {
                            transition: box-shadow 0.3s ease;
                        }

                        .ann-card:hover {
                            box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12);
                        }

                        .ann-header {
                            opacity: 0;
                        }

                        .ann-header.is-visible {
                            animation: annHeaderIn 0.5s ease both;
                        }

                        .ann-item {
                            opacity: 0;
                        }

                        .ann-item.is-visible {
                            animation: annItemIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .ann-item {
                            position: relative;
                            transition: padding-left 0.25s ease;
                        }

                        .ann-item::before {
                            content: "";
                            position: absolute;
                            left: -12px;
                            top: 2px;
                            width: 4px;
                            height: 0;
                            border-radius: 9999px;
                            background: rgb(37, 99, 235);
                            transition: height 0.25s ease;
                        }

                        .ann-item:hover {
                            padding-left: 8px;
                        }

                        .ann-item:hover::before {
                            height: calc(100% - 16px);
                        }

                        .ann-see-all {
                            display: inline-block;
                            transition: transform 0.2s ease;
                        }

                        .ann-see-all:hover {
                            transform: translateX(3px);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .ann-header,
                            .ann-item,
                            .ann-item::before,
                            .ann-item:hover,
                            .ann-card,
                            .ann-see-all {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    `,
                }}
            />

            <div
                ref={containerRef}
                className="
                    ann-card
                    bg-white
                    border
                    rounded-2xl
                    p-6
                    h-full
                "
            >
                <div className={`ann-header ${visible ? "is-visible" : ""} flex items-center justify-between mb-6`}>

                    <h3 className="text-xl font-bold">
                        Pengumuman
                    </h3>

                    <Link
                        href="/pengumuman"
                        className="ann-see-all text-blue-600 text-sm"
                    >
                        Semua →
                    </Link>

                </div>

                <div className="space-y-4">

                    {announcements.length > 0 ? (

                        announcements.map((item, index) => (

                            <Link
                                key={item.id}
                                href={`/pengumuman/${item.slug}`}
                                className={`
                                    ann-item
                                    ${visible ? "is-visible" : ""}
                                    block
                                    border-b
                                    pb-4
                                    hover:text-blue-600
                                `}
                                style={{
                                    animationDelay: visible ? `${index * 0.08}s` : "0s",
                                }}
                            >

                                <div className="text-xs text-gray-500 mb-1">
                                    {new Date(
                                        item.published_at
                                    ).toLocaleDateString("id-ID")}
                                </div>

                                <div className="font-medium line-clamp-2">
                                    {item.title}
                                </div>

                            </Link>

                        ))

                    ) : (

                        <p className="text-gray-500">
                            Belum ada pengumuman.
                        </p>

                    )}

                </div>

            </div>
        </>
    );
}