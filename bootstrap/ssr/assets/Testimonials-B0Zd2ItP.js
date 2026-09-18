import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region resources/js/Pages/Home/Components/Testimonials.jsx
function Testimonials({ testimonials = [] }) {
	const [isPaused, setIsPaused] = useState(false);
	const loopedTestimonials = [...testimonials, ...testimonials];
	return /* @__PURE__ */ jsxs("section", {
		className: "py-20 bg-slate-50 overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("style", { children: `
                @keyframes testimonial-marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
            ` }),
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-center mb-12",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-3xl lg:text-4xl font-bold",
						children: "Testimoni"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 text-gray-500",
						children: "Pendapat dan pengalaman pengguna layanan P2M"
					})]
				})
			}),
			testimonials.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "relative w-full overflow-hidden",
				onMouseEnter: () => setIsPaused(true),
				onMouseLeave: () => setIsPaused(false),
				children: /* @__PURE__ */ jsx("div", {
					className: "flex gap-6 w-max px-4",
					style: {
						animation: "testimonial-marquee 40s linear infinite",
						animationPlayState: isPaused ? "paused" : "running"
					},
					children: loopedTestimonials.map((item, index) => /* @__PURE__ */ jsxs("div", {
						className: "\r\n                                    bg-white\r\n                                    rounded-2xl\r\n                                    sm:rounded-3xl\r\n                                    p-4\r\n                                    sm:p-6\r\n                                    border\r\n                                    shadow-sm\r\n                                    hover:shadow-lg\r\n                                    transition\r\n                                    flex\r\n                                    flex-col\r\n                                    h-full\r\n                                    w-[220px]\r\n                                    sm:w-[380px]\r\n                                    shrink-0\r\n                                ",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-2 sm:mb-4 text-yellow-500 text-sm sm:text-lg",
								children: "⭐".repeat(item.rating || 5)
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 sm:mt-6 flex items-center gap-2 sm:gap-4",
								children: [item.photo ? /* @__PURE__ */ jsx("img", {
									src: `/storage/${item.photo}`,
									alt: item.name,
									className: "\r\n                                                w-10 h-10\r\n                                                sm:w-14 sm:h-14\r\n                                                rounded-full\r\n                                                object-cover\r\n                                                border\r\n                                            "
								}) : /* @__PURE__ */ jsx("div", { className: "\r\n                                                w-10 h-10\r\n                                                sm:w-14 sm:h-14\r\n                                                rounded-full\r\n                                                bg-slate-200\r\n                                            " }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm sm:text-base font-bold",
									children: item.name
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs sm:text-sm text-gray-500",
									children: item.position
								})] })]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "\r\n                                        mt-3\r\n                                        sm:mt-6\r\n                                        text-xs\r\n                                        sm:text-base\r\n                                        text-gray-600\r\n                                        leading-relaxed\r\n                                        flex-1\r\n                                        italic\r\n                                        line-clamp-4\r\n                                        sm:line-clamp-none\r\n                                    ",
								children: [
									"\"",
									item.content,
									"\""
								]
							})
						]
					}, `${item.id}-${index}`))
				})
			})
		]
	});
}
//#endregion
export { Testimonials as default };
