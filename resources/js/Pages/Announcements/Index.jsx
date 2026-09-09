import PublicLayout from "@/Layouts/PublicLayout";
import { Link } from "@inertiajs/react";

export default function Index({
    announcements,
}) {
    return (
        <PublicLayout>

            <section className="py-10 sm:py-12 lg:py-16">

                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                        Pengumuman
                    </h1>

                    {announcements.data.length > 0 ? (

                        <div
                            className="
                                grid
                                grid-cols-2
                                lg:grid-cols-3
                                gap-3 sm:gap-6
                            "
                        >

                            {announcements.data.map((item) => (

                                <Link
                                    key={item.id}
                                    href={`/pengumuman/${item.slug}`}
                                    className="
                                        group
                                        bg-white
                                        border
                                        rounded-2xl
                                        overflow-hidden
                                        flex flex-col
                                        transition
                                        hover:shadow-lg
                                        hover:-translate-y-1
                                        hover:border-blue-200
                                    "
                                >

                                    <div className="h-40 sm:h-48 w-full overflow-hidden bg-slate-100">

                                        {item.image ? (

                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="
                                                    h-full
                                                    w-full
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
                                                <MegaphoneIcon />
                                            </div>

                                        )}

                                    </div>

                                    <div className="p-4 sm:p-5 flex flex-col flex-1">

                                        <div className="text-xs text-gray-500 mb-2">
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
                                        </div>

                                        <h3
                                            className="
                                                font-bold text-base sm:text-lg
                                                line-clamp-2
                                                text-gray-800
                                                group-hover:text-blue-600
                                                transition
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <span
                                            className="
                                                mt-auto pt-4
                                                text-sm font-medium
                                                text-blue-600
                                                inline-flex items-center gap-1
                                            "
                                        >
                                            Baca selengkapnya
                                            <ArrowIcon />
                                        </span>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            Belum ada pengumuman.
                        </p>

                    )}

                    {announcements.links && announcements.links.length > 3 && (

                        <div className="flex flex-wrap gap-2 mt-8 sm:mt-10">

                            {announcements.links.map((link, index) => (

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

            </section>

        </PublicLayout>
    );
}

function ArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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

function MegaphoneIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 11 18-5v12L3 14v-3z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
    );
}