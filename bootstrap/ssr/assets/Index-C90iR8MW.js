import { t as PublicLayout } from "./PublicLayout-Cyz_5bcd.js";
import { Head } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Download } from "lucide-react";
//#region resources/js/Pages/Documents/Index.jsx
function Dokumen({ documents }) {
	const getDocumentUrl = (doc) => {
		if (doc.type === "link") return doc.link;
		return `/storage/${doc.file}`;
	};
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Dokumen Mutu" }),
		/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        .doc-name {
                            transition: color 0.2s ease;
                        }

                        .doc-btn {
                            transition: background-color 0.2s ease, transform 0.15s ease;
                        }

                        .doc-btn:active {
                            transform: scale(0.94);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .doc-name,
                            .doc-btn {
                                transition: none !important;
                            }
                        }
                    ` } }),
		/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900",
				children: "Dokumen Mutu"
			}), /* @__PURE__ */ jsx("div", {
				className: "w-full overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-left border-collapse",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-gray-200",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "py-3 pr-3 text-xs font-medium uppercase tracking-wide text-gray-500 w-10 sm:w-16",
								children: "No"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 pr-3 text-xs font-medium uppercase tracking-wide text-gray-500",
								children: "Nama Dokumen"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 px-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-center w-16 sm:w-32",
								children: "Tahun"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-3 text-xs font-medium uppercase tracking-wide text-gray-500 text-right sm:text-center w-14 sm:w-56",
								children: "Unduh"
							})
						]
					}) }), /* @__PURE__ */ jsx("tbody", { children: documents.length > 0 ? documents.map((doc, index) => {
						const documentUrl = getDocumentUrl(doc);
						const isFile = doc.type === "file";
						return /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-200",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "py-4 pr-3 text-sm text-gray-500 align-middle",
									children: index + 1
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 pr-3 align-middle",
									children: /* @__PURE__ */ jsx("a", {
										href: documentUrl,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "doc-name text-sm sm:text-base font-medium text-green-700 hover:text-green-900 break-words",
										title: "Buka dokumen",
										children: doc.title
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-4 px-3 text-sm text-gray-600 text-center align-middle whitespace-nowrap",
									children: doc.year
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 align-middle text-right sm:text-center",
									children: /* @__PURE__ */ jsxs("a", {
										href: documentUrl,
										...isFile ? { download: true } : {
											target: "_blank",
											rel: "noopener noreferrer"
										},
										className: "doc-btn inline-flex h-9 w-9 sm:h-10 sm:w-auto sm:gap-2 sm:px-5 items-center justify-center rounded-lg bg-green-600 text-sm font-medium sm:uppercase text-white whitespace-nowrap hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
										title: isFile ? "Unduh dokumen" : "Buka dokumen",
										"aria-label": isFile ? `Unduh ${doc.title}` : `Buka ${doc.title}`,
										children: [/* @__PURE__ */ jsx(Download, { size: 18 }), /* @__PURE__ */ jsx("span", {
											className: "hidden sm:inline",
											children: "Unduh Dokumen"
										})]
									})
								})
							]
						}, doc.id);
					}) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: "4",
						className: "py-10 text-center text-gray-500",
						children: "Belum ada dokumen tersedia."
					}) }) })]
				})
			})]
		})
	] });
}
//#endregion
export { Dokumen as default };
