import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";

export default function Show({ announcement }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    const infoCards = [
        {
            icon: <CalendarIcon />,
            label: "Tanggal Mulai",
            value: formatDate(announcement.event_start_date),
        },
        {
            icon: <CalendarIcon />,
            label: "Tanggal Selesai",
            value: formatDate(announcement.event_end_date),
        },
        {
            icon: <PinIcon />,
            label: "Lokasi",
            value: announcement.location,
        },
        {
            icon: <UserIcon />,
            label: "Penyelenggara",
            value: announcement.organizer,
        },
    ];

    return (
        <>
            <Head title={announcement.title} />

            {/* Hero: gambar sebagai background + judul */}
            <div
                className="
                    relative
                    w-full
                    min-h-[220px]
                    sm:min-h-[280px]
                    lg:min-h-[340px]
                    flex items-end
                    overflow-hidden
                "
                style={{
                    backgroundImage: announcement.image
                        ? `url(/storage/${announcement.image})`
                        : undefined,
                    backgroundColor: "#0f172a",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* overlay gelap supaya teks terbaca */}
                <div
                    className={`
                        absolute inset-0 bg-black/50
                        transition-opacity duration-700 ease-out
                        ${mounted ? "opacity-100" : "opacity-0"}
                    `}
                />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 pt-16">

                    <button
                        onClick={() => {
                            if (window.history.length > 1) {
                                window.history.back();
                            } else {
                                window.location.href = "/pengumuman";
                            }
                        }}
                        className={`
                            group
                            inline-flex items-center gap-1
                            text-white/90 text-xs sm:text-sm
                            mb-3 sm:mb-4
                            hover:text-white
                            transition-all duration-500 ease-out
                            ${
                                mounted
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-1"
                            }
                        `}
                    >
                        <span className="transition-transform duration-200 group-hover:-translate-x-1">
                            ←
                        </span>
                        Kembali
                    </button>

                    <div
                        className={`
                            text-xs sm:text-sm text-white/80 mb-1 sm:mb-2
                            transition-all duration-500 ease-out delay-100
                            ${
                                mounted
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                            }
                        `}
                    >
                        {new Date(
                            announcement.published_at
                        ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>

                    <h1
                        className={`
                            text-2xl sm:text-3xl lg:text-4xl
                            font-bold text-white
                            leading-tight
                            transition-all duration-700 ease-out delay-150
                            ${
                                mounted
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-3"
                            }
                        `}
                    >
                        {announcement.title}
                    </h1>

                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* 4 kolom informasi */}
                <div
                    className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-3 sm:gap-4
                        mb-8 sm:mb-10
                    "
                >

                    {infoCards.map((card, index) => (
                        <InfoCard
                            key={card.label}
                            icon={card.icon}
                            label={card.label}
                            value={card.value}
                            mounted={mounted}
                            delay={200 + index * 90}
                        />
                    ))}

                </div>

                {/* Isi pengumuman */}
                <div
                    className={`
                        prose prose-sm sm:prose-base max-w-none
                        transition-all duration-700 ease-out
                        ${
                            mounted
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-3"
                        }
                    `}
                    style={{ transitionDelay: mounted ? "560ms" : "0ms" }}
                    dangerouslySetInnerHTML={{
                        __html: announcement.content,
                    }}
                />

            </div>
        </>
    );
}

function formatDate(value) {
    if (!value) return "-";

    return new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function InfoCard({ icon, label, value, mounted, delay }) {
    if (!value) return null;

    return (
        <div
            style={{ transitionDelay: mounted ? `${delay}ms` : "0ms" }}
            className={`
                bg-white
                border
                rounded-2xl
                p-4 sm:p-6
                text-center
                transition-all
                duration-500
                ease-out
                hover:shadow-md
                hover:-translate-y-0.5
                ${
                    mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                }
            `}
        >
            <div className="flex justify-center text-teal-600 mb-2">
                {icon}
            </div>

            <div className="font-semibold text-gray-700 text-sm sm:text-base mb-1">
                {label}
            </div>

            <div className="text-gray-800 text-sm sm:text-base">
                {value}
            </div>
        </div>
    );
}

function CalendarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}