// resources/js/Components/Navbar/Navbar.jsx

import { useState, useRef, useEffect, useCallback } from "react";
import { usePage, router } from "@inertiajs/react";
import { Search, ChevronDown, X, Menu, FileText, Newspaper, Megaphone, Image, BookOpen } from "lucide-react";
import SocialIcons from "@/Components/SocialIcons";

/* ── Label & ikon tiap kategori ── */
const CATEGORIES = [
    { key: "news",          label: "Berita",     icon: Newspaper,  urlFn: (i) => `/berita/${i.slug}`      },
    { key: "pages",         label: "Halaman",    icon: BookOpen,   urlFn: (i) => `/halaman/${i.slug}`     },
    { key: "documents",     label: "Dokumen",    icon: FileText,   urlFn: ()  => `/dokumen`               },
    { key: "announcements", label: "Pengumuman", icon: Megaphone,  urlFn: ()  => `/pengumuman`            },
    { key: "galleries",     label: "Galeri",     icon: Image,      urlFn: ()  => `/galeri`                },
];

/* ── Dropdown saran ketik ── */
function SuggestDropdown({ query, onSelect, onClose }) {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);

    /* Fetch dengan debounce 300 ms */
    useEffect(() => {
        if (!query || query.length < 2) { setData(null); return; }

        clearTimeout(timerRef.current);
        setLoading(true);

        timerRef.current = setTimeout(async () => {
            try {
                const res  = await fetch(`/search/suggest?q=${encodeURIComponent(query)}`);
                const json = await res.json();
                setData(json.results);
            } catch {
                setData(null);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timerRef.current);
    }, [query]);

    const hasResults = data && CATEGORIES.some(c => data[c.key]?.length > 0);

    if (!query || query.length < 2) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-[60] overflow-hidden">
            {loading && (
                <div className="px-4 py-3 text-sm text-gray-400">Mencari...</div>
            )}

            {!loading && !hasResults && (
                <div className="px-4 py-3 text-sm text-gray-400">
                    Tidak ada hasil untuk &ldquo;{query}&rdquo;
                </div>
            )}

            {!loading && hasResults && CATEGORIES.map(({ key, label, icon: Icon, urlFn }) => {
                const items = data[key] || [];
                if (!items.length) return null;
                return (
                    <div key={key}>
                        <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                            <Icon size={12} className="text-blue-500" />
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-500">
                                {label}
                            </span>
                        </div>
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onMouseDown={() => {
                                    onSelect(item.title);
                                    router.visit(urlFn(item));
                                    onClose();
                                }}
                                className="w-full text-left px-5 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                            >
                                <Search size={12} className="text-gray-300 flex-shrink-0" />
                                {item.title}
                            </button>
                        ))}
                    </div>
                );
            })}

            {/* Footer: lihat semua hasil */}
            {!loading && hasResults && (
                <div className="border-t border-gray-100 px-4 py-2.5">
                    <button
                        onMouseDown={() => {
                            router.visit(`/search?q=${encodeURIComponent(query)}`);
                            onClose();
                        }}
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Lihat semua hasil untuk &ldquo;{query}&rdquo; →
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const { setting, menuGroups = [], navigationLinks = [] } = usePage().props;

    const [searchOpen,     setSearchOpen]     = useState(false);
    const [searchQuery,    setSearchQuery]     = useState("");
    const [suggestOpen,    setSuggestOpen]     = useState(false);
    const [activeDropdown, setActiveDropdown]  = useState(null);
    const [mobileOpen,     setMobileOpen]      = useState(false);
    const [mobileExpanded, setMobileExpanded]  = useState(null);
    const searchInputRef    = useRef(null);
    const searchWrapperRef  = useRef(null);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [searchOpen]);

    /* Tutup dropdown desktop saat klik luar */
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest(".nav-dropdown-wrap")) setActiveDropdown(null);
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
                setSuggestOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    /* Cegah scroll saat mobile menu terbuka */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    /* Submit form search */
    const handleSearch = (e) => {
        e?.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;
        setSuggestOpen(false);
        setSearchOpen(false);
        router.visit(`/search?q=${encodeURIComponent(q)}`);
    };

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchQuery("");
        setSuggestOpen(false);
    };

    const logoSrc  = setting?.logo ? `/storage/${setting.logo}` : null;
    const siteName = setting?.site_name || "P2M Polibang";

    const allNavGroups = Array.isArray(menuGroups) ? menuGroups : [];
    const allNavLinks  = Array.isArray(navigationLinks) ? navigationLinks : [];

    return (
        <>
        <header className="sticky top-0 z-50 bg-white shadow-sm">

            {/* ════════════ DESKTOP (lg+) ════════════ */}
            <div className="hidden lg:block">

                {/* Baris atas */}
                <div className="border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="h-16 grid grid-cols-3 items-center">

                            {/* Kiri: ikon sosial */}
                            <SocialIcons setting={setting} />

                            {/* Tengah: logo + nama */}
                            <div className="flex justify-center">
                                <a href="/" className="flex items-center gap-3 group">
                                    {logoSrc ? (
                                        <img src={logoSrc} alt={siteName} className="h-9 w-9 object-contain" />
                                    ) : (
                                        <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            P2M
                                        </div>
                                    )}
                                    <span className="font-semibold text-lg text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors whitespace-nowrap">
                                        {siteName}
                                    </span>
                                </a>
                            </div>

                            {/* Kanan: search + autocomplete */}
                            <div className="flex justify-end" ref={searchWrapperRef}>
                                <div className="relative">
                                    {searchOpen ? (
                                        <form onSubmit={handleSearch}>
                                            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 shadow-sm">
                                                <input
                                                    ref={searchInputRef}
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={e => {
                                                        setSearchQuery(e.target.value);
                                                        setSuggestOpen(true);
                                                    }}
                                                    onFocus={() => setSuggestOpen(true)}
                                                    placeholder="Saya mencari..."
                                                    className="text-sm outline-none w-52 text-gray-700 placeholder-gray-400 bg-transparent"
                                                />
                                                <button type="submit" className="ml-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <Search size={15} />
                                                </button>
                                                <button type="button" onClick={closeSearch} className="ml-1 text-gray-300 hover:text-gray-500">
                                                    <X size={14} />
                                                </button>
                                            </div>

                                            {/* Dropdown saran */}
                                            {suggestOpen && (
                                                <SuggestDropdown
                                                    query={searchQuery}
                                                    onSelect={setSearchQuery}
                                                    onClose={closeSearch}
                                                />
                                            )}
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => setSearchOpen(true)}
                                            className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors"
                                        >
                                            <span>Saya mencari...</span>
                                            <Search size={15} />
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Baris bawah: navigasi */}
                <nav className="max-w-7xl mx-auto px-6" aria-label="Desktop navigation">
                    <div className="flex items-center justify-center h-11">

                        <NavLink href="/">Beranda</NavLink>

                        {allNavGroups.map((group) => (
                            <div key={group.id} className="relative h-full flex items-center nav-dropdown-wrap">
                                <button
                                    onClick={() => setActiveDropdown(p => p === group.id ? null : group.id)}
                                    className="px-4 h-full flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600"
                                >
                                    {group.name}
                                    <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === group.id ? "rotate-180" : ""}`} />
                                </button>
                                {activeDropdown === group.id && group.pages?.length > 0 && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[220px] overflow-hidden z-50 py-1">
                                        {group.pages.map((page) => (
                                            <a key={page.id} href={`/halaman/${page.slug}`}
                                                className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                                {page.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {allNavLinks.map((link) => (
                            <NavLink key={link.id} href={link.url} external>
                                {link.title}
                            </NavLink>
                        ))}

                    </div>
                </nav>

            </div>

            {/* ════════════ MOBILE (< lg) ════════════ */}
            <div className="lg:hidden">
                <div className="h-14 relative flex items-center justify-between px-4">

                    {/* Kiri: hamburger */}
                    <button
                        onClick={() => setMobileOpen(p => !p)}
                        className="p-2 -ml-2 text-gray-500 hover:text-blue-600 z-10"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    {/* Tengah: logo + nama */}
                    <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[60%]">
                        {logoSrc ? (
                            <img src={logoSrc} alt={siteName} className="h-8 w-8 object-contain flex-shrink-0" />
                        ) : (
                            <div className="h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                P2M
                            </div>
                        )}
                        <span className="font-semibold text-sm text-gray-800 leading-tight truncate">
                            {siteName}
                        </span>
                    </a>

                    {/* Kanan: search */}
                    <button
                        onClick={() => setSearchOpen(p => !p)}
                        className="p-2 -mr-2 text-gray-500 hover:text-blue-600 z-10"
                        aria-label="Cari"
                    >
                        <Search size={18} />
                    </button>

                </div>

                {/* Mobile search bar + autocomplete */}
                {searchOpen && (
                    <div className="px-4 pb-3 border-t border-gray-100">
                        <div className="relative mt-2" ref={searchWrapperRef}>
                            <form onSubmit={handleSearch} className="flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => {
                                        setSearchQuery(e.target.value);
                                        setSuggestOpen(true);
                                    }}
                                    onFocus={() => setSuggestOpen(true)}
                                    placeholder="Saya mencari..."
                                    className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                                />
                                {searchQuery && (
                                    <button type="button" onClick={() => { setSearchQuery(""); setSuggestOpen(false); }} className="text-gray-300 hover:text-gray-500 mr-1">
                                        <X size={14} />
                                    </button>
                                )}
                                <button type="submit" className="text-gray-400 hover:text-blue-600">
                                    <Search size={16} />
                                </button>
                            </form>

                            {/* Dropdown saran mobile */}
                            {suggestOpen && (
                                <SuggestDropdown
                                    query={searchQuery}
                                    onSelect={setSearchQuery}
                                    onClose={() => { setSuggestOpen(false); setSearchOpen(false); setSearchQuery(""); }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

        </header>

        {/* ════════════ MOBILE MENU OVERLAY ════════════ */}
        {mobileOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex flex-col" style={{ top: "56px" }}>

                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

                {/* Panel */}
                <div className="relative bg-white w-full max-h-[80vh] overflow-y-auto shadow-xl border-t border-gray-100">

                    <nav className="px-4 py-3" aria-label="Mobile navigation">

                        <a href="/" onClick={() => setMobileOpen(false)}
                            className="flex items-center h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600 border-b border-gray-50">
                            Beranda
                        </a>

                        {allNavGroups.map((group) => (
                            <div key={group.id} className="border-b border-gray-50">
                                <button
                                    onClick={() => setMobileExpanded(p => p === group.id ? null : group.id)}
                                    className="w-full flex items-center justify-between h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600"
                                >
                                    {group.name}
                                    <ChevronDown size={16} className={`transition-transform ${mobileExpanded === group.id ? "rotate-180" : ""}`} />
                                </button>
                                {mobileExpanded === group.id && group.pages?.length > 0 && (
                                    <div className="bg-gray-50 pb-2">
                                        {group.pages.map((page) => (
                                            <a key={page.id} href={`/halaman/${page.slug}`}
                                                onClick={() => setMobileOpen(false)}
                                                className="block px-6 py-2.5 text-sm text-gray-600 hover:text-blue-600">
                                                {page.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {allNavLinks.map((link) => (
                            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600 border-b border-gray-50">
                                {link.title}
                            </a>
                        ))}

                    </nav>

                    <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-4">
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Ikuti kami</span>
                        <SocialIcons setting={setting} />
                    </div>

                </div>
            </div>
        )}
        </>
    );
}

function NavLink({ href, children, external = false }) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="px-4 h-full flex items-center text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600"
        >
            {children}
        </a>
    );
}