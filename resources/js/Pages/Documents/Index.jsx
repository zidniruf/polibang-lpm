import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Download } from "lucide-react";

export default function Dokumen({ documents }) {
    /*
    |--------------------------------------------------------------------------
    | URL Dokumen
    |--------------------------------------------------------------------------
    */
    const getDocumentUrl = (doc) => {
        if (doc.type === "link") {
            return doc.link;
        }

        return `/storage/${doc.file}`;
    };

    return (
        <PublicLayout>
            <Head title="Dokumen Mutu" />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .doc-name {
                            transition: color 0.2s ease;
                        }

                        .doc-btn {
                            transition: background-color 0.2s ease, transform 0.15s ease;
                        }

                        .doc-btn:active {
                            transform: scale(0.94);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .doc-name,
                            .doc-btn {
                                transition: none !important;
                            }
                        }
                    `,
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Judul */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
                    Dokumen Mutu
                </h1>

                {/* Tabel */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 pr-3 text-xs font-medium uppercase tracking-wide text-gray-500 w-10 sm:w-16">
                                    No
                                </th>

                                <th className="py-3 pr-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Nama Dokumen
                                </th>

                                <th className="py-3 px-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-center w-16 sm:w-32">
                                    Tahun
                                </th>

                                <th className="py-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-right sm:text-center w-14 sm:w-56">
                                    Unduh
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {documents.length > 0 ? (
                                documents.map((doc, index) => {
                                    const documentUrl = getDocumentUrl(doc);
                                    const isFile = doc.type === "file";

                                    return (
                                        <tr
                                            key={doc.id}
                                            className="border-b border-gray-200"
                                        >
                                            {/* No */}
                                            <td className="py-4 pr-3 text-sm text-gray-500 align-middle">
                                                {index + 1}
                                            </td>

                                            {/* Nama Dokumen */}
                                            <td className="py-4 pr-3 align-middle">
                                                <a
                                                    href={documentUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="doc-name text-sm sm:text-base font-medium text-green-700 hover:text-green-900 break-words"
                                                    title="Buka dokumen"
                                                >
                                                    {doc.title}
                                                </a>
                                            </td>

                                            {/* Tahun */}
                                            <td className="py-4 px-3 text-sm text-gray-600 text-center align-middle whitespace-nowrap">
                                                {doc.year}
                                            </td>

                                            {/* Tombol Unduh */}
                                            <td className="py-3 align-middle text-right sm:text-center">
                                                <a
                                                    href={documentUrl}
                                                    {...(isFile
                                                        ? { download: true }
                                                        : {
                                                              target: "_blank",
                                                              rel: "noopener noreferrer",
                                                          })}
                                                    className="doc-btn inline-flex h-9 w-9 sm:h-10 sm:w-auto sm:gap-2 sm:px-5 items-center justify-center rounded-lg bg-green-600 text-sm font-medium sm:uppercase text-white whitespace-nowrap hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                                                    title={
                                                        isFile
                                                            ? "Unduh dokumen"
                                                            : "Buka dokumen"
                                                    }
                                                    aria-label={
                                                        isFile
                                                            ? `Unduh ${doc.title}`
                                                            : `Buka ${doc.title}`
                                                    }
                                                >
                                                    <Download size={18} />
                                                    <span className="hidden sm:inline">
                                                        Unduh Dokumen
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="py-10 text-center text-gray-500"
                                    >
                                        Belum ada dokumen tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PublicLayout>
    );
}