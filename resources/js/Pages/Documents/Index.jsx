import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

export default function Dokumen({ documents }) {
    return (
        <PublicLayout>

            <Head title="Dokumen Mutu" />

            <div className="max-w-7xl mx-auto px-4 py-16">

                <h1 className="text-4xl font-bold mb-8">
                    Dokumen Mutu
                </h1>

                <div className="space-y-4">

                    {documents.map((doc) => (

                        <div
                            key={doc.id}
                            className="bg-white border rounded-xl p-5 flex justify-between items-center"
                        >
                            <div>

                                <h2 className="font-semibold">
                                    {doc.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {doc.category} • {doc.year}
                                </p>

                            </div>

                            <a
                                href={`/storage/${doc.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                            >
                                Download
                            </a>

                        </div>

                    ))}

                </div>

            </div>

        </PublicLayout>
    );
}