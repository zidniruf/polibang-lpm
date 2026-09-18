import { t as PublicLayout } from "./PublicLayout-DK3PtaPs.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Announcements/Index.jsx
function Index({ announcements }) {
	const [visibleIds, setVisibleIds] = useState(() => /* @__PURE__ */ new Set());
	const itemRefs = useRef({});
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.dataset.itemId;
					setVisibleIds((prev) => {
						if (prev.has(id)) return prev;
						const next = new Set(prev);
						next.add(id);
						return next;
					});
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: .1,
			rootMargin: "0px 0px -40px 0px"
		});
		Object.values(itemRefs.current).forEach((el) => {
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [announcements]);
	return /* @__PURE__ */ jsx(PublicLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "py-10 sm:py-12 lg:py-16",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8",
					children: "Pengumuman"
				}),
				announcements.data.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "\r\n                                grid\r\n                                grid-cols-2\r\n                                lg:grid-cols-3\r\n                                gap-3 sm:gap-6\r\n                            ",
					children: announcements.data.map((item, index) => {
						const isVisible = visibleIds.has(String(item.id));
						return /* @__PURE__ */ jsxs(Link, {
							href: `/pengumuman/${item.slug}`,
							ref: (el) => {
								itemRefs.current[item.id] = el;
							},
							"data-item-id": item.id,
							style: { transitionDelay: isVisible ? `${index % 9 * 70}ms` : "0ms" },
							className: `
                                            group
                                            bg-white
                                            border
                                            rounded-2xl
                                            overflow-hidden
                                            flex flex-col
                                            transition-all
                                            duration-700
                                            ease-out
                                            hover:shadow-lg
                                            hover:-translate-y-1
                                            hover:border-blue-200
                                            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                                        `,
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-40 sm:h-48 w-full overflow-hidden bg-slate-100",
								children: item.image ? /* @__PURE__ */ jsx("img", {
									src: `/storage/${item.image}`,
									alt: item.title,
									className: "\r\n                                                        h-full\r\n                                                        w-full\r\n                                                        object-cover\r\n                                                        transition\r\n                                                        duration-300\r\n                                                        group-hover:scale-105\r\n                                                    "
								}) : /* @__PURE__ */ jsx("div", {
									className: "\r\n                                                        h-full w-full\r\n                                                        flex items-center justify-center\r\n                                                        text-slate-300\r\n                                                    ",
									children: /* @__PURE__ */ jsx(MegaphoneIcon, {})
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-4 sm:p-5 flex flex-col flex-1",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-xs text-gray-500 mb-2",
										children: item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "long",
											year: "numeric"
										}) : ""
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "\r\n                                                    font-bold text-base sm:text-lg\r\n                                                    line-clamp-2\r\n                                                    text-gray-800\r\n                                                    group-hover:text-blue-600\r\n                                                    transition\r\n                                                ",
										children: item.title
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "\r\n                                                    mt-auto pt-4\r\n                                                    text-sm font-medium\r\n                                                    text-blue-600\r\n                                                    inline-flex items-center gap-1\r\n                                                ",
										children: ["Baca selengkapnya", /* @__PURE__ */ jsx(ArrowIcon, {})]
									})
								]
							})]
						}, item.id);
					})
				}) : /* @__PURE__ */ jsx("p", {
					className: "text-gray-500",
					children: "Belum ada pengumuman."
				}),
				announcements.links && announcements.links.length > 3 && /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2 mt-8 sm:mt-10",
					children: announcements.links.map((link, index) => /* @__PURE__ */ jsx(Link, {
						href: link.url || "#",
						dangerouslySetInnerHTML: { __html: link.label },
						className: `
                                        px-3 py-1.5
                                        rounded-lg
                                        text-sm
                                        border
                                        transition-colors
                                        duration-200
                                        ${link.active ? "bg-blue-600 text-white border-blue-600" : "text-gray-600 hover:bg-gray-50"}
                                        ${!link.url ? "pointer-events-none opacity-40" : ""}
                                    `
					}, index))
				})
			]
		})
	}) });
}
function ArrowIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "transition group-hover:translate-x-1",
		children: [/* @__PURE__ */ jsx("line", {
			x1: "5",
			y1: "12",
			x2: "19",
			y2: "12"
		}), /* @__PURE__ */ jsx("polyline", { points: "12 5 19 12 12 19" })]
	});
}
function MegaphoneIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "36",
		height: "36",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ jsx("path", { d: "m3 11 18-5v12L3 14v-3z" }), /* @__PURE__ */ jsx("path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" })]
	});
}
//#endregion
export { Index as default };
