import { Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Home/Components/LatestNews.jsx
function LatestNews({ news = [] }) {
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
		}, { threshold: .1 });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes newsHeaderIn {
                            from {
                                opacity: 0;
                                transform: translateY(16px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes newsCardIn {
                            from {
                                opacity: 0;
                                transform: translateY(28px) scale(0.97);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }

                        .news-header {
                            opacity: 0;
                        }

                        .news-header.is-visible {
                            animation: newsHeaderIn 0.6s ease both;
                        }

                        .news-card {
                            opacity: 0;
                        }

                        .news-card.is-visible {
                            animation: newsCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .news-card {
                            transition: transform 0.25s ease, box-shadow 0.25s ease;
                        }

                        .news-card:hover {
                            transform: translateY(-4px);
                        }

                        .news-card:active {
                            transform: scale(0.98);
                        }

                        .news-card-img {
                            overflow: hidden;
                        }

                        .news-card-img img {
                            transition: transform 0.5s ease;
                        }

                        .news-card:hover .news-card-img img {
                            transform: scale(1.06);
                        }

                        .news-card-cta {
                            transition: transform 0.2s ease, gap 0.2s ease;
                        }

                        .news-card:hover .news-card-cta {
                            transform: translateX(3px);
                        }

                        .news-see-all {
                            transition: transform 0.2s ease;
                            display: inline-block;
                        }

                        .news-see-all:hover {
                            transform: translateX(3px);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .news-header,
                            .news-card,
                            .news-card:hover,
                            .news-card:active,
                            .news-card-img img,
                            .news-card-cta,
                            .news-see-all {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsx("div", {
		ref: sectionRef,
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
			className: `news-header ${visible ? "is-visible" : ""} flex items-center justify-between mb-8`,
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-2xl sm:text-3xl font-bold",
				children: "Berita Terbaru"
			}), /* @__PURE__ */ jsx(Link, {
				href: "/berita",
				className: "news-see-all text-blue-600 hover:text-blue-700 text-sm sm:text-base",
				children: "Lihat Semua →"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 sm:gap-6",
			children: news.map((item, index) => /* @__PURE__ */ jsxs(Link, {
				href: `/berita/${item.slug}`,
				className: `
                                    news-card
                                    ${visible ? "is-visible" : ""}
                                    block
                                    bg-white
                                    border
                                    rounded-xl
                                    sm:rounded-2xl
                                    overflow-hidden
                                    hover:shadow-xl
                                `,
				style: { animationDelay: visible ? `${index * .1}s` : "0s" },
				children: [/* @__PURE__ */ jsx("div", {
					className: "news-card-img h-28 sm:h-52 bg-slate-200",
					children: item.thumbnail ? /* @__PURE__ */ jsx("img", {
						src: `/storage/${item.thumbnail}`,
						alt: item.title,
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ jsx("div", {
						className: "w-full h-full flex items-center justify-center text-gray-500 text-xs sm:text-base text-center px-2",
						children: "Tidak ada gambar"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-3 sm:p-6",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs sm:text-sm text-gray-500",
							children: new Date(item.published_at).toLocaleDateString("id-ID", {
								day: "numeric",
								month: "long",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-2 sm:mt-3 text-sm sm:text-lg font-bold hover:text-blue-600 transition line-clamp-2",
							children: item.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "hidden sm:block mt-3 text-gray-600 line-clamp-3",
							children: item.excerpt
						}),
						/* @__PURE__ */ jsx("span", {
							className: "news-card-cta inline-block mt-2 sm:mt-4 text-blue-600 font-medium text-xs sm:text-base",
							children: "Baca Selengkapnya →"
						})
					]
				})]
			}, item.id))
		})] })
	})] });
}
//#endregion
export { LatestNews as default };
