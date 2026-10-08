import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Home/Components/QuickAccess.jsx
var iconClass = "w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6";
var Icon = ({ name }) => {
	const icons = {
		"file-text": "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
		"newspaper": "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
		"megaphone": "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46",
		"images": "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
		"link": "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
		"award": "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
	};
	return /* @__PURE__ */ jsx("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		className: iconClass,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: icons[name] || icons["link"]
		})
	});
};
var getMenuStyles = (index) => {
	const styles = [
		{
			bg: "bg-green-100",
			color: "text-green-600"
		},
		{
			bg: "bg-red-100",
			color: "text-red-600"
		},
		{
			bg: "bg-purple-100",
			color: "text-purple-600"
		},
		{
			bg: "bg-blue-100",
			color: "text-blue-600"
		},
		{
			bg: "bg-amber-100",
			color: "text-amber-500"
		},
		{
			bg: "bg-green-100",
			color: "text-green-600"
		}
	];
	return styles[index % styles.length];
};
var getLink = (item) => {
	if (item.type === "checkbox") return {
		"Dokumen Mutu": "/dokumen",
		"Berita": "/berita",
		"Pengumuman": "/pengumuman",
		"Gallery": "/galeri"
	}[item.name] || "#";
	return item.link || "#";
};
function QuickAccess({ items = [] }) {
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
                            from { opacity: 0; transform: translateY(24px) scale(0.96); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }

                        .menu-card { opacity: 0; transition: transform 0.2s ease, background-color 0.2s ease; }
                        .menu-card.is-visible { animation: menuCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
                        .menu-card:active { transform: scale(0.97); }

                        .menu-arrow { transition: transform 0.2s ease; }
                        .menu-card:hover .menu-arrow { transform: translateX(4px); }

                        @media (prefers-reduced-motion: reduce) {
                            .menu-card, .menu-card.is-visible, .menu-arrow {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "relative z-30 -mt-16 pb-6 lg:mt-0 lg:py-10",
		children: /* @__PURE__ */ jsx("div", {
			className: "relative z-10 max-w-[95rem] mx-auto px-4 lg:px-6",
			children: /* @__PURE__ */ jsx("div", {
				className: "bg-white rounded-3xl p-3 shadow-lg border border-gray-100 lg:p-2",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-3 gap-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-fr lg:gap-0",
					children: items.map((item, index) => {
						const link = getLink(item);
						const isExternal = link.startsWith("http");
						const isLast = index === items.length - 1;
						const { bg, color } = getMenuStyles(index);
						return /* @__PURE__ */ jsxs("a", {
							href: link,
							...isExternal ? {
								target: "_blank",
								rel: "noopener noreferrer"
							} : {},
							"aria-label": `Menu ${item.name}: ${item.description}`,
							className: `
                                            menu-card ${visible ? "is-visible" : ""}
                                            relative flex flex-col items-center text-center min-w-0
                                            gap-2 px-1 py-3 rounded-2xl bg-gray-50
                                            lg:gap-3 lg:px-3 lg:py-5 lg:bg-transparent lg:rounded-2xl
                                            lg:hover:bg-gray-50
                                        `,
							style: { animationDelay: visible ? `${index * .08}s` : "0s" },
							children: [
								/* @__PURE__ */ jsx("div", {
									className: `
                                                w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                                                rounded-full shrink-0
                                                flex items-center justify-center
                                                ${bg} ${color}
                                            `,
									children: /* @__PURE__ */ jsx(Icon, { name: item.icon })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-center w-full lg:flex-1",
									children: [
										/* @__PURE__ */ jsx("h3", {
											className: "font-semibold text-gray-900 text-xs leading-tight sm:text-sm lg:font-bold lg:text-sm xl:text-base lg:whitespace-nowrap",
											children: item.name
										}),
										/* @__PURE__ */ jsx("p", {
											className: "hidden lg:block lg:text-xs xl:text-sm text-gray-500 mt-1 leading-snug max-w-[13rem] text-balance",
											children: item.description
										}),
										/* @__PURE__ */ jsxs("span", {
											className: `
                                                    hidden lg:inline-flex items-center gap-1.5
                                                    lg:text-sm xl:text-base font-semibold mt-auto pt-3
                                                    ${color}
                                                `,
											children: ["Lihat", /* @__PURE__ */ jsx("span", {
												"aria-hidden": "true",
												className: "menu-arrow",
												children: "→"
											})]
										})
									]
								}),
								!isLast && /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "hidden lg:block absolute right-0 top-4 bottom-4 w-px bg-gray-200 pointer-events-none"
								})
							]
						}, item.id);
					})
				})
			})
		})
	})] });
}
//#endregion
export { QuickAccess as default };
