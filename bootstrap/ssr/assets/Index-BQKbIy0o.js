import { t as PublicLayout } from "./PublicLayout-DK3PtaPs.js";
import { Head } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Documents/Index.jsx
function Dokumen({ documents }) {
	const containerRef = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, { threshold: .1 });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Dokumen Mutu" }),
		/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes docTitleIn {
                            from {
                                opacity: 0;
                                transform: translateY(16px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes docCardIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .doc-title {
                            opacity: 0;
                        }

                        .doc-title.is-visible {
                            animation: docTitleIn 0.6s ease both;
                        }

                        .doc-card {
                            opacity: 0;
                        }

                        .doc-card.is-visible {
                            animation: docCardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .doc-card {
                            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                        }

                        .doc-card:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 10px 20px -8px rgba(0,0,0,0.12);
                            border-color: rgb(191 219 254);
                        }

                        .doc-btn {
                            transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
                        }

                        .doc-btn:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.4);
                        }

                        .doc-btn:active {
                            transform: translateY(0) scale(0.96);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .doc-title,
                            .doc-card,
                            .doc-card:hover,
                            .doc-btn,
                            .doc-btn:hover,
                            .doc-btn:active {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }),
		/* @__PURE__ */ jsxs("div", {
			ref: containerRef,
			className: "max-w-7xl mx-auto px-4 py-16",
			children: [/* @__PURE__ */ jsx("h1", {
				className: `doc-title ${visible ? "is-visible" : ""} text-4xl font-bold mb-8`,
				children: "Dokumen Mutu"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: documents.map((doc, index) => /* @__PURE__ */ jsxs("div", {
					className: `doc-card ${visible ? "is-visible" : ""} bg-white border rounded-xl p-5 flex justify-between items-center`,
					style: { animationDelay: visible ? `${.15 + index * .08}s` : "0s" },
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "font-semibold",
						children: doc.title
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-sm text-gray-500",
						children: [
							doc.category,
							" • ",
							doc.year
						]
					})] }), /* @__PURE__ */ jsx("a", {
						href: `/storage/${doc.file}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "doc-btn px-4 py-2 rounded-lg bg-blue-600 text-white",
						children: "Download"
					})]
				}, doc.id))
			})]
		})
	] });
}
//#endregion
export { Dokumen as default };
