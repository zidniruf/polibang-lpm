import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//#region resources/js/Pages/Home/Components/AnnouncementPopup.jsx
function AnnouncementPopup({ announcement = null }) {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (!announcement) return;
		const dismissedKey = `announcement_popup_dismissed_${announcement.id}`;
		if (!sessionStorage.getItem(dismissedKey)) setOpen(true);
	}, [announcement]);
	if (!announcement || !open) return null;
	const handleClose = () => {
		sessionStorage.setItem(`announcement_popup_dismissed_${announcement.id}`, "1");
		setOpen(false);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "\r\n                fixed inset-0 z-50\r\n                bg-black/50\r\n                flex items-center justify-center\r\n                p-4\r\n            ",
		onClick: handleClose,
		children: /* @__PURE__ */ jsxs("div", {
			className: "\r\n                    bg-white\r\n                    rounded-2xl\r\n                    max-w-lg w-full\r\n                    p-6\r\n                    relative\r\n                ",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: handleClose,
					className: "\r\n                        absolute top-4 right-4\r\n                        text-gray-400 hover:text-gray-600\r\n                    ",
					"aria-label": "Tutup",
					children: "✕"
				}),
				announcement.image && /* @__PURE__ */ jsx("img", {
					src: `/storage/${announcement.image}`,
					alt: announcement.title,
					className: "w-full h-40 object-cover rounded-xl mb-4"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-xs text-gray-500 mb-1",
					children: "Pengumuman"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-bold mb-2",
					children: announcement.title
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-sm text-gray-600 mb-4 line-clamp-4",
					dangerouslySetInnerHTML: { __html: announcement.content }
				}),
				/* @__PURE__ */ jsx(Link, {
					href: `/pengumuman/${announcement.slug}`,
					className: "\r\n                        inline-block\r\n                        bg-blue-600 text-white\r\n                        text-sm font-medium\r\n                        px-4 py-2 rounded-lg\r\n                    ",
					children: "Lihat Selengkapnya"
				})
			]
		})
	});
}
//#endregion
export { AnnouncementPopup as default };
