import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AnnouncementPopup({ announcement = null }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!announcement) return;

        // Supaya popup tidak muncul berulang-ulang di hari yang sama
        const dismissedKey = `announcement_popup_dismissed_${announcement.id}`;
        const alreadyDismissed = sessionStorage.getItem(dismissedKey);

        if (!alreadyDismissed) {
            setOpen(true);
        }
    }, [announcement]);

    if (!announcement || !open) return null;

    const handleClose = () => {
        sessionStorage.setItem(
            `announcement_popup_dismissed_${announcement.id}`,
            "1"
        );
        setOpen(false);
    };

    return (
        <div
            className="
                fixed inset-0 z-50
                bg-black/50
                flex items-center justify-center
                p-4
            "
            onClick={handleClose}
        >
            <div
                className="
                    bg-white
                    rounded-2xl
                    max-w-lg w-full
                    p-6
                    relative
                "
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="
                        absolute top-4 right-4
                        text-gray-400 hover:text-gray-600
                    "
                    aria-label="Tutup"
                >
                    ✕
                </button>

                {announcement.image && (
                    <img
                        src={`/storage/${announcement.image}`}
                        alt={announcement.title}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                )}

                <div className="text-xs text-gray-500 mb-1">
                    Pengumuman
                </div>

                <h3 className="text-lg font-bold mb-2">
                    {announcement.title}
                </h3>

                <div
                    className="text-sm text-gray-600 mb-4 line-clamp-4"
                    dangerouslySetInnerHTML={{
                        __html: announcement.content,
                    }}
                />

                <Link
                    href={`/pengumuman/${announcement.slug}`}
                    className="
                        inline-block
                        bg-blue-600 text-white
                        text-sm font-medium
                        px-4 py-2 rounded-lg
                    "
                >
                    Lihat Selengkapnya
                </Link>
            </div>
        </div>
    );
}