import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Home/Components/QuickAccess.jsx
var menus = [
	{
		title: "Dokumen Mutu",
		icon: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			strokeWidth: 1.5,
			stroke: "currentColor",
			className: "w-5 h-5 lg:w-6 lg:h-6",
			children: /* @__PURE__ */ jsx("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			})
		}),
		link: "/dokumen",
		desc: "Dokumen mutu",
		bg: "bg-green-100",
		color: "text-green-600"
	},
	{
		title: "Berita",
		icon: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			strokeWidth: 1.5,
			stroke: "currentColor",
			className: "w-5 h-5 lg:w-6 lg:h-6",
			children: /* @__PURE__ */ jsx("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
			})
		}),
		link: "/berita",
		desc: "Berita terbaru",
		bg: "bg-blue-100",
		color: "text-blue-600"
	},
	{
		title: "Pengumuman",
		icon: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			strokeWidth: 1.5,
			stroke: "currentColor",
			className: "w-5 h-5 lg:w-6 lg:h-6",
			children: /* @__PURE__ */ jsx("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				d: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
			})
		}),
		link: "/pengumuman",
		desc: "Info terbaru",
		bg: "bg-yellow-100",
		color: "text-yellow-600"
	},
	{
		title: "Galeri",
		icon: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			strokeWidth: 1.5,
			stroke: "currentColor",
			className: "w-5 h-5 lg:w-6 lg:h-6",
			children: /* @__PURE__ */ jsx("path", {
				strokeLinecap: "round",
				strokeLinejoin: "round",
				d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
			})
		}),
		link: "/galeri",
		desc: "Dokumentasi kegiatan",
		bg: "bg-purple-100",
		color: "text-purple-600"
	}
];
function QuickAccess() {
	const sectionRef = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, { threshold: .15 });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes menuCardIn {
                            from {
                                opacity: 0;
                                transform: translateY(24px) scale(0.96);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }

                        @keyframes iconPop {
                            0% { transform: scale(1) rotate(0deg); }
                            35% { transform: scale(1.15) rotate(-6deg); }
                            60% { transform: scale(0.95) rotate(3deg); }
                            100% { transform: scale(1.08) rotate(0deg); }
                        }

                        .menu-card {
                            opacity: 0;
                        }

                        .menu-card.is-visible {
                            animation: menuCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .menu-card:hover .menu-icon {
                            animation: iconPop 0.5s ease;
                        }

                        .menu-card:active {
                            transform: scale(0.97);
                        }

                        .menu-card {
                            transition: transform 0.2s ease, box-shadow 0.2s ease;
                        }

                        .menu-card:hover {
                            transform: translateY(-3px);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .menu-card,
                            .menu-card.is-visible,
                            .menu-card:hover .menu-icon {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "relative z-10 -mt-20 pb-6 lg:mt-0 lg:py-16",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "\r\n                        bg-white\r\n                        rounded-3xl\r\n                        p-4\r\n                        shadow-lg\r\n                        border border-gray-100\r\n                        lg:bg-white\r\n                        lg:border-gray-100\r\n                        lg:shadow-lg\r\n                        lg:p-2\r\n                    ",
				children: /* @__PURE__ */ jsx("div", {
					className: "\r\n                            grid grid-cols-2\r\n                            lg:grid-cols-4\r\n                            gap-3 lg:gap-0\r\n                            lg:divide-x lg:divide-gray-200\r\n                        ",
					children: menus.map((menu, index) => /* @__PURE__ */ jsxs("a", {
						href: menu.link,
						"aria-label": `Menu ${menu.title}: ${menu.desc}`,
						className: `
                                        menu-card
                                        ${visible ? "is-visible" : ""}
                                        flex flex-col items-center
                                        text-center gap-3
                                        lg:flex-row lg:items-center
                                        lg:text-left lg:gap-4
                                        bg-gray-50 lg:bg-transparent
                                        rounded-2xl
                                        p-4 lg:p-5
                                        border border-gray-100
                                        lg:border-0
                                        lg:rounded-none
                                        lg:shadow-none
                                        lg:hover:bg-gray-50
                                    `,
						style: { animationDelay: visible ? `${index * .1}s` : "0s" },
						children: [/* @__PURE__ */ jsx("div", {
							className: `
                                            menu-icon
                                            w-11 h-11
                                            lg:w-12 lg:h-12
                                            rounded-full
                                            ${menu.bg} ${menu.color}
                                            flex items-center justify-center
                                            shrink-0
                                        `,
							children: menu.icon
						}), /* @__PURE__ */ jsxs("div", {
							className: "\r\n                                            flex flex-col items-center\r\n                                            lg:items-start\r\n                                            text-center lg:text-left\r\n                                            min-w-0 flex-1\r\n                                        ",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "\r\n                                            font-bold text-gray-900\r\n                                            text-sm lg:text-base\r\n                                        ",
									children: menu.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "\r\n                                            hidden lg:block\r\n                                            text-sm text-gray-500\r\n                                            mt-1 leading-snug\r\n                                        ",
									children: menu.desc
								}),
								/* @__PURE__ */ jsxs("span", {
									className: `
                                            hidden lg:inline-flex
                                            items-center gap-1
                                            text-sm font-semibold
                                            ${menu.color} mt-3
                                        `,
									children: [
										"Lihat ",
										menu.title,
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											children: "→"
										})
									]
								})
							]
						})]
					}, menu.title))
				})
			})
		})
	})] });
}
//#endregion
export { QuickAccess as default };
