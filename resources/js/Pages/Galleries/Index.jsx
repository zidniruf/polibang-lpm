import { useMemo, useState } from "react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Index({
    categories,
}) {
    const [selected, setSelected] = useState(null);

    const galleries = useMemo(
        () =>
            categories.flatMap((category) =>
                category.galleries.map((gallery) => ({
                    ...gallery,
                    categoryName: category.name,
                }))
            ),
        [categories]
    );

    return (
        <PublicLayout>

            <section className="py-10 sm:py-12 lg:py-16">

                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                        Galeri
                    </h1>

                    {galleries.length > 0 ? (

                        <div
                            className="
                                columns-3
                                md:columns-4
                                lg:columns-5
                                gap-3 sm:gap-4
                            "
                        >

                            {galleries.map((gallery) => (

                                <button
                                    key={gallery.id}
                                    onClick={() => setSelected(gallery)}
                                    className="
                                        block
                                        w-full
                                        mb-3 sm:mb-4
                                        break-inside-avoid
                                        rounded-xl
                                        overflow-hidden
                                        border
                                        bg-slate-100
                                        group
                                    "
                                >
                                    <img
                                        src={`/storage/${gallery.image}`}
                                        alt={
                                            gallery.title ||
                                            gallery.categoryName
                                        }
                                        className="
                                            w-full
                                            h-auto
                                            object-cover
                                            transition
                                            duration-300
                                            group-hover:scale-105
                                            group-hover:opacity-90
                                        "
                                        loading="lazy"
                                    />
                                </button>

                            ))}

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            Belum ada galeri.
                        </p>

                    )}

                </div>

            </section>

            {selected && (

                <div
                    className="
                        fixed inset-0 z-50
                        bg-black/70
                        flex items-center justify-center
                        p-4
                    "
                    onClick={() => setSelected(null)}
                >

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            max-w-2xl w-full
                            max-h-[90vh]
                            overflow-y-auto
                            relative
                        "
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={() => setSelected(null)}
                            className="
                                absolute top-3 right-3
                                z-10
                                bg-white/90
                                rounded-full
                                w-8 h-8
                                flex items-center justify-center
                                text-gray-600
                                hover:text-gray-900
                                shadow
                            "
                            aria-label="Tutup"
                        >
                            ✕
                        </button>

                        <img
                            src={`/storage/${selected.image}`}
                            alt={selected.title || ""}
                            className="w-full max-h-[60vh] object-contain bg-slate-100"
                        />

                        <div className="p-4 sm:p-6">

                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                                {selected.categoryName}
                            </p>

                            {selected.title && (
                                <h3 className="font-bold text-lg sm:text-xl mb-2">
                                    {selected.title}
                                </h3>
                            )}

                            {selected.description && (
                                <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
                                    {selected.description}
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </PublicLayout>
    );
}