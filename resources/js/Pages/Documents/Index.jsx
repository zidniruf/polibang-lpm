import { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Download } from "lucide-react";

export default function Dokumen({ documents }) {
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Animasi muncul saat elemen masuk ke layar (scroll reveal)
    |--------------------------------------------------------------------------
    |
    | Judul halaman muncul lebih dulu, lalu tiap kartu dokumen muncul
    | berurutan (staggered) mengikuti urutan datanya.
    |
    */
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <PublicLayout>

            <Head title="Dokumen Mutu" />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes docTitleIn {
                            from {
                                opacity: 0;
                                transform: translateY(16px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes docCardIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .doc-title {
                            opacity: 0;
                        }

                        .doc-title.is-visible {
                            animation: docTitleIn 0.6s ease both;
                        }

                        .doc-card {
                            opacity: 0;
                        }

                        .doc-card.is-visible {
                            animation: docCardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .doc-card {
                            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                        }

                        .doc-card:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 10px 20px -8px rgba(0,0,0,0.12);
                            border-color: rgb(191 219 254);
                        }

                        .doc-btn {
                            transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
                        }

                        .doc-btn:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.4);
                        }

                        .doc-btn:active {
                            transform: translateY(0) scale(0.96);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .doc-title,
                            .doc-card,
                            .doc-card:hover,
                            .doc-btn,
                            .doc-btn:hover,
                            .doc-btn:active {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    `,
                }}
            />

            <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-16">

                <h1 className={`doc-title ${visible ? "is-visible" : ""} text-4xl font-bold mb-8`}>
                    Dokumen Mutu
                </h1>

                <div className="space-y-4">

                    {documents.map((doc, index) => (

                        <div
                            key={doc.id}
                            className={`doc-card ${visible ? "is-visible" : ""} bg-white border rounded-xl p-5 flex justify-between items-center`}
                            style={{
                                animationDelay: visible ? `${0.15 + index * 0.08}s` : "0s",
                            }}
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
                                href={doc.type === 'link' ? doc.link : `/storage/${doc.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={doc.type === 'file'}
                                className="doc-btn p-2 rounded-lg bg-blue-600 text-white sm:px-4 sm:py-2"
                            >
                                <span className="hidden sm:inline">Download</span>
                                <Download size={20} className="sm:hidden" />
                            </a>

                        </div>

                    ))}

                </div>

            </div>

        </PublicLayout>
    );
}