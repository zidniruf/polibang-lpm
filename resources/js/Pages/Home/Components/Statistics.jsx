export default function Statistics({
    stats,
}) {
    const items = [
        {
            value: stats.documents,
            label: "Dokumen",
            color: "text-blue-600",
        },
        {
            value: stats.news,
            label: "Berita",
            color: "text-green-600",
        },
        {
            value: stats.galleries,
            label: "Galeri",
            color: "text-orange-600",
        },
        {
            value: stats.announcements,
            label: "Pengumuman",
            color: "text-purple-600",
        },
    ];

    return (
        <section className="bg-slate-50 py-20">

            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">

                    <h2 className="text-3xl font-bold">
                        Statistik Website
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Data terbaru dari sistem P2M
                    </p>

                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {items.map((item) => (

                        <div
                            key={item.label}
                            className="
                                bg-white
                                rounded-2xl
                                p-8
                                border
                                text-center
                                hover:shadow-lg
                                transition
                            "
                        >

                            <h3
                                className={`text-5xl font-bold ${item.color}`}
                            >
                                {item.value}
                            </h3>

                            <p className="mt-3 text-gray-600">
                                {item.label}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}