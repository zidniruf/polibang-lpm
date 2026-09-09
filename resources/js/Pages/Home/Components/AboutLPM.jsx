export default function AboutLPM({ setting }) {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

                    {/* 1. Bagian Gambar */}
                    <div className="lg:col-span-2">
                        {setting?.about_image ? (
                            <img
                                src={`/storage/${setting.about_image}`}
                                alt={setting?.about_title || "Tentang P2M"}
                                className="w-full aspect-square lg:aspect-[4/5] rounded-[2rem] object-cover shadow-sm"
                            />
                        ) : (
                            <div className="w-full aspect-square lg:aspect-[4/5] rounded-[2rem] bg-gray-100 flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* 2. Bagian Konten Teks & Tombol */}
                    <div className="lg:col-span-3 flex flex-col justify-center">
                        <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {setting?.about_title || "Temukan Layanan Mutu Terbaik Kami"}
                        </h2>

                        <div
                            className="mt-6 text-base text-gray-500 leading-relaxed prose prose-sm max-w-none prose-p:m-0 prose-p:mb-4 last:prose-p:mb-0"
                            dangerouslySetInnerHTML={{
                                __html: setting?.about_content || "Kami mendukung setiap tahap proses penjaminan mutu, memastikan pengalaman yang mulus dan bebas stres dari awal hingga akhir."
                            }}
                        />

                        <div className="mt-8">
                            <a
                                href="/halaman/tentang-p2m"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Selengkapnya
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}