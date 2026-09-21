import { t as PublicLayout } from "./PublicLayout-DK3PtaPs.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/Pages/Page/Show.jsx
function Show({ page, organizationMembers = [] }) {
	return /* @__PURE__ */ jsxs(PublicLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: page.title }),
		page.banner_image ? /* @__PURE__ */ jsxs("div", {
			className: "relative w-full h-[280px] md:h-[380px] overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: `/storage/${page.banner_image}`,
					alt: page.title,
					className: "\r\n                            absolute\r\n                            inset-0\r\n                            w-full\r\n                            h-full\r\n                            object-cover\r\n                        "
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/55" }),
				/* @__PURE__ */ jsxs("div", {
					className: "\r\n                            relative\r\n                            z-10\r\n                            h-full\r\n                            flex\r\n                            flex-col\r\n                            items-center\r\n                            justify-center\r\n                            text-center\r\n                            px-4\r\n                        ",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "\r\n                                text-white\r\n                                text-3xl\r\n                                md:text-5xl\r\n                                font-serif\r\n                                mb-4\r\n                            ",
						children: page.title
					}), /* @__PURE__ */ jsxs("div", {
						className: "\r\n                                flex\r\n                                items-center\r\n                                gap-2\r\n                                text-white/90\r\n                                text-sm\r\n                            ",
						children: [
							/* @__PURE__ */ jsx(Link, {
								href: "/",
								className: "hover:underline",
								children: "Home"
							}),
							/* @__PURE__ */ jsx("span", { children: "›" }),
							/* @__PURE__ */ jsx("span", { children: page.title })
						]
					})]
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "max-w-5xl mx-auto px-4 pt-16",
			children: /* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-bold mb-8",
				children: page.title
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "max-w-5xl mx-auto px-4 py-16",
			children: [
				page.content && /* @__PURE__ */ jsx("div", {
					className: "\r\n            prose\r\n            prose-lg\r\n            max-w-none\r\n            text-gray-700\r\n            prose-headings:font-bold\r\n            prose-headings:text-gray-900\r\n            prose-h1:text-4xl\r\n            prose-h2:text-3xl\r\n            prose-h3:text-2xl\r\n            prose-p:leading-7\r\n            prose-blockquote:border-l-4\r\n            prose-blockquote:border-green-600\r\n            prose-blockquote:pl-4\r\n            prose-blockquote:italic\r\n            prose-ul:list-disc\r\n            prose-ol:list-decimal\r\n            prose-li:my-1\r\n            prose-a:text-blue-600\r\n            prose-a:underline\r\n            prose-img:rounded-xl\r\n            prose-img:shadow\r\n            prose-img:max-w-full\r\n        ",
					dangerouslySetInnerHTML: { __html: page.content || "" }
				}),
				page.show_structure && organizationMembers.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-bold mb-8",
						children: "Struktur Organisasi"
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-8",
						children: organizationMembers.map((member) => /* @__PURE__ */ jsxs("div", {
							className: "\r\n                        border\r\n                        rounded-2xl\r\n                        p-6\r\n                        grid\r\n                        md:grid-cols-[250px_1fr]\r\n                        gap-6\r\n                    ",
							children: [/* @__PURE__ */ jsx("div", { children: member.photo && /* @__PURE__ */ jsx("img", {
								src: `/storage/${member.photo}`,
								alt: member.name,
								className: "\r\n                                    w-full\r\n                                    rounded-xl\r\n                                    border\r\n                                "
							}) }), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-2xl font-bold mb-4",
									children: member.position
								}),
								/* @__PURE__ */ jsx("table", {
									className: "w-full",
									children: /* @__PURE__ */ jsxs("tbody", { children: [
										/* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
											className: "font-semibold py-2 w-40",
											children: "Nama"
										}), /* @__PURE__ */ jsx("td", { children: member.name })] }),
										/* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
											className: "font-semibold py-2",
											children: "Jabatan"
										}), /* @__PURE__ */ jsx("td", { children: member.position })] }),
										/* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
											className: "font-semibold py-2",
											children: "Email"
										}), /* @__PURE__ */ jsx("td", { children: member.email })] })
									] })
								}),
								member.description && /* @__PURE__ */ jsx("div", {
									className: "mt-4 prose",
									dangerouslySetInnerHTML: { __html: member.description }
								})
							] })]
						}, member.id))
					})]
				}),
				page.document_blocks?.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "mt-16 space-y-12",
					children: page.document_blocks.map((block) => /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("div", {
							className: "\r\n                        inline-block\r\n                        bg-green-600\r\n                        text-white\r\n                        font-bold\r\n                        px-6\r\n                        py-3\r\n                        rounded\r\n                        mb-6\r\n                    ",
							children: block.title
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-3 sm:hidden",
							children: block.documents?.map((doc, index) => /* @__PURE__ */ jsxs("div", {
								className: "\r\n                                border\r\n                                rounded-xl\r\n                                p-4\r\n                            ",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "\r\n                                    flex\r\n                                    items-start\r\n                                    gap-3\r\n                                    mb-3\r\n                                ",
									children: [/* @__PURE__ */ jsx("span", {
										className: "\r\n                                        shrink-0\r\n                                        w-7\r\n                                        h-7\r\n                                        flex\r\n                                        items-center\r\n                                        justify-center\r\n                                        rounded-full\r\n                                        bg-gray-100\r\n                                        text-sm\r\n                                        font-semibold\r\n                                    ",
										children: index + 1
									}), /* @__PURE__ */ jsx("a", {
										href: `/storage/${doc.file}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "\r\n                                        text-blue-700\r\n                                        font-medium\r\n                                        leading-snug\r\n                                        break-words\r\n                                    ",
										children: doc.title
									})]
								}), /* @__PURE__ */ jsx("a", {
									href: `/storage/${doc.file}`,
									download: true,
									className: "\r\n                                    block\r\n                                    w-full\r\n                                    text-center\r\n                                    bg-green-600\r\n                                    text-white\r\n                                    px-4\r\n                                    py-2\r\n                                    rounded\r\n                                    text-sm\r\n                                    hover:bg-green-700\r\n                                ",
									children: "UNDUH DOKUMEN"
								})]
							}, doc.id))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "hidden sm:block overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full border-collapse",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "border-b",
									children: [
										/* @__PURE__ */ jsx("th", {
											className: "text-left py-3 w-20",
											children: "No"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "text-left py-3",
											children: "Nama Dokumen"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "text-left py-3 w-56",
											children: "Download"
										})
									]
								}) }), /* @__PURE__ */ jsx("tbody", { children: block.documents?.map((doc, index) => /* @__PURE__ */ jsxs("tr", {
									className: "border-b",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "py-4",
											children: index + 1
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-4",
											children: /* @__PURE__ */ jsx("a", {
												href: `/storage/${doc.file}`,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "\r\n                                                text-blue-700\r\n                                                hover:underline\r\n                                            ",
												children: doc.title
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-4",
											children: /* @__PURE__ */ jsx("a", {
												href: `/storage/${doc.file}`,
												download: true,
												className: "\r\n                                                inline-block\r\n                                                bg-green-600\r\n                                                text-white\r\n                                                px-5\r\n                                                py-2\r\n                                                rounded\r\n                                                hover:bg-green-700\r\n                                            ",
												children: "UNDUH DOKUMEN"
											})
										})
									]
								}, doc.id)) })]
							})
						})
					] }, block.id))
				}),
				page.gallery_blocks?.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "mt-16 space-y-12",
					children: page.gallery_blocks.map((block) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "\r\n                        inline-block\r\n                        bg-blue-600\r\n                        text-white\r\n                        font-bold\r\n                        px-6\r\n                        py-3\r\n                        rounded\r\n                        mb-6\r\n                    ",
						children: block.title
					}), block.galleries?.length > 0 ? /* @__PURE__ */ jsx("div", {
						className: "\r\n                            grid\r\n                            grid-cols-1\r\n                            md:grid-cols-3\r\n                            gap-6\r\n                        ",
						children: block.galleries.map((gallery) => /* @__PURE__ */ jsxs("a", {
							href: `/storage/${gallery.image}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "\r\n                                    border\r\n                                    rounded-xl\r\n                                    overflow-hidden\r\n                                    hover:shadow-lg\r\n                                    transition\r\n                                ",
							children: [/* @__PURE__ */ jsx("img", {
								src: `/storage/${gallery.image}`,
								alt: gallery.title,
								className: "\r\n                                        w-full\r\n                                        h-56\r\n                                        object-cover\r\n                                    "
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-semibold",
									children: gallery.title
								}), gallery.description && /* @__PURE__ */ jsx("div", {
									className: "\r\n                                                text-sm\r\n                                                text-gray-500\r\n                                                mt-2\r\n                                            ",
									children: gallery.description
								})]
							})]
						}, gallery.id))
					}) : /* @__PURE__ */ jsx("div", {
						className: "text-gray-500",
						children: "Tidak ada galeri."
					})] }, block.id))
				})
			]
		})
	] });
}
//#endregion
export { Show as default };
