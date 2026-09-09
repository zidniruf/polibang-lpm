import { usePage } from "@inertiajs/react";
import SocialIcons from "@/Components/SocialIcons";

export default function Footer() {
    const { setting } = usePage().props;

    return (
        <footer className="bg-slate-950 text-white">

            <div className="max-w-7xl mx-auto px-4 py-12">

                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-10
                    "
                >

                    {/* Logo */}

                    <div>

                        <div className="flex items-center gap-3">

                            {setting?.logo && (

                                <img
                                    src={`/storage/${setting.logo}`}
                                    alt={setting.site_name}
                                    className="w-12 h-12 object-contain"
                                />

                            )}

                            <div>

                                <h3 className="font-bold text-lg">
                                    {setting?.site_name}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Pusat Penjaminan Mutu
                                </p>

                            </div>

                        </div>

                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                            {setting?.address}
                        </p>

                    </div>

                    {/* Kontak */}

                    <div>

                        <h4 className="font-semibold mb-4">
                            Kontak
                        </h4>

                        <div className="space-y-2 text-sm text-slate-400">

                            <p>
                                Email: {setting?.email}
                            </p>

                            <p>
                                Telepon: {setting?.phone}
                            </p>

                            <p>
                                WhatsApp: {setting?.whatsapp}
                            </p>

                        </div>

                    </div>

                    {/* Menu Cepat */}

                    <div>

                        <h4 className="font-semibold mb-4">
                            Menu Cepat
                        </h4>

                        <div className="space-y-2">

                            <a
                                href="/"
                                className="block text-slate-400 hover:text-white"
                            >
                                Beranda
                            </a>

                            <a
                                href="/berita"
                                className="block text-slate-400 hover:text-white"
                            >
                                Berita
                            </a>

                            <a
                                href="/dokumen"
                                className="block text-slate-400 hover:text-white"
                            >
                                Dokumen
                            </a>

                            <a
                                href="/galeri"
                                className="block text-slate-400 hover:text-white"
                            >
                                Galeri
                            </a>

                        </div>

                    </div>

                    {/* Sosial Media */}

                    <div>

                        <h4 className="font-semibold mb-4">
                            Media Sosial
                        </h4>

                        <SocialIcons setting={setting} variant="labeled" />

                    </div>

                </div>

                {/* Bottom */}

                <div
                    className="
                        border-t
                        border-slate-800
                        mt-10
                        pt-6
                        text-center
                        text-sm
                        text-slate-500
                    "
                >
                    © {new Date().getFullYear()} {setting?.site_name}.
                    Semua Hak Dilindungi.
                </div>

            </div>

        </footer>
    );
}