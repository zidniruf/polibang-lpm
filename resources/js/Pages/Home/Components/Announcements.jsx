import { Link } from "@inertiajs/react";

export default function Announcements({
    announcements = [],
}) {
    return (
        <div
            className="
                bg-white
                border
                rounded-2xl
                p-6
                h-full
            "
        >
            <div className="flex items-center justify-between mb-6">

                <h3 className="text-xl font-bold">
                    Pengumuman
                </h3>

                <Link
                    href="/pengumuman"
                    className="text-blue-600 text-sm"
                >
                    Semua →
                </Link>

            </div>

            <div className="space-y-4">

                {announcements.length > 0 ? (

                    announcements.map((item) => (

                        <Link
                            key={item.id}
                            href={`/pengumuman/${item.slug}`}
                            className="
                                block
                                border-b
                                pb-4
                                hover:text-blue-600
                                transition
                            "
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
    );
}