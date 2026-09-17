import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";

export default function LatestNews({ news = [] }) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Animasi muncul saat elemen masuk ke layar (scroll reveal)
    |--------------------------------------------------------------------------
    |
    | Header (judul + "Lihat Semua") muncul dari bawah terlebih dahulu,
    | lalu kartu-kartu berita muncul satu per satu (staggered) mengikuti
    | urutan datanya.
    |
    */
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes newsHeaderIn {
                            from {
                                opacity: 0;
                                transform: translateY(16px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes newsCardIn {
                            from {
                                opacity: 0;
                                transform: translateY(28px) scale(0.97);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }

                        .news-header {
                            opacity: 0;
                        }

                        .news-header.is-visible {
                            animation: newsHeaderIn 0.6s ease both;
                        }

                        .news-card {
                            opacity: 0;
                        }

                        .news-card.is-visible {
                            animation: newsCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .news-card {
                            transition: transform 0.25s ease, box-shadow 0.25s ease;
                        }

                        .news-card:hover {
                            transform: translateY(-4px);
                        }

                        .news-card:active {
                            transform: scale(0.98);
                        }

                        .news-card-img {
                            overflow: hidden;
                        }

                        .news-card-img img {
                            transition: transform 0.5s ease;
                        }

                        .news-card:hover .news-card-img img {
                            transform: scale(1.06);
                        }

                        .news-card-cta {
                            transition: transform 0.2s ease, gap 0.2s ease;
                        }

                        .news-card:hover .news-card-cta {
                            transform: translateX(3px);
                        }

                        .news-see-all {
                            transition: transform 0.2s ease;
                            display: inline-block;
                        }

                        .news-see-all:hover {
                            transform: translateX(3px);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .news-header,
                            .news-card,
                            .news-card:hover,
                            .news-card:active,
                            .news-card-img img,
                            .news-card-cta,
                            .news-see-all {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    `,
                }}
            />

            <div ref={sectionRef}>

                <div>

                    <div className={`news-header ${visible ? "is-visible" : ""} flex items-center justify-between mb-8`}>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Berita Terbaru
                        </h2>

                        <Link
                            href="/berita"
                            className="news-see-all text-blue-600 hover:text-blue-700 text-sm sm:text-base"
                        >
                            Lihat Semua →
                        </Link>

                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6">

                        {news.map((item, index) => (

                            <Link
                                key={item.id}
                                href={`/berita/${item.slug}`}
                                className={`
                                    news-card
                                    ${visible ? "is-visible" : ""}
                                    block
                                    bg-white
                                    border
                                    rounded-xl
                                    sm:rounded-2xl
                                    overflow-hidden
                                    hover:shadow-xl
                                `}
                                style={{
                                    animationDelay: visible ? `${index * 0.1}s` : "0s",
                                }}
                            >

                                <div className="news-card-img h-28 sm:h-52 bg-slate-200">

                                    {item.thumbnail ? (

                                        <img
                                            src={`/storage/${item.thumbnail}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs sm:text-base text-center px-2">
                                            Tidak ada gambar
                                        </div>

                                    )}

                                </div>

                                <div className="p-3 sm:p-6">

                                    <p className="text-xs sm:text-sm text-gray-500">

                                        {new Date(
                                            item.published_at
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}

                                    </p>

                                    <h3 className="mt-2 sm:mt-3 text-sm sm:text-lg font-bold hover:text-blue-600 transition line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <p className="hidden sm:block mt-3 text-gray-600 line-clamp-3">
                                        {item.excerpt}
                                    </p>

                                    <span className="news-card-cta inline-block mt-2 sm:mt-4 text-blue-600 font-medium text-xs sm:text-base">
                                        Baca Selengkapnya →
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}