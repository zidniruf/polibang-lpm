import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Home/Components/Statistics.jsx
function Statistics({ stats }) {
	const items = [
		{
			value: stats.documents,
			label: "Dokumen",
			color: "text-blue-600"
		},
		{
			value: stats.news,
			label: "Berita",
			color: "text-green-600"
		},
		{
			value: stats.galleries,
			label: "Galeri",
			color: "text-orange-600"
		},
		{
			value: stats.announcements,
			label: "Pengumuman",
			color: "text-purple-600"
		}
	];
	return /* @__PURE__ */ jsx("section", {
		className: "bg-slate-50 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-12",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl font-bold",
					children: "Statistik Website"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-gray-500 mt-3",
					children: "Data terbaru dari sistem P2M"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
				children: items.map((item) => /* @__PURE__ */ jsxs("div", {
					className: "\r\n                                bg-white\r\n                                rounded-2xl\r\n                                p-8\r\n                                border\r\n                                text-center\r\n                                hover:shadow-lg\r\n                                transition\r\n                            ",
					children: [/* @__PURE__ */ jsx("h3", {
						className: `text-5xl font-bold ${item.color}`,
						children: item.value
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 text-gray-600",
						children: item.label
					})]
				}, item.label))
			})]
		})
	});
}
//#endregion
export { Statistics as default };
