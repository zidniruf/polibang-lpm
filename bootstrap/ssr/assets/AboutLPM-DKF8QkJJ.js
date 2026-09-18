import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
//#region resources/js/Pages/Home/Components/AboutLPM.jsx
function AboutLPM({ setting }) {
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
		}, { threshold: .2 });
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes aboutImageIn {
                            from {
                                opacity: 0;
                                transform: translateX(-30px) scale(0.97);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0) scale(1);
                            }
                        }

                        @keyframes aboutTextIn {
                            from {
                                opacity: 0;
                                transform: translateX(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }

                        @keyframes aboutFadeUp {
                            from {
                                opacity: 0;
                                transform: translateY(16px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .about-image {
                            opacity: 0;
                        }

                        .about-image.is-visible {
                            animation: aboutImageIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.05s;
                        }

                        .about-title {
                            opacity: 0;
                        }

                        .about-title.is-visible {
                            animation: aboutTextIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.15s;
                        }

                        .about-content {
                            opacity: 0;
                        }

                        .about-content.is-visible {
                            animation: aboutFadeUp 0.6s ease both 0.3s;
                        }

                        .about-cta {
                            opacity: 0;
                        }

                        .about-cta.is-visible {
                            animation: aboutFadeUp 0.6s ease both 0.45s;
                        }

                        .about-image img,
                        .about-image > div {
                            transition: transform 0.5s ease;
                        }

                        .about-image:hover img,
                        .about-image:hover > div {
                            transform: scale(1.03);
                        }

                        .about-btn {
                            transition: transform 0.2s ease, background-color 0.2s ease;
                        }

                        .about-btn:hover svg {
                            transform: translate(2px, -2px);
                        }

                        .about-btn svg {
                            transition: transform 0.2s ease;
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .about-image,
                            .about-title,
                            .about-content,
                            .about-cta,
                            .about-image img,
                            .about-image > div,
                            .about-btn svg {
                                animation: none !important;
                                transition: none !important;
                                transform: none !important;
                                opacity: 1 !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "py-16 lg:py-24 bg-white",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: `about-image ${visible ? "is-visible" : ""} lg:col-span-2 overflow-hidden rounded-[2rem]`,
					children: setting?.about_image ? /* @__PURE__ */ jsx("img", {
						src: `/storage/${setting.about_image}`,
						alt: setting?.about_title || "Tentang P2M",
						className: "w-full aspect-square lg:aspect-[4/5] rounded-[2rem] object-cover shadow-sm"
					}) : /* @__PURE__ */ jsx("div", {
						className: "w-full aspect-square lg:aspect-[4/5] rounded-[2rem] bg-gray-100 flex items-center justify-center text-gray-400",
						children: /* @__PURE__ */ jsx("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							fill: "none",
							viewBox: "0 0 24 24",
							strokeWidth: 1.5,
							stroke: "currentColor",
							className: "w-12 h-12",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							})
						})
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-3 flex flex-col justify-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: `about-title ${visible ? "is-visible" : ""} text-2xl lg:text-4xl font-bold text-gray-900 leading-tight`,
							children: setting?.about_title || "Temukan Layanan Mutu Terbaik Kami"
						}),
						/* @__PURE__ */ jsx("div", {
							className: `about-content ${visible ? "is-visible" : ""} mt-6 text-base text-gray-500 leading-relaxed prose prose-sm max-w-none prose-p:m-0 prose-p:mb-4 last:prose-p:mb-0`,
							dangerouslySetInnerHTML: { __html: setting?.about_content || "Kami mendukung setiap tahap proses penjaminan mutu, memastikan pengalaman yang mulus dan bebas stres dari awal hingga akhir." }
						}),
						/* @__PURE__ */ jsx("div", {
							className: `about-cta ${visible ? "is-visible" : ""} mt-8`,
							children: /* @__PURE__ */ jsxs("a", {
								href: "/halaman/tentang-p2m",
								className: "about-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50",
								children: ["Selengkapnya", /* @__PURE__ */ jsx("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24",
									strokeWidth: 2,
									stroke: "currentColor",
									className: "w-4 h-4",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
									})
								})]
							})
						})
					]
				})]
			})
		})
	})] });
}
//#endregion
export { AboutLPM as default };
