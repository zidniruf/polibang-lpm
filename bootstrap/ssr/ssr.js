import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { route } from "ziggy-js";
import { jsx } from "react/jsx-runtime";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.jsx
var appName = "P2M Polibang";
createServer((page) => createInertiaApp({
	page,
	render: ReactDOMServer.renderToString,
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* #__PURE__ */ Object.assign({
		"./Pages/Announcements/Index.jsx": () => import("./assets/Index-Duui896y.js"),
		"./Pages/Announcements/Show.jsx": () => import("./assets/Show-CEpkucIp.js"),
		"./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-BSBiH1fJ.js"),
		"./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-CYiG_9lX.js"),
		"./Pages/Auth/Login.jsx": () => import("./assets/Login-DrqbiELD.js"),
		"./Pages/Auth/Register.jsx": () => import("./assets/Register-Cq78AY22.js"),
		"./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-D16oHDoy.js"),
		"./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-dzxLALF4.js"),
		"./Pages/Contact/Index.jsx": () => import("./assets/Index-C9voVAtW.js"),
		"./Pages/Dashboard.jsx": () => import("./assets/Dashboard-CpPlUNFZ.js"),
		"./Pages/Documents/Index.jsx": () => import("./assets/Index-BQKbIy0o.js"),
		"./Pages/Galleries/Index.jsx": () => import("./assets/Index-x_IS7G42.js"),
		"./Pages/Home/Components/AboutLPM.jsx": () => import("./assets/AboutLPM-DKF8QkJJ.js"),
		"./Pages/Home/Components/AnnouncementPopup.jsx": () => import("./assets/AnnouncementPopup-WjiZFPLn.js"),
		"./Pages/Home/Components/Announcements.jsx": () => import("./assets/Announcements-C-E0SGYL.js"),
		"./Pages/Home/Components/Hero.jsx": () => import("./assets/Hero-BMm7_pw_.js"),
		"./Pages/Home/Components/LatestNews.jsx": () => import("./assets/LatestNews-BkMLWcI2.js"),
		"./Pages/Home/Components/QuickAccess.jsx": () => import("./assets/QuickAccess-BMcxZidV.js"),
		"./Pages/Home/Components/Statistics.jsx": () => import("./assets/Statistics-_zPL0vOO.js"),
		"./Pages/Home/Components/Testimonials.jsx": () => import("./assets/Testimonials-B0Zd2ItP.js"),
		"./Pages/Home/Index.jsx": () => import("./assets/Index-Br_pIh1J.js"),
		"./Pages/News/Index.jsx": () => import("./assets/Index-Cb8WDkSd.js"),
		"./Pages/News/Show.jsx": () => import("./assets/Show-CoDlgFKz.js"),
		"./Pages/Page/Show.jsx": () => import("./assets/Show-D9uysBZS.js"),
		"./Pages/Profile/Edit.jsx": () => import("./assets/Edit-i0OefYig.js"),
		"./Pages/Profile/Index.jsx": () => import("./assets/Index-Bma8fGGR.js"),
		"./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-Btl6ZpPb.js"),
		"./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-CznDp81j.js"),
		"./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-DnjdgctN.js"),
		"./Pages/SPMI.jsx": () => import("./assets/SPMI-COjF2sKQ.js"),
		"./Pages/Welcome.jsx": () => import("./assets/Welcome-CbbRvpyJ.js")
	})),
	setup: ({ App, props }) => {
		global.route = (name, params, absolute) => route(name, params, absolute, {
			...page.props.ziggy,
			location: new URL(page.props.ziggy.location)
		});
		return /* @__PURE__ */ jsx(App, { ...props });
	}
}));
//#endregion
export {};
