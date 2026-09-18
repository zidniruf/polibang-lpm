import { t as PublicLayout } from "./PublicLayout-DK3PtaPs.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
//#region resources/js/Pages/Galleries/Index.jsx
function Index({ categories }) {
	const [selected, setSelected] = useState(null);
	const [visibleIds, setVisibleIds] = useState(() => /* @__PURE__ */ new Set());
	const itemRefs = useRef({});
	const galleries = useMemo(() => categories.flatMap((category) => category.galleries.map((gallery) => ({
		...gallery,
		categoryName: category.name
	}))), [categories]);
	const selectedIndex = useMemo(() => selected ? galleries.findIndex((g) => g.id === selected.id) : -1, [selected, galleries]);
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.dataset.galleryId;
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
	}, [galleries]);
	useEffect(() => {
		if (!selected) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setSelected(null);
			else if (e.key === "ArrowRight") setSelected(galleries[(selectedIndex + 1) % galleries.length]);
			else if (e.key === "ArrowLeft") setSelected(galleries[(selectedIndex - 1 + galleries.length) % galleries.length]);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		selected,
		selectedIndex,
		galleries
	]);
	useEffect(() => {
		document.body.style.overflow = selected ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [selected]);
	const showPrev = () => setSelected(galleries[(selectedIndex - 1 + galleries.length) % galleries.length]);
	const showNext = () => setSelected(galleries[(selectedIndex + 1) % galleries.length]);
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "py-10 sm:py-12 lg:py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8",
					children: "Galeri"
				}), galleries.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "\r\n                                columns-3\r\n                                md:columns-4\r\n                                lg:columns-5\r\n                                gap-3 sm:gap-4\r\n                            ",
					children: galleries.map((gallery, index) => {
						const isVisible = visibleIds.has(String(gallery.id));
						return /* @__PURE__ */ jsx("button", {
							ref: (el) => {
								itemRefs.current[gallery.id] = el;
							},
							"data-gallery-id": gallery.id,
							onClick: () => setSelected(gallery),
							style: { transitionDelay: isVisible ? `${index % 10 * 60}ms` : "0ms" },
							className: `
                                            block
                                            w-full
                                            mb-3 sm:mb-4
                                            break-inside-avoid
                                            rounded-xl
                                            overflow-hidden
                                            border
                                            bg-slate-100
                                            group
                                            transition-all
                                            duration-700
                                            ease-out
                                            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                                        `,
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative overflow-hidden",
								children: [/* @__PURE__ */ jsx("img", {
									src: `/storage/${gallery.image}`,
									alt: gallery.title || gallery.categoryName,
									className: "\r\n                                                    w-full\r\n                                                    h-auto\r\n                                                    object-cover\r\n                                                    transition\r\n                                                    duration-500\r\n                                                    ease-out\r\n                                                    group-hover:scale-110\r\n                                                    group-hover:opacity-90\r\n                                                ",
									loading: "lazy"
								}), /* @__PURE__ */ jsx("div", {
									className: "\r\n                                                    absolute inset-0\r\n                                                    bg-gradient-to-t\r\n                                                    from-black/60\r\n                                                    via-black/0\r\n                                                    to-black/0\r\n                                                    opacity-0\r\n                                                    group-hover:opacity-100\r\n                                                    transition-opacity\r\n                                                    duration-300\r\n                                                    flex items-end\r\n                                                    p-3\r\n                                                ",
									children: gallery.title && /* @__PURE__ */ jsx("span", {
										className: "\r\n                                                            text-white\r\n                                                            text-xs sm:text-sm\r\n                                                            font-medium\r\n                                                            translate-y-2\r\n                                                            group-hover:translate-y-0\r\n                                                            transition-transform\r\n                                                            duration-300\r\n                                                        ",
										children: gallery.title
									})
								})]
							})
						}, gallery.id);
					})
				}) : /* @__PURE__ */ jsx("p", {
					className: "text-gray-500",
					children: "Belum ada galeri."
				})]
			})
		}),
		selected && /* @__PURE__ */ jsx("div", {
			className: "\r\n                        fixed inset-0 z-[999]\r\n                        bg-black/80\r\n                        backdrop-blur-sm\r\n                        flex items-center justify-center\r\n                        p-3 sm:p-6\r\n                        animate-[fadeIn_0.2s_ease-out]\r\n                    ",
			onClick: () => setSelected(null),
			children: /* @__PURE__ */ jsxs("div", {
				className: "\r\n                            bg-white\r\n                            rounded-2xl\r\n                            w-full\r\n                            max-w-lg\r\n                            max-h-full\r\n                            flex flex-col\r\n                            overflow-hidden\r\n                            shadow-2xl\r\n                            relative\r\n                            animate-[scaleIn_0.25s_ease-out]\r\n                        ",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative shrink-0 bg-black",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: `/storage/${selected.image}`,
							alt: selected.title || "",
							className: "\r\n                                    w-full\r\n                                    max-h-[38vh] sm:max-h-[50vh]\r\n                                    object-contain\r\n                                    bg-slate-100\r\n                                    mx-auto\r\n                                "
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setSelected(null),
							className: "\r\n                                    absolute top-2 right-2 sm:top-3 sm:right-3\r\n                                    z-10\r\n                                    bg-black/50\r\n                                    backdrop-blur-sm\r\n                                    rounded-full\r\n                                    w-9 h-9\r\n                                    flex items-center justify-center\r\n                                    text-white\r\n                                    hover:bg-black/70\r\n                                    hover:rotate-90\r\n                                    transition-all\r\n                                    duration-200\r\n                                ",
							"aria-label": "Tutup",
							children: "✕"
						}),
						galleries.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
							onClick: (e) => {
								e.stopPropagation();
								showPrev();
							},
							className: "\r\n                                            absolute left-2 sm:left-3 top-1/2 -translate-y-1/2\r\n                                            z-10\r\n                                            bg-black/50\r\n                                            backdrop-blur-sm\r\n                                            rounded-full\r\n                                            w-9 h-9\r\n                                            flex items-center justify-center\r\n                                            text-white\r\n                                            hover:bg-black/70\r\n                                            hover:scale-110\r\n                                            transition\r\n                                        ",
							"aria-label": "Sebelumnya",
							children: "‹"
						}), /* @__PURE__ */ jsx("button", {
							onClick: (e) => {
								e.stopPropagation();
								showNext();
							},
							className: "\r\n                                            absolute right-2 sm:right-3 top-1/2 -translate-y-1/2\r\n                                            z-10\r\n                                            bg-black/50\r\n                                            backdrop-blur-sm\r\n                                            rounded-full\r\n                                            w-9 h-9\r\n                                            flex items-center justify-center\r\n                                            text-white\r\n                                            hover:bg-black/70\r\n                                            hover:scale-110\r\n                                            transition\r\n                                        ",
							"aria-label": "Berikutnya",
							children: "›"
						})] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "p-4 sm:p-6 overflow-y-auto",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-2 mb-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold text-blue-600 uppercase tracking-wide",
								children: selected.categoryName
							}), galleries.length > 1 && /* @__PURE__ */ jsxs("span", {
								className: "shrink-0 text-xs text-gray-400",
								children: [
									selectedIndex + 1,
									" / ",
									galleries.length
								]
							})]
						}),
						selected.title && /* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg sm:text-xl mb-2",
							children: selected.title
						}),
						selected.description && /* @__PURE__ */ jsx("p", {
							className: "text-sm sm:text-base text-gray-600 whitespace-pre-line",
							children: selected.description
						})
					]
				})]
			}, selected.id)
		}),
		/* @__PURE__ */ jsx("style", { children: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            ` })
	] });
}
//#endregion
export { Index as default };
