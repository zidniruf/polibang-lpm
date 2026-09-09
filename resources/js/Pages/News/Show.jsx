import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Show({ news }) {
    return (
        <PublicLayout>

            <Head title={news.title} />

            <article className="max-w-4xl mx-auto px-4 py-16">

                <div className="mt-6">

                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                        Berita P2M
                    </p>

                    <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-tight">
                        {news.title}
                    </h1>

                    <p className="mt-4 text-gray-500">
                        {new Date(news.published_at).toLocaleDateString(
                            "id-ID",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>

                </div>

                {news.thumbnail && (
                    <div className="mt-10">
                        <img
                            src={`/storage/${news.thumbnail}`}
                            alt={news.title}
                            className="w-full rounded-2xl shadow-lg"
                        />
                    </div>
                )}

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