import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
//#region resources/js/Components/lightswind/WoofyRevealDual.jsx
var isTouchDevice = () => typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
var WoofyRevealDual = ({ srcFront, srcReveal, alt = "", width = "100%", height = 500, className = "", maskRadius = .3, turbulenceIntensity = .2, animationSpeed = 1, appearDuration = .4, disappearDuration = .3, objectPosition = "center", onHover, onLeave }) => {
	const containerRef = useRef(null);
	const sceneRef = useRef(null);
	const rendererRef = useRef(null);
	const uniformsRef = useRef(null);
	const animationIdRef = useRef(null);
	const isInsideRef = useRef(false);
	const targetMouseRef = useRef(new THREE.Vector2(.5, .5));
	const lerpedMouseRef = useRef(new THREE.Vector2(.5, .5));
	const [isTouch] = useState(isTouchDevice);
	if (isTouch) return /* @__PURE__ */ jsx("div", {
		className: `relative overflow-hidden ${className}`,
		style: {
			width,
			height
		},
		children: /* @__PURE__ */ jsx("img", {
			src: srcFront,
			alt,
			className: "w-full h-full object-cover",
			style: { objectPosition }
		})
	});
	const vertexShader = `
    varying vec2 v_uv;
    void main() {
      v_uv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;
	const fragmentShader = `
    precision mediump float;

    uniform sampler2D u_texFront;
    uniform sampler2D u_texReveal;
    uniform vec2  u_mouse;
    uniform float u_time;
    uniform vec2  u_resolution;
    uniform float u_radius;
    uniform float u_speed;
uniform float u_imageAspect;
uniform float u_turbulence;
uniform vec2  u_imagePosition;

varying vec2 v_uv;

    vec3 hash33(vec3 p) {
      p = fract(p * vec3(443.8975, 397.2973, 491.1871));
      p += dot(p.zxy, p.yxz + 19.27);
      return fract(vec3(p.x * p.y, p.z * p.x, p.y * p.z));
    }

    float simplexNoise(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i  = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e  = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K2 * 2.0);
      vec3 d3 = d0 - (1.0 - 3.0 * K2);
      vec4 h  = max(0.6 - vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
      vec4 n  = h*h*h*h * vec4(
        dot(d0, hash33(i)      * 2.0 - 1.0),
        dot(d1, hash33(i + i1) * 2.0 - 1.0),
        dot(d2, hash33(i + i2) * 2.0 - 1.0),
        dot(d3, hash33(i + 1.0) * 2.0 - 1.0)
      );
      return 0.5 + 0.5 * 31.0 * dot(n, vec4(1.0));
    }

    vec2 curlNoise(vec2 p, float t) {
      const float e = 0.001;
      float n1 = simplexNoise(vec3(p.x, p.y + e, t));
      float n2 = simplexNoise(vec3(p.x, p.y - e, t));
      float n3 = simplexNoise(vec3(p.x + e, p.y, t));
      float n4 = simplexNoise(vec3(p.x - e, p.y, t));
      return vec2((n2-n1)/(2.0*e), (n4-n3)/(2.0*e));
    }

    float inkMarbling(vec2 p, float t, float intensity) {
      float result = 0.0;
      vec2 f1 = curlNoise(p * 1.5, t * 0.10) * intensity * 2.0;
      result += simplexNoise(vec3((p + f1*0.3)*2.0, t*0.15)) * 0.5;
      vec2 f2 = curlNoise(p * 3.0 + vec2(sin(t*0.2), cos(t*0.15)), t*0.20) * intensity;
      result += simplexNoise(vec3((p + f2*0.2)*4.0, t*0.25)) * 0.3;
      vec2 f3 = curlNoise(p * 6.0 + vec2(cos(t*0.3), sin(t*0.25)), t*0.30) * intensity*0.5;
      result += simplexNoise(vec3((p + f3*0.1)*8.0, t*0.40)) * 0.2;
      float dist  = length(p - 0.5);
      float angle = atan(p.y - 0.5, p.x - 0.5);
      result = mix(result, sin(dist*15.0 - angle*2.0 + t*0.3)*0.5+0.5, 0.3);
      return result * 0.5 + 0.5;
    }

vec2 coverUV(vec2 uv, float imgAspect) {
    float screenAspect = u_resolution.x / u_resolution.y;

    vec2 newUV = uv;

    // Jika layar lebih lebar daripada gambar,
    // gambar akan terpotong bagian atas/bawah.
    if (screenAspect > imgAspect) {
        float scale = screenAspect / imgAspect;

        newUV.y =
            (uv.y - u_imagePosition.y) / scale
            + u_imagePosition.y;
    }

    // Jika layar lebih sempit daripada gambar,
    // gambar akan terpotong bagian kiri/kanan.
    else {
        float scale = imgAspect / screenAspect;

        newUV.x =
            (uv.x - u_imagePosition.x) / scale
            + u_imagePosition.x;
    }

    return newUV;
}

    void main() {
      vec2 uv = v_uv;
      vec2 tc = coverUV(uv, u_imageAspect);
      vec3 colorFront  = texture2D(u_texFront,  tc).rgb;
      vec3 colorReveal = texture2D(u_texReveal, tc).rgb;

      float screenAspect   = u_resolution.x / u_resolution.y;
      vec2  uvCorrected    = vec2(uv.x * screenAspect, uv.y);
      vec2  mouseCorrected = vec2(u_mouse.x * screenAspect, u_mouse.y);
      float dist = distance(uvCorrected, mouseCorrected);

      float marble   = inkMarbling(uv * 2.0 + u_time * u_speed * 0.1, u_time, u_turbulence * 2.0);
      float jaggedDist = dist + (marble - 0.5) * u_turbulence * 2.0;
      float mask = u_radius > 0.001 ? step(jaggedDist, u_radius) : 0.0;

      vec3 finalColor = mix(colorFront, colorReveal, mask);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
	const initGL = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;
		const loader = new THREE.TextureLoader();
		const loadTex = (src) => new Promise((res) => {
			loader.load(src, (tex) => {
				tex.minFilter = THREE.LinearFilter;
				tex.magFilter = THREE.LinearFilter;
				tex.generateMipmaps = false;
				res(tex);
			});
		});
		Promise.all([loadTex(srcFront), loadTex(srcReveal)]).then(([texFront, texReveal]) => {
			const imageAspect = texFront.image.width / texFront.image.height;
			const W = container.clientWidth;
			const H = container.clientHeight;
			const scene = new THREE.Scene();
			sceneRef.current = scene;
			const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
			const parseObjectPosition = (position) => {
				const parts = position.split(" ");
				const parseX = (value) => {
					if (!value || value === "center") return .5;
					if (value === "left") return 0;
					if (value === "right") return 1;
					const number = parseFloat(value);
					return Number.isNaN(number) ? .5 : number / 100;
				};
				const parseY = (value) => {
					if (!value || value === "center") return .5;
					if (value === "top") return 0;
					if (value === "bottom") return 1;
					const number = parseFloat(value);
					return Number.isNaN(number) ? .5 : number / 100;
				};
				return new THREE.Vector2(parseX(parts[0]), parseY(parts[1]));
			};
			const imagePosition = parseObjectPosition(objectPosition);
			const uniforms = {
				u_texFront: { value: texFront },
				u_texReveal: { value: texReveal },
				u_mouse: { value: new THREE.Vector2(.5, .5) },
				u_time: { value: 0 },
				u_resolution: { value: new THREE.Vector2(W, H) },
				u_radius: { value: 0 },
				u_speed: { value: animationSpeed },
				u_imageAspect: { value: imageAspect },
				u_turbulence: { value: turbulenceIntensity },
				u_imagePosition: { value: imagePosition }
			};
			uniformsRef.current = uniforms;
			const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
				uniforms,
				vertexShader,
				fragmentShader,
				depthTest: false,
				depthWrite: false
			}));
			scene.add(mesh);
			const renderer = new THREE.WebGLRenderer({
				antialias: false,
				alpha: true,
				powerPreference: "high-performance"
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
			renderer.setSize(W, H);
			rendererRef.current = renderer;
			container.querySelector("canvas")?.remove();
			container.appendChild(renderer.domElement);
			Object.assign(renderer.domElement.style, {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 1
			});
			const tick = () => {
				const u = uniformsRef.current;
				if (!u) return;
				lerpedMouseRef.current.lerp(targetMouseRef.current, .1);
				u.u_mouse.value.copy(lerpedMouseRef.current);
				if (isInsideRef.current) u.u_time.value += .01 * animationSpeed;
				rendererRef.current?.render(sceneRef.current, camera);
				animationIdRef.current = requestAnimationFrame(tick);
			};
			renderer.render(scene, camera);
			tick();
		});
	}, [
		srcFront,
		srcReveal,
		maskRadius,
		turbulenceIntensity,
		animationSpeed,
		objectPosition
	]);
	const handleMouseMove = useCallback((e) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect || !uniformsRef.current) return;
		if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
			targetMouseRef.current.set((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height);
			if (!isInsideRef.current) {
				isInsideRef.current = true;
				onHover?.();
				const startR = uniformsRef.current.u_radius.value;
				const t0 = Date.now();
				const grow = () => {
					const p = Math.min((Date.now() - t0) / 1e3 / appearDuration, 1);
					const ease = 1 - Math.pow(1 - p, 3);
					uniformsRef.current.u_radius.value = startR + (maskRadius - startR) * ease;
					if (p < 1) requestAnimationFrame(grow);
				};
				grow();
			}
		} else if (isInsideRef.current) {
			isInsideRef.current = false;
			onLeave?.();
			const startR = uniformsRef.current.u_radius.value;
			const t0 = Date.now();
			const shrink = () => {
				const p = Math.min((Date.now() - t0) / 1e3 / disappearDuration, 1);
				uniformsRef.current.u_radius.value = startR * (1 - Math.pow(p, 3));
				if (p < 1) requestAnimationFrame(shrink);
			};
			shrink();
		}
	}, [
		maskRadius,
		appearDuration,
		disappearDuration,
		onHover,
		onLeave
	]);
	const handleDocMouseLeave = useCallback(() => {
		if (!isInsideRef.current || !uniformsRef.current) return;
		isInsideRef.current = false;
		onLeave?.();
		const startR = uniformsRef.current.u_radius.value;
		const t0 = Date.now();
		const shrink = () => {
			if (!uniformsRef.current) return;
			const p = Math.min((Date.now() - t0) / 1e3 / disappearDuration, 1);
			uniformsRef.current.u_radius.value = startR * (1 - Math.pow(p, 3));
			if (p < 1) requestAnimationFrame(shrink);
		};
		shrink();
	}, [disappearDuration, onLeave]);
	useEffect(() => {
		if (isTouch) return;
		initGL();
		document.addEventListener("mousemove", handleMouseMove, { passive: true });
		document.addEventListener("mouseleave", handleDocMouseLeave);
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleDocMouseLeave);
			if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
			rendererRef.current?.dispose();
		};
	}, [
		initGL,
		handleMouseMove,
		handleDocMouseLeave,
		isTouch
	]);
	if (isTouch) return /* @__PURE__ */ jsx("div", {
		className: `relative overflow-hidden ${className}`,
		style: {
			width,
			height
		},
		children: /* @__PURE__ */ jsx("img", {
			src: srcFront,
			alt,
			className: "w-full h-full object-cover",
			style: { objectPosition }
		})
	});
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: `relative overflow-hidden ${className}`,
		style: {
			width,
			height
		},
		children: /* @__PURE__ */ jsx("img", {
			src: srcFront,
			alt,
			className: "w-full h-full object-cover",
			style: {
				position: "relative",
				zIndex: 0
			}
		})
	});
};
//#endregion
//#region resources/js/Pages/Home/Components/Hero.jsx
function Hero({ setting }) {
	const srcFront = setting?.hero_image_1 ? `/storage/${setting.hero_image_1}` : "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80";
	const srcReveal = setting?.hero_image_2 ? `/storage/${setting.hero_image_2}` : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80";
	const headline = "Pusat Penjamin Mutu Politeknik Balekambang";
	const parallaxRef = useRef(null);
	const [device, setDevice] = useState("desktop");
	useEffect(() => {
		const updateDevice = () => {
			const width = window.innerWidth;
			if (width < 640) setDevice("mobile");
			else if (width < 1024) setDevice("tablet");
			else setDevice("desktop");
		};
		updateDevice();
		window.addEventListener("resize", updateDevice);
		return () => {
			window.removeEventListener("resize", updateDevice);
		};
	}, []);
	const config = {
		mobile: {
			height: "72vh",
			minHeight: "520px",
			objectPosition: "71% center",
			overlay: "linear-gradient(to bottom, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.35) 38%, rgba(15,23,42,0.08) 65%, rgba(15,23,42,0.25) 100%)"
		},
		tablet: {
			height: "76vh",
			minHeight: "520px",
			objectPosition: "68% center",
			overlay: "linear-gradient(to right, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.45) 38%, rgba(15,23,42,0.12) 70%, rgba(15,23,42,0.05) 100%)"
		},
		desktop: {
			height: "82vh",
			minHeight: "560px",
			objectPosition: "78% center",
			overlay: "linear-gradient(to right, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.52) 34%, rgba(15,23,42,0.16) 62%, rgba(15,23,42,0.03) 100%)"
		}
	}[device];
	useEffect(() => {
		if (device !== "desktop") {
			if (parallaxRef.current) parallaxRef.current.style.transform = "translate3d(0, 0, 0)";
			return;
		}
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (parallaxRef.current) {
						const offset = window.scrollY * .12;
						parallaxRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
					}
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [device]);
	const titleWords = (setting?.hero_title || headline).split(" ");
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                        @keyframes fadeSlideUp {
                            from {
                                opacity: 0;
                                transform: translateY(28px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        @keyframes wordUp {
                            from {
                                opacity: 0;
                                transform: translateY(100%);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .hero-eyebrow {
                            animation: fadeSlideUp 0.7s ease both 0.05s;
                        }

                        .hero-title-word-wrap {
                            display: inline-block;
                            overflow: hidden;
                            vertical-align: top;
                        }

                        .hero-title-word {
                            display: inline-block;
                            animation: wordUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
                        }

                        .hero-sub {
                            animation: fadeSlideUp 0.7s ease both 0.35s;
                        }

                        .hero-btns {
                            animation: fadeSlideUp 0.7s ease both 0.5s;
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .hero-eyebrow,
                            .hero-title-word,
                            .hero-sub,
                            .hero-btns {
                                animation: none !important;
                            }
                        }
                    ` } }), /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden",
		style: {
			height: config.height,
			minHeight: config.minHeight
		},
		children: [
			/* @__PURE__ */ jsx("div", {
				ref: parallaxRef,
				className: "absolute inset-0 z-0",
				style: { willChange: "transform" },
				children: /* @__PURE__ */ jsx(WoofyRevealDual, {
					srcFront,
					srcReveal,
					alt: "Hero background",
					width: "100%",
					height: "100%",
					maskRadius: .3,
					turbulenceIntensity: .18,
					animationSpeed: 1,
					appearDuration: .4,
					disappearDuration: .3,
					objectPosition: config.objectPosition
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 z-10 pointer-events-none",
				style: { background: config.overlay }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 z-10 pointer-events-none",
				style: { background: "linear-gradient(to top, rgba(2,20,32,0.42) 0%, rgba(2,20,32,0) 38%)" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "\r\n                        relative z-20 h-full\r\n                        flex\r\n                        items-start\r\n                        lg:items-center\r\n                    ",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl w-full mx-auto px-5 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "\r\n                                max-w-xs\r\n                                sm:max-w-lg\r\n                                lg:max-w-xl\r\n                                xl:max-w-2xl\r\n\r\n                                pt-10\r\n                                sm:pt-16\r\n                                md:pt-20\r\n                                lg:pt-0\r\n                            ",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "\r\n                                    hero-eyebrow\r\n                                    inline-flex\r\n                                    items-center\r\n                                    gap-3\r\n                                    mb-4\r\n                                    sm:mb-5\r\n                                ",
								children: [/* @__PURE__ */ jsx("span", { className: "w-8 sm:w-10 h-[3px] rounded-full bg-green-500 shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "\r\n                                        text-[11px]\r\n                                        sm:text-xs\r\n                                        md:text-sm\r\n                                        font-semibold\r\n                                        uppercase\r\n                                        tracking-[0.25em]\r\n                                        text-white\r\n                                    ",
									children: "Pusat Penjaminan Mutu"
								})]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "\r\n                                    text-2xl\r\n                                    sm:text-3xl\r\n                                    md:text-4xl\r\n                                    lg:text-5xl\r\n                                    xl:text-6xl\r\n                                    font-bold\r\n                                    leading-[1.15]\r\n                                    sm:leading-[1.12]\r\n                                    tracking-tight\r\n                                    text-white\r\n                                ",
								children: titleWords.map((word, i) => /* @__PURE__ */ jsx("span", {
									className: "hero-title-word-wrap mr-2 sm:mr-3",
									children: /* @__PURE__ */ jsx("span", {
										className: "hero-title-word",
										style: { animationDelay: `${.15 + i * .08}s` },
										children: word
									})
								}, i))
							}),
							/* @__PURE__ */ jsx("p", {
								className: "\r\n                                    hero-sub\r\n                                    mt-3\r\n                                    sm:mt-4\r\n                                    text-sm\r\n                                    sm:text-base\r\n                                    lg:text-lg\r\n                                    leading-relaxed\r\n                                    text-slate-200/90\r\n                                ",
								children: setting?.hero_subtitle || "Mendorong budaya mutu yang berkelanjutan melalui PPEPP, Audit Mutu Internal, dan peningkatan kualitas pendidikan."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "\r\n                                    hero-btns\r\n                                    mt-5\r\n                                    sm:mt-6\r\n                                    flex\r\n                                    flex-col\r\n                                    sm:flex-row\r\n                                    gap-2.5\r\n                                    sm:gap-3\r\n                                ",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/dokumen",
									className: "\r\n                                        px-5\r\n                                        py-3\r\n                                        text-sm\r\n                                        bg-green-600\r\n                                        hover:bg-green-700\r\n                                        rounded-xl\r\n                                        font-medium\r\n                                        transition\r\n                                        text-center\r\n                                        text-white\r\n                                        shadow-lg\r\n                                        w-fit\r\n                                    ",
									children: "Dokumen Mutu"
								}), /* @__PURE__ */ jsx("a", {
									href: "/berita",
									className: "\r\n                                        hidden\r\n                                        sm:inline-flex\r\n                                        px-5\r\n                                        py-3\r\n                                        text-sm\r\n                                        border\r\n                                        border-white/60\r\n                                        bg-white/10\r\n                                        hover:bg-white/20\r\n                                        rounded-xl\r\n                                        font-medium\r\n                                        transition\r\n                                        text-center\r\n                                        text-white\r\n                                        backdrop-blur-sm\r\n                                        shadow-lg\r\n                                        w-fit\r\n                                    ",
									children: "Berita Terbaru"
								})]
							})
						]
					})
				})
			})
		]
	})] });
}
//#endregion
export { Hero as default };
