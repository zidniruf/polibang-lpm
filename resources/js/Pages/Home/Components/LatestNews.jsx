import { Link } from "@inertiajs/react";

export default function LatestNews({ news = [] }) {
    return (
        <div>

            <div>

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Berita Terbaru
                    </h2>

                    <Link
                        href="/berita"
                        className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
                    >
                        Lihat Semua →
                    </Link>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-6">

                    {news.map((item) => (

                        <Link
                            key={item.id}
                            href={`/berita/${item.slug}`}
                            className="
                                block
                                bg-white
                                border
                                rounded-xl
                                sm:rounded-2xl
                                overflow-hidden
                                hover:shadow-xl
                                transition
                                duration-300
                            "
                        >

                            <div className="h-28 sm:h-52 bg-slate-200">

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

                                <span className="inline-block mt-2 sm:mt-4 text-blue-600 font-medium text-xs sm:text-base">
                                    Baca Selengkapnya →
                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>
        </div>
    );
}