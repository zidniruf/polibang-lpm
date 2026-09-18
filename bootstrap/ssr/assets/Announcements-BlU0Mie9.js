import { Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Home/Components/Announcements.jsx
function Announcements({ announcements = [] }) {
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
		}, { threshold: .15 });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes annHeaderIn {
                            from {
                                opacity: 0;
                                transform: translateY(14px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes annItemIn {
                            from {
                                opacity: 0;
                                transform: translateX(-14px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }

                        .ann-card {
                            transition: box-shadow 0.3s ease;
                        }

                        .ann-card:hover {
                            box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12);
                        }

                        .ann-header {
                            opacity: 0;
                        }

                        .ann-header.is-visible {
                            animation: annHeaderIn 0.5s ease both;
                        }

                        .ann-item {
                            opacity: 0;
                        }

                        .ann-item.is-visible {
                            animation: annItemIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .ann-item {
                            position: relative;
                            transition: padding-left 0.25s ease;
                        }

                        .ann-item::before {
                            content: "";
                            position: absolute;
                            left: -12px;
                            top: 2px;
                            width: 4px;
                            height: 0;
                            border-radius: 9999px;
                            background: rgb(37, 99, 235);
                            transition: height 0.25s ease;
                        }

                        .ann-item:hover {
                            padding-left: 8px;
                        }

                        .ann-item:hover::before {
                            height: calc(100% - 16px);
                        }

                        .ann-see-all {
                            display: inline-block;
                            transition: transform 0.2s ease;
                        }

                        .ann-see-all:hover {
                            transform: translateX(3px);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .ann-header,
                            .ann-item,
                            .ann-item::before,
                            .ann-item:hover,
                            .ann-card,
                            .ann-see-all {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: "\r\n                    ann-card\r\n                    bg-white\r\n                    border\r\n                    rounded-2xl\r\n                    p-6\r\n                    h-full\r\n                ",
		children: [/* @__PURE__ */ jsxs("div", {
			className: `ann-header ${visible ? "is-visible" : ""} flex items-center justify-between mb-6`,
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-xl font-bold",
				children: "Pengumuman"
			}), /* @__PURE__ */ jsx(Link, {
				href: "/pengumuman",
				className: "ann-see-all text-blue-600 text-sm",
				children: "Semua →"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: announcements.length > 0 ? announcements.map((item, index) => /* @__PURE__ */ jsxs(Link, {
				href: `/pengumuman/${item.slug}`,
				className: `
                                    ann-item
                                    ${visible ? "is-visible" : ""}
                                    block
                                    border-b
                                    pb-4
                                    hover:text-blue-600
                                `,
				style: { animationDelay: visible ? `${index * .08}s` : "0s" },
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-xs text-gray-500 mb-1",
					children: new Date(item.published_at).toLocaleDateString("id-ID")
				}), /* @__PURE__ */ jsx("div", {
					className: "font-medium line-clamp-2",
					children: item.title
				})]
			}, item.id)) : /* @__PURE__ */ jsx("p", {
				className: "text-gray-500",
				children: "Belum ada pengumuman."
			})
		})]
	})] });
}
//#endregion
export { Announcements as default };
