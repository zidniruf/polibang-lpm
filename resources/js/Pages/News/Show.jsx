import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

import PublicLayout from "@/Layouts/PublicLayout";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/
function getPlainText(html = "") {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();
}

/*
|--------------------------------------------------------------------------
| Share Button
|--------------------------------------------------------------------------
*/
function ShareButton({ title }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(window.location.href);
        }
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    /*
    |--------------------------------------------------------------------------
    | Copy Link
    |--------------------------------------------------------------------------
    */
    const copyLink = async () => {
        if (!url) return;

        try {
            await navigator.clipboard.writeText(url);
        } catch {
            const input = document.createElement("input");

            input.value = url;

            document.body.appendChild(input);

            input.select();

            document.execCommand("copy");

            document.body.removeChild(input);
        }

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    /*
    |--------------------------------------------------------------------------
    | Instagram
    |--------------------------------------------------------------------------
    */
    const shareInstagram = async () => {
        await copyLink();

        window.open(
            "https://www.instagram.com/",
            "_blank",
            "noopener,noreferrer"
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Social Media
    |--------------------------------------------------------------------------
    */
    const items = [
        {
            name: "WhatsApp",

            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,

            bg: "bg-[#25D366]",

            icon: (
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.46z" />
            ),

            fill: "white",
        },

        {
            name: "Instagram",

            onClick: shareInstagram,

            bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",

            icon: (
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            ),

            fill: "white",
        },

        {
            name: copied ? "Tersalin!" : "Salin Link",

            onClick: copyLink,

            bg: "bg-amber-200",

            stroke: "#92400e",

            icon: (
                <>
                    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />

                    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
                </>
            ),
        },

        {
            name: "Facebook",

            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

            bg: "bg-[#1877F2]",

            icon: (
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
            ),

            fill: "white",
        },

        {
            name: "X",

            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,

            bg: "bg-black",

            icon: (
                <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            ),

            fill: "white",
        },

        {
            name: "Telegram",

            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,

            bg: "bg-[#229ED9]",

            icon: (
                <path d="M11.94 0A12 12 0 1 0 24 12 12 12 0 0 0 11.94 0zm5.22 8.2-1.77 8.35c-.13.59-.48.73-.97.45l-2.7-1.99-1.3 1.25c-.14.14-.27.27-.55.27l.2-2.75 5-4.52c.22-.19-.05-.3-.34-.11l-6.18 3.89-2.66-.83c-.58-.18-.59-.58.12-.86l10.4-4c.48-.18.9.11.75.85z" />
            ),

            fill: "white",
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | Responsive size
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | Responsive size
    |--------------------------------------------------------------------------
    */
    const iconClass =
        "flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full shadow hover:scale-110 hover:shadow-lg";

    const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

    return (
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 flex flex-col items-center">
            {/* Main Share Button */}
            <div className="relative">
                {/* Social Media (absolute, tidak mempengaruhi layout) */}
                <div
                    className={`absolute bottom-full left-0 right-0 mb-2 md:mb-3 flex justify-center origin-bottom transition-all duration-300 ${ease} ${
                        open
                            ? "visible opacity-100 translate-y-0 scale-100"
                            : "invisible opacity-0 translate-y-3 scale-90 pointer-events-none"
                    }`}
                >
                    <div className="flex flex-col items-center gap-2 md:gap-3 rounded-full bg-white p-1.5 md:p-2 shadow-xl">
                        {items.map((item, index) => {
                            const svg = (
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 md:h-5 md:w-5"
                                    fill={item.fill || "none"}
                                    stroke={item.stroke || "none"}
                                    strokeWidth={item.stroke ? 2 : 0}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {item.icon}
                                </svg>
                            );

                            // Stagger: saat buka muncul dari bawah ke atas, saat tutup serentak
                            const itemStyle = {
                                transitionDelay: open
                                    ? `${(items.length - 1 - index) * 40}ms`
                                    : "0ms",
                            };

                            const itemClass = `${iconClass} ${item.bg} transition-all duration-300 ${ease} ${
                                open
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                            }`;

                            if (item.href) {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={item.name}
                                        aria-label={`Bagikan ke ${item.name}`}
                                        tabIndex={open ? 0 : -1}
                                        style={itemStyle}
                                        className={itemClass}
                                    >
                                        {svg}
                                    </a>
                                );
                            }

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={item.onClick}
                                    title={item.name}
                                    aria-label={item.name}
                                    tabIndex={open ? 0 : -1}
                                    style={itemStyle}
                                    className={itemClass}
                                >
                                    {svg}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tombol utama: ikon share <-> X dengan rotasi */}
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-label="Bagikan"
                    aria-expanded={open}
                    className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-200 active:scale-95"
                >
                    {/* Ikon share */}
                    <svg
                        viewBox="0 0 24 24"
                        className={`absolute h-5 w-5 md:h-6 md:w-6 transition-all duration-300 ${ease} ${
                            open
                                ? "opacity-0 rotate-90 scale-50"
                                : "opacity-100 rotate-0 scale-100"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                    </svg>

                    {/* Ikon close */}
                    <svg
                        viewBox="0 0 24 24"
                        className={`absolute h-5 w-5 transition-all duration-300 ${ease} ${
                            open
                                ? "opacity-100 rotate-0 scale-100"
                                : "opacity-0 -rotate-90 scale-50"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                {/* Copy notification */}
                <span
                    className={`pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white transition-all duration-300 ${
                        copied
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-2"
                    }`}
                >
                    Link tersalin!
                </span>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| News Detail
|--------------------------------------------------------------------------
*/
export default function Show({ news, share }) {
    const description =
        share?.description ||
        getPlainText(news.content || "").substring(0, 160) ||
        news.title;

    const imageUrl =
        share?.image ||
        (news.thumbnail && typeof window !== "undefined"
            ? `${window.location.origin}/storage/${news.thumbnail}`
            : null);

    const pageUrl =
        share?.url ||
        (typeof window !== "undefined" ? window.location.href : "");

    return (
        <PublicLayout>
            <Head title={news.title}>
                {/* Basic SEO */}
                <meta
                    name="description"
                    content={description}
                />

                {/* Open Graph */}
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={news.title}
                />

                <meta
                    head-key="og:description"
                    property="og:description"
                    content={description}
                />

                <meta
                    head-key="og:url"
                    property="og:url"
                    content={pageUrl}
                />

                <meta
                    head-key="og:type"
                    property="og:type"
                    content="article"
                />

                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content="P2M Polibang"
                />

                {imageUrl && (
                    <>
                        <meta
                            head-key="og:image"
                            property="og:image"
                            content={imageUrl}
                        />

                        <meta
                            head-key="og:image:alt"
                            property="og:image:alt"
                            content={news.title}
                        />

<meta
    head-key="og:image:type"
    property="og:image:type"
    content="image/jpeg"
/>
                    </>
                )}

                {/* Twitter / X */}
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />

                <meta
                    name="twitter:title"
                    content={news.title}
                />

                <meta
                    name="twitter:description"
                    content={description}
                />

                {imageUrl && (
                    <meta
                        name="twitter:image"
                        content={imageUrl}
                    />
                )}
            </Head>

            <article className="max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="mt-6">
                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                        Berita P2M
                    </p>

                    <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">
                        {news.title}
                    </h1>

                    <p className="mt-4 text-gray-500">
                        {new Date(
                            news.published_at
                        ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                {/* Thumbnail */}
                {news.thumbnail && (
                    <div className="mt-10">
                        <div className="relative">
                            <img
                                src={`/storage/${news.thumbnail}`}
                                alt={news.title}
                                className="w-full rounded-2xl shadow-lg"
                            />

                            <ShareButton
                                title={news.title}
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none mt-10"
                    dangerouslySetInnerHTML={{
                        __html: news.content,
                    }}
                />
            </article>
        </PublicLayout>
    );
}