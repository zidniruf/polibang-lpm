const menus = [
    {
        title: "Dokumen",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        link: "/dokumen",
        desc: "Dokumen mutu",
    },
    {
        title: "Berita",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
        ),
        link: "/berita",
        desc: "Berita terbaru",
    },
    {
        title: "Pengumuman",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
        ),
        link: "/pengumuman",
        desc: "Info terbaru",
    },
    {
        title: "Galeri",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
        link: "/galeri",
        desc: "Dokumentasi kegiatan",
    },
];

export default function QuickAccess() {
    return (
        <section className="py-10 lg:py-16">
            <div className="max-w-7xl mx-auto px-4">


                {/* Grid langsung di-set menjadi 2 kolom di mobile dan 4 kolom di desktop */}
                <div className="bg-gray-100 rounded-3xl lg:rounded-full p-6 sm:p-8 lg:px-10 lg:py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                    
                    {menus.map((menu) => (
                        <a
                            key={menu.title}
                            href={menu.link}
                            className="
                                flex flex-col lg:flex-row 
                                items-center lg:items-center 
                                text-center lg:text-left 
                                gap-3 sm:gap-4 group transition-transform lg:hover:-translate-y-1
                            "
                        >
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 group-hover:bg-gray-400 group-hover:text-gray-900 transition-colors shadow-inner">
                                {menu.icon}
                            </div>

                            {/* Wrapper teks disesuaikan untuk rata tengah di mobile & kiri di desktop */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                    {menu.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-tight hidden sm:block lg:block">
                                    {menu.desc}
                                </p>
                            </div>
                        </a>
                    ))}

                </div>
            </div>
        </section>
    );
}