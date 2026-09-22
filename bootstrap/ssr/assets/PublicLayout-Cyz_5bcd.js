import { router, usePage } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, FileText, Image, Megaphone, Menu, Newspaper, Search, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
//#region resources/js/Components/SocialIcons.jsx
var SOCIALS = [
	{
		key: "instagram",
		icon: FaInstagram,
		label: "Instagram"
	},
	{
		key: "facebook",
		icon: FaFacebook,
		label: "Facebook"
	},
	{
		key: "youtube",
		icon: FaYoutube,
		label: "YouTube"
	},
	{
		key: "tiktok",
		icon: FaTiktok,
		label: "TikTok"
	}
];
/**
* Ikon sosial media yang otomatis mengikuti data WebsiteSetting di admin.
* Kalau field instagram/facebook/youtube/tiktok kosong di database,
* ikonnya otomatis tidak tampil — tidak perlu hardcode di komponen mana pun.
*
* variant="icon"    -> hanya bulatan ikon (dipakai di Navbar)
* variant="labeled" -> ikon + teks label (dipakai di Footer)
*/
function SocialIcons({ setting, variant = "icon", className = "", iconSize = 16 }) {
	const active = SOCIALS.filter((s) => setting?.[s.key]);
	if (!active.length) return null;
	if (variant === "labeled") return /* @__PURE__ */ jsx("div", {
		className: `space-y-2 ${className}`,
		children: active.map(({ key, icon: Icon, label }) => /* @__PURE__ */ jsxs("a", {
			href: setting[key],
			target: "_blank",
			rel: "noopener noreferrer",
			className: "flex items-center gap-2 text-slate-400 hover:text-white transition-colors",
			children: [/* @__PURE__ */ jsx(Icon, { size: iconSize }), /* @__PURE__ */ jsx("span", { children: label })]
		}, key))
	});
	return /* @__PURE__ */ jsx("div", {
		className: `flex items-center gap-3 ${className}`,
		children: active.map(({ key, icon: Icon, label }) => /* @__PURE__ */ jsx("a", {
			href: setting[key],
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": label,
			className: "text-gray-400 hover:text-blue-600 transition-colors",
			children: /* @__PURE__ */ jsx(Icon, { size: iconSize })
		}, key))
	});
}
//#endregion
//#region resources/js/Components/Navbar/Navbar.jsx
var CATEGORIES = [
	{
		key: "news",
		label: "Berita",
		icon: Newspaper,
		urlFn: (i) => `/berita/${i.slug}`
	},
	{
		key: "pages",
		label: "Halaman",
		icon: BookOpen,
		urlFn: (i) => `/halaman/${i.slug}`
	},
	{
		key: "documents",
		label: "Dokumen",
		icon: FileText,
		urlFn: () => `/dokumen`
	},
	{
		key: "announcements",
		label: "Pengumuman",
		icon: Megaphone,
		urlFn: () => `/pengumuman`
	},
	{
		key: "galleries",
		label: "Galeri",
		icon: Image,
		urlFn: () => `/galeri`
	}
];
function SuggestDropdown({ query, onSelect, onClose }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const timerRef = useRef(null);
	useEffect(() => {
		if (!query || query.length < 2) {
			setData(null);
			return;
		}
		clearTimeout(timerRef.current);
		setLoading(true);
		timerRef.current = setTimeout(async () => {
			try {
				const json = await (await fetch(`/search/suggest?q=${encodeURIComponent(query)}`)).json();
				setData(json.results);
			} catch {
				setData(null);
			} finally {
				setLoading(false);
			}
		}, 300);
		return () => clearTimeout(timerRef.current);
	}, [query]);
	const hasResults = data && CATEGORIES.some((c) => data[c.key]?.length > 0);
	if (!query || query.length < 2) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-[60] overflow-hidden",
		children: [
			loading && /* @__PURE__ */ jsx("div", {
				className: "px-4 py-3 text-sm text-gray-400",
				children: "Mencari..."
			}),
			!loading && !hasResults && /* @__PURE__ */ jsxs("div", {
				className: "px-4 py-3 text-sm text-gray-400",
				children: [
					"Tidak ada hasil untuk “",
					query,
					"”"
				]
			}),
			!loading && hasResults && CATEGORIES.map(({ key, label, icon: Icon, urlFn }) => {
				const items = data[key] || [];
				if (!items.length) return null;
				return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "px-4 pt-3 pb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Icon, {
						size: 12,
						className: "text-blue-500"
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-semibold tracking-widest uppercase text-blue-500",
						children: label
					})]
				}), items.map((item) => /* @__PURE__ */ jsxs("button", {
					onMouseDown: () => {
						onSelect(item.title);
						router.visit(urlFn(item));
						onClose();
					},
					className: "w-full text-left px-5 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Search, {
						size: 12,
						className: "text-gray-300 flex-shrink-0"
					}), item.title]
				}, item.id))] }, key);
			}),
			!loading && hasResults && /* @__PURE__ */ jsx("div", {
				className: "border-t border-gray-100 px-4 py-2.5",
				children: /* @__PURE__ */ jsxs("button", {
					onMouseDown: () => {
						router.visit(`/search?q=${encodeURIComponent(query)}`);
						onClose();
					},
					className: "text-xs text-blue-600 hover:underline",
					children: [
						"Lihat semua hasil untuk “",
						query,
						"” →"
					]
				})
			})
		]
	});
}
function Navbar() {
	const { setting, menuGroups = [], navigationLinks = [] } = usePage().props;
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestOpen, setSuggestOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [mobileExpanded, setMobileExpanded] = useState(null);
	const searchInputRef = useRef(null);
	const searchWrapperRef = useRef(null);
	useEffect(() => {
		if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
	}, [searchOpen]);
	useEffect(() => {
		const handler = (e) => {
			if (!e.target.closest(".nav-dropdown-wrap")) setActiveDropdown(null);
			if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) setSuggestOpen(false);
		};
		document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, []);
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);
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
	const logoSrc = setting?.logo ? `/storage/${setting.logo}` : null;
	const siteName = setting?.site_name || "P2M Polibang";
	const allNavGroups = Array.isArray(menuGroups) ? menuGroups : [];
	const allNavLinks = Array.isArray(navigationLinks) ? navigationLinks : [];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 bg-white shadow-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden lg:block",
			children: [/* @__PURE__ */ jsx("div", {
				className: "border-b border-gray-100",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "h-16 grid grid-cols-3 items-center",
						children: [
							/* @__PURE__ */ jsx(SocialIcons, { setting }),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsxs("a", {
									href: "/",
									className: "flex items-center gap-3 group",
									children: [logoSrc ? /* @__PURE__ */ jsx("img", {
										src: logoSrc,
										alt: siteName,
										className: "h-9 w-9 object-contain"
									}) : /* @__PURE__ */ jsx("div", {
										className: "h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0",
										children: "P2M"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-semibold text-lg text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors whitespace-nowrap",
										children: siteName
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								ref: searchWrapperRef,
								children: /* @__PURE__ */ jsx("div", {
									className: "relative",
									children: searchOpen ? /* @__PURE__ */ jsxs("form", {
										onSubmit: handleSearch,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center border border-gray-300 rounded-full px-3 py-1.5 shadow-sm",
											children: [
												/* @__PURE__ */ jsx("input", {
													ref: searchInputRef,
													type: "text",
													value: searchQuery,
													onChange: (e) => {
														setSearchQuery(e.target.value);
														setSuggestOpen(true);
													},
													onFocus: () => setSuggestOpen(true),
													placeholder: "Saya mencari...",
													className: "text-sm w-52 text-gray-700 placeholder-gray-400 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0"
												}),
												/* @__PURE__ */ jsx("button", {
													type: "submit",
													className: "ml-1 text-gray-400 hover:text-blue-600 transition-colors",
													children: /* @__PURE__ */ jsx(Search, { size: 15 })
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: closeSearch,
													className: "ml-1 text-gray-300 hover:text-gray-500",
													children: /* @__PURE__ */ jsx(X, { size: 14 })
												})
											]
										}), suggestOpen && /* @__PURE__ */ jsx(SuggestDropdown, {
											query: searchQuery,
											onSelect: setSearchQuery,
											onClose: closeSearch
										})]
									}) : /* @__PURE__ */ jsxs("button", {
										onClick: () => setSearchOpen(true),
										className: "flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors",
										children: [/* @__PURE__ */ jsx("span", { children: "Saya mencari..." }), /* @__PURE__ */ jsx(Search, { size: 15 })]
									})
								})
							})
						]
					})
				})
			}), /* @__PURE__ */ jsx("nav", {
				className: "max-w-7xl mx-auto px-6",
				"aria-label": "Desktop navigation",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-center h-11",
					children: [
						/* @__PURE__ */ jsx(NavLink, {
							href: "/",
							children: "Beranda"
						}),
						allNavGroups.map((group) => /* @__PURE__ */ jsxs("div", {
							className: "relative h-full flex items-center nav-dropdown-wrap",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => setActiveDropdown((p) => p === group.id ? null : group.id),
								className: "px-4 h-full flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600",
								children: [group.name, /* @__PURE__ */ jsx(ChevronDown, {
									size: 12,
									className: `transition-transform duration-200 ${activeDropdown === group.id ? "rotate-180" : ""}`
								})]
							}), activeDropdown === group.id && group.pages?.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[220px] overflow-hidden z-50 py-1",
								children: group.pages.map((page) => /* @__PURE__ */ jsx("a", {
									href: `/halaman/${page.slug}`,
									className: "block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors",
									children: page.title
								}, page.id))
							})]
						}, group.id)),
						allNavLinks.map((link) => /* @__PURE__ */ jsx(NavLink, {
							href: link.url,
							external: true,
							children: link.title
						}, link.id))
					]
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "lg:hidden",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "h-14 relative flex items-center justify-between px-4",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => setMobileOpen((p) => !p),
						className: "p-2 -ml-2 text-gray-500 hover:text-blue-600 z-10",
						"aria-label": "Menu",
						children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
					}),
					/* @__PURE__ */ jsxs("a", {
						href: "/",
						className: "absolute left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[60%]",
						children: [logoSrc ? /* @__PURE__ */ jsx("img", {
							src: logoSrc,
							alt: siteName,
							className: "h-8 w-8 object-contain flex-shrink-0"
						}) : /* @__PURE__ */ jsx("div", {
							className: "h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0",
							children: "P2M"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-semibold text-sm text-gray-800 leading-tight truncate",
							children: siteName
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setSearchOpen((p) => !p),
						className: "p-2 -mr-2 text-gray-500 hover:text-blue-600 z-10",
						"aria-label": "Cari",
						children: /* @__PURE__ */ jsx(Search, { size: 18 })
					})
				]
			}), searchOpen && /* @__PURE__ */ jsx("div", {
				className: "px-4 pb-3 border-t border-gray-100",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative mt-2",
					ref: searchWrapperRef,
					children: [/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSearch,
						className: "flex items-center border border-gray-200 rounded-xl px-3 py-2 bg-gray-50",
						children: [
							/* @__PURE__ */ jsx("input", {
								ref: searchInputRef,
								type: "text",
								value: searchQuery,
								onChange: (e) => {
									setSearchQuery(e.target.value);
									setSuggestOpen(true);
								},
								onFocus: () => setSuggestOpen(true),
								placeholder: "Saya mencari...",
								className: "flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0"
							}),
							searchQuery && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setSearchQuery("");
									setSuggestOpen(false);
								},
								className: "text-gray-300 hover:text-gray-500 mr-1",
								children: /* @__PURE__ */ jsx(X, { size: 14 })
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "text-gray-400 hover:text-blue-600",
								children: /* @__PURE__ */ jsx(Search, { size: 16 })
							})
						]
					}), suggestOpen && /* @__PURE__ */ jsx(SuggestDropdown, {
						query: searchQuery,
						onSelect: setSearchQuery,
						onClose: () => {
							setSuggestOpen(false);
							setSearchOpen(false);
							setSearchQuery("");
						}
					})]
				})
			})]
		})]
	}), mobileOpen && /* @__PURE__ */ jsxs("div", {
		className: "lg:hidden fixed inset-0 z-40 flex flex-col",
		style: { top: "56px" },
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
			onClick: () => setMobileOpen(false)
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative bg-white w-full max-h-[80vh] overflow-y-auto shadow-xl border-t border-gray-100",
			children: [/* @__PURE__ */ jsxs("nav", {
				className: "px-4 py-3",
				"aria-label": "Mobile navigation",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "/",
						onClick: () => setMobileOpen(false),
						className: "flex items-center h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600 border-b border-gray-50",
						children: "Beranda"
					}),
					allNavGroups.map((group) => /* @__PURE__ */ jsxs("div", {
						className: "border-b border-gray-50",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setMobileExpanded((p) => p === group.id ? null : group.id),
							className: "w-full flex items-center justify-between h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600",
							children: [group.name, /* @__PURE__ */ jsx(ChevronDown, {
								size: 16,
								className: `transition-transform ${mobileExpanded === group.id ? "rotate-180" : ""}`
							})]
						}), mobileExpanded === group.id && group.pages?.length > 0 && /* @__PURE__ */ jsx("div", {
							className: "bg-gray-50 pb-2",
							children: group.pages.map((page) => /* @__PURE__ */ jsx("a", {
								href: `/halaman/${page.slug}`,
								onClick: () => setMobileOpen(false),
								className: "block px-6 py-2.5 text-sm text-gray-600 hover:text-blue-600",
								children: page.title
							}, page.id))
						})]
					}, group.id)),
					allNavLinks.map((link) => /* @__PURE__ */ jsx("a", {
						href: link.url,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => setMobileOpen(false),
						className: "flex items-center h-12 px-2 text-sm font-semibold text-gray-700 hover:text-blue-600 border-b border-gray-50",
						children: link.title
					}, link.id))
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "px-6 py-4 border-t border-gray-100 flex items-center gap-4",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs text-gray-400 uppercase tracking-widest",
					children: "Ikuti kami"
				}), /* @__PURE__ */ jsx(SocialIcons, { setting })]
			})]
		})]
	})] });
}
function NavLink({ href, children, external = false }) {
	return /* @__PURE__ */ jsx("a", {
		href,
		...external ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		className: "px-4 h-full flex items-center text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600",
		children
	});
}
//#endregion
//#region resources/js/Components/Footer.jsx
function Footer() {
	const { setting } = usePage().props;
	return /* @__PURE__ */ jsx("footer", {
		className: "bg-slate-950 text-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 py-12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "\r\n                        grid\r\n                        grid-cols-1\r\n                        sm:grid-cols-2\r\n                        lg:grid-cols-4\r\n                        gap-10\r\n                    ",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [setting?.logo && /* @__PURE__ */ jsx("img", {
							src: `/storage/${setting.logo}`,
							alt: setting.site_name,
							className: "w-12 h-12 object-contain"
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg",
							children: setting?.site_name
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-slate-400",
							children: "Pusat Penjaminan Mutu"
						})] })]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-slate-400 text-sm leading-relaxed",
						children: setting?.address
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-semibold mb-4",
						children: "Kontak"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2 text-sm text-slate-400",
						children: [
							/* @__PURE__ */ jsxs("p", { children: ["Email: ", setting?.email] }),
							/* @__PURE__ */ jsxs("p", { children: ["Telepon: ", setting?.phone] }),
							/* @__PURE__ */ jsxs("p", { children: ["WhatsApp: ", setting?.whatsapp] })
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-semibold mb-4",
						children: "Menu Cepat"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx("a", {
								href: "/",
								className: "block text-slate-400 hover:text-white",
								children: "Beranda"
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/berita",
								className: "block text-slate-400 hover:text-white",
								children: "Berita"
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/dokumen",
								className: "block text-slate-400 hover:text-white",
								children: "Dokumen"
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/galeri",
								className: "block text-slate-400 hover:text-white",
								children: "Galeri"
							})
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "font-semibold mb-4",
						children: "Media Sosial"
					}), /* @__PURE__ */ jsx(SocialIcons, {
						setting,
						variant: "labeled"
					})] })
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "\r\n                        border-t\r\n                        border-slate-800\r\n                        mt-10\r\n                        pt-6\r\n                        text-center\r\n                        text-sm\r\n                        text-slate-500\r\n                    ",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					setting?.site_name,
					". Semua Hak Dilindungi."
				]
			})]
		})
	});
}
//#endregion
//#region resources/js/Layouts/PublicLayout.jsx
function PublicLayout({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { PublicLayout as t };
