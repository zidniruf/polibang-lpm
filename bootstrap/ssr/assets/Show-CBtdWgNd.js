import { t as PublicLayout } from "./PublicLayout-Cyz_5bcd.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region resources/js/Pages/News/Show.jsx
function ShareButton({ title }) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const [url, setUrl] = useState("");
	useEffect(() => {
		setUrl(window.location.href);
	}, []);
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			const input = document.createElement("input");
			input.value = url;
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const shareInstagram = async () => {
		await copyLink();
		window.open("https://www.instagram.com/", "_blank", "noopener");
	};
	const items = [
		{
			name: "WhatsApp",
			href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
			bg: "bg-[#25D366]",
			icon: /* @__PURE__ */ jsx("path", { d: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.46z" }),
			fill: "white",
			external: true
		},
		{
			name: "Instagram",
			onClick: shareInstagram,
			bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
			icon: /* @__PURE__ */ jsx("path", { d: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" }),
			fill: "white"
		},
		{
			name: copied ? "Tersalin!" : "Salin Link",
			onClick: copyLink,
			bg: "bg-amber-200",
			stroke: "#92400e",
			icon: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" }), /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" })] })
		},
		{
			name: "Facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			bg: "bg-[#1877F2]",
			icon: /* @__PURE__ */ jsx("path", { d: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" }),
			fill: "white",
			external: true
		},
		{
			name: "X",
			href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
			bg: "bg-black",
			icon: /* @__PURE__ */ jsx("path", { d: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" }),
			fill: "white",
			external: true
		},
		{
			name: "Telegram",
			href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
			bg: "bg-[#229ED9]",
			icon: /* @__PURE__ */ jsx("path", { d: "M11.94 0A12 12 0 1 0 24 12 12 12 0 0 0 11.94 0zm5.22 8.2-1.77 8.35c-.13.59-.48.73-.97.45l-2.7-1.99-1.3 1.25c-.14.14-.27.27-.55.27l.2-2.75 5-4.52c.22-.19-.05-.3-.34-.11l-6.18 3.89-2.66-.83c-.58-.18-.59-.58.12-.86l10.4-4c.48-.18.9.11.75.85z" }),
			fill: "white",
			external: true
		}
	];
	const iconClass = "flex h-9 w-9 items-center justify-center rounded-full shadow transition hover:scale-110";
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute bottom-4 right-4 z-10 flex flex-col items-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: `mb-3 flex flex-col items-center gap-3 rounded-full bg-white p-2 shadow-xl transition-all duration-300 origin-bottom ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0 h-0 p-0 mb-0 overflow-hidden"}`,
				children: items.map((item) => {
					const svg = /* @__PURE__ */ jsx("svg", {
						viewBox: "0 0 24 24",
						className: "h-5 w-5",
						fill: item.fill || "none",
						stroke: item.stroke || "none",
						strokeWidth: item.stroke ? 2 : 0,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: item.icon
					});
					return item.href ? /* @__PURE__ */ jsx("a", {
						href: item.href,
						target: "_blank",
						rel: "noopener noreferrer",
						title: item.name,
						"aria-label": `Bagikan ke ${item.name}`,
						className: `${iconClass} ${item.bg}`,
						children: svg
					}, item.name) : /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: item.onClick,
						title: item.name,
						"aria-label": item.name,
						className: `${iconClass} ${item.bg}`,
						children: svg
					}, item.name);
				})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				"aria-label": "Bagikan",
				"aria-expanded": open,
				className: "flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray shadow-lg transition hover:scale-105 hover:bg-gray-100",
				children: open ? /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 24 24",
					className: "h-5 w-5",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2.5",
					strokeLinecap: "round",
					children: /* @__PURE__ */ jsx("path", { d: "M6 6l12 12M18 6L6 18" })
				}) : /* @__PURE__ */ jsxs("svg", {
					viewBox: "0 0 24 24",
					className: "h-6 w-6",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "18",
							cy: "5",
							r: "3"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "6",
							cy: "12",
							r: "3"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "18",
							cy: "19",
							r: "3"
						}),
						/* @__PURE__ */ jsx("path", { d: "M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" })
					]
				})
			}),
			copied && /* @__PURE__ */ jsx("span", {
				className: "absolute -left-24 bottom-16 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white",
				children: "Link tersalin!"
			})
		]
	});
}
function Show({ news }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [/* @__PURE__ */ jsxs(Head, {
		title: news.title,
		children: [
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: news.title
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: news.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: `${window.location.origin}/storage/${news.thumbnail}`
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: window.location.href
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "article"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			})
		]
	}), /* @__PURE__ */ jsxs("article", {
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
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("img", {
						src: `/storage/${news.thumbnail}`,
						alt: news.title,
						className: "w-full rounded-2xl shadow-lg"
					}), /* @__PURE__ */ jsx(ShareButton, { title: news.title })]
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
