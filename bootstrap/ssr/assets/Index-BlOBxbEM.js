import { t as PublicLayout } from "./PublicLayout-Cyz_5bcd.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/News/Index.jsx
function Berita({ news }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "Berita" }), /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-10",
				children: "Berita"
			}),
			news.data.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "\r\n                            grid\r\n                            grid-cols-2\r\n                            lg:grid-cols-3\r\n                            gap-3 sm:gap-6\r\n                        ",
				children: news.data.map((item) => /* @__PURE__ */ jsxs(Link, {
					href: `/berita/${item.slug}`,
					className: "\r\n                                    group\r\n                                    border\r\n                                    rounded-2xl\r\n                                    overflow-hidden\r\n                                    bg-white\r\n                                    flex flex-col\r\n                                    transition\r\n                                    hover:shadow-lg\r\n                                    hover:-translate-y-1\r\n                                    hover:border-blue-200\r\n                                ",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-32 sm:h-48 w-full overflow-hidden bg-slate-100",
						children: item.thumbnail ? /* @__PURE__ */ jsx("img", {
							src: `/storage/${item.thumbnail}`,
							alt: item.title,
							className: "\r\n                                                w-full h-full\r\n                                                object-cover\r\n                                                transition\r\n                                                duration-300\r\n                                                group-hover:scale-105\r\n                                            "
						}) : /* @__PURE__ */ jsx("div", {
							className: "\r\n                                                h-full w-full\r\n                                                flex items-center justify-center\r\n                                                text-slate-300\r\n                                            ",
							children: /* @__PURE__ */ jsx(NewsIcon, {})
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-3 sm:p-5 flex flex-col flex-1",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "long",
									year: "numeric"
								}) : ""
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "\r\n                                            font-bold text-sm sm:text-lg\r\n                                            mt-1 sm:mt-2\r\n                                            line-clamp-2\r\n                                            text-gray-800\r\n                                            group-hover:text-blue-600\r\n                                            transition\r\n                                        ",
								children: item.title
							}),
							item.excerpt && /* @__PURE__ */ jsx("p", {
								className: "\r\n                                                mt-1 sm:mt-2\r\n                                                text-xs sm:text-sm\r\n                                                text-gray-600\r\n                                                line-clamp-2\r\n                                                hidden sm:block\r\n                                            ",
								children: item.excerpt
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "\r\n                                            mt-auto pt-3 sm:pt-4\r\n                                            text-xs sm:text-sm font-medium\r\n                                            text-blue-600\r\n                                            inline-flex items-center gap-1\r\n                                        ",
								children: ["Baca Selengkapnya", /* @__PURE__ */ jsx(ArrowIcon, {})]
							})
						]
					})]
				}, item.id))
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-gray-500",
				children: "Belum ada berita."
			}),
			news.links && news.links.length > 3 && /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-2 mt-8 sm:mt-10",
				children: news.links.map((link, index) => /* @__PURE__ */ jsx(Link, {
					href: link.url || "#",
					dangerouslySetInnerHTML: { __html: link.label },
					className: `
                                    px-3 py-1.5
                                    rounded-lg
                                    text-sm
                                    border
                                    ${link.active ? "bg-blue-600 text-white border-blue-600" : "text-gray-600 hover:bg-gray-50"}
                                    ${!link.url ? "pointer-events-none opacity-40" : ""}
                                `
				}, index))
			})
		]
	})] });
}
function ArrowIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "14",
		height: "14",
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
function NewsIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "32",
		height: "32",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z" }),
			/* @__PURE__ */ jsx("path", { d: "M16 8h-8" }),
			/* @__PURE__ */ jsx("path", { d: "M16 12h-8" }),
			/* @__PURE__ */ jsx("path", { d: "M11 16H8" })
		]
	});
}
//#endregion
export { Berita as default };
