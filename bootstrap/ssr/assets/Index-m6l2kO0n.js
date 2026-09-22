import { t as PublicLayout } from "./PublicLayout-Cyz_5bcd.js";
import AboutLPM from "./AboutLPM-DKF8QkJJ.js";
import AnnouncementPopup from "./AnnouncementPopup-WjiZFPLn.js";
import Announcements from "./Announcements-C-E0SGYL.js";
import Hero from "./Hero-BMm7_pw_.js";
import LatestNews from "./LatestNews-BkMLWcI2.js";
import QuickAccess from "./QuickAccess-BMcxZidV.js";
import Testimonials from "./Testimonials-B0Zd2ItP.js";
import { Head } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Home/Index.jsx
function Home({ news, setting, stats, announcements, popupAnnouncement, testimonials, documentCategories, documents }) {
	return /* @__PURE__ */ jsxs(PublicLayout, {
		setting,
		children: [
			/* @__PURE__ */ jsxs(Head, { children: [/* @__PURE__ */ jsx("title", { children: setting?.site_name || "P2M Polibang" }), /* @__PURE__ */ jsx("meta", {
				name: "description",
				content: setting?.description || "Pusat Penjaminan Mutu Politeknik Balekambang"
			})] }),
			/* @__PURE__ */ jsx(AnnouncementPopup, { announcement: popupAnnouncement }),
			/* @__PURE__ */ jsx(Hero, { setting }),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 -mt-20",
				children: /* @__PURE__ */ jsx(QuickAccess, {})
			}),
			/* @__PURE__ */ jsx(AboutLPM, { setting }),
			/* @__PURE__ */ jsx("section", {
				className: "py-16 bg-slate-50",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "\r\n                grid\r\n                lg:grid-cols-4\r\n                gap-8\r\n            ",
						children: [/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-3",
							children: /* @__PURE__ */ jsx(LatestNews, { news })
						}), /* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(Announcements, { announcements })
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Testimonials, { testimonials })
		]
	});
}
//#endregion
export { Home as default };
