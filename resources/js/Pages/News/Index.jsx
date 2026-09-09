import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Berita({ news }) {
    return (
        <PublicLayout>

            <Head title="Berita" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-10">
                    Berita
                </h1>

                {news.data.length > 0 ? (

                    <div
                        className="
                            grid
                            grid-cols-2
                            lg:grid-cols-3
                            gap-3 sm:gap-6
                        "
                    >

                        {news.data.map((item) => (

                            <Link
                                key={item.id}
                                href={`/berita/${item.slug}`}
                                className="
                                    group
                                    border
                                    rounded-2xl
                                    overflow-hidden
                                    bg-white
                                    flex flex-col
                                    transition
                                    hover:shadow-lg
                                    hover:-translate-y-1
                                    hover:border-blue-200
                                "
                            >

                                <div className="h-32 sm:h-48 w-full overflow-hidden bg-slate-100">

                                    {item.thumbnail ? (

                                        <img
                                            src={`/storage/${item.thumbnail}`}
                                            alt={item.title}
                                            className="
                                                w-full h-full
                                                object-cover
                                                transition
                                                duration-300
                                                group-hover:scale-105
                                            "
                                        />

                                    ) : (

                                        <div
                                            className="
                                                h-full w-full
                                                flex items-center justify-center
                                                text-slate-300
                                            "
                                        >
                                            <NewsIcon />
                                        </div>

                                    )}

                                </div>

                                <div className="p-3 sm:p-5 flex flex-col flex-1">

                                    <p className="text-xs text-gray-500">
                                        {item.published_at
                                            ? new Date(
                                                  item.published_at
                                              ).toLocaleDateString(
                                                  "id-ID",
                                                  {
                                                      day: "numeric",
                                                      month: "long",
                                                      year: "numeric",
                                                  }
                                              )
                                            : ""}
                                    </p>

                                    <h2
                                        className="
                                            font-bold text-sm sm:text-lg
                                            mt-1 sm:mt-2
                                            line-clamp-2
                                            text-gray-800
                                            group-hover:text-blue-600
                                            transition
                                        "
                                    >
                                        {item.title}
                                    </h2>

                                    {item.excerpt && (
                                        <p
                                            className="
                                                mt-1 sm:mt-2
                                                text-xs sm:text-sm
                                                text-gray-600
                                                line-clamp-2
                                                hidden sm:block
                                            "
                                        >
                                            {item.excerpt}
                                        </p>
                                    )}

                                    <span
                                        className="
                                            mt-auto pt-3 sm:pt-4
                                            text-xs sm:text-sm font-medium
                                            text-blue-600
                                            inline-flex items-center gap-1
                                        "
                                    >
                                        Baca Selengkapnya
                                        <ArrowIcon />
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>

                ) : (

                    <p className="text-gray-500">
                        Belum ada berita.
                    </p>

                )}

                {news.links && news.links.length > 3 && (

                    <div className="flex flex-wrap gap-2 mt-8 sm:mt-10">

                        {news.links.map((link, index) => (

                            <Link
                                key={index}
                                href={link.url || "#"}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`
                                    px-3 py-1.5
                                    rounded-lg
                                    text-sm
                                    border
                                    ${
                                        link.active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }
                                    ${
                                        !link.url
                                            ? "pointer-events-none opacity-40"
                                            : ""
                                    }
                                `}
                            />

                        ))}

                    </div>

                )}

            </div>

        </PublicLayout>
    );
}

function ArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition group-hover:translate-x-1"
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

function NewsIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z" />
            <path d="M16 8h-8" />
            <path d="M16 12h-8" />
            <path d="M11 16H8" />
        </svg>
    );
}