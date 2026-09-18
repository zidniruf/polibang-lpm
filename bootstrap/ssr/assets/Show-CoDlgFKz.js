import { t as PublicLayout } from "./PublicLayout-DK3PtaPs.js";
import { Head } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/News/Show.jsx
function Show({ news }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsx(Head, { title: news.title }), /* @__PURE__ */ jsxs("article", {
		className: "max-w-4xl mx-auto px-4 py-16",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm uppercase tracking-wide text-blue-600 font-semibold",
						children: "Berita P2M"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-4xl md:text-5xl font-bold leading-tight",
						children: news.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-gray-500",
						children: new Date(news.published_at).toLocaleDateString("id-ID", {
							day: "numeric",
							month: "long",
							year: "numeric"
						})
					})
				]
			}),
			news.thumbnail && /* @__PURE__ */ jsx("div", {
				className: "mt-10",
				children: /* @__PURE__ */ jsx("img", {
					src: `/storage/${news.thumbnail}`,
					alt: news.title,
					className: "w-full rounded-2xl shadow-lg"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "prose prose-lg max-w-none mt-10",
				dangerouslySetInnerHTML: { __html: news.content }
			})
		]
	})] });
}
//#endregion
export { Show as default };
