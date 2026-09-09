// resources/js/Components/lightswind/WoofyRevealDual.jsx

import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

/* ── Deteksi apakah touch device (mobile/tablet) ── */
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Baris props — tambah satu prop baru
const WoofyRevealDual = ({
  srcFront,
  srcReveal,
  alt           = '',
  width         = '100%',
  height        = 500,
  className     = '',
  maskRadius    = 0.30,
  turbulenceIntensity = 0.20,
  animationSpeed      = 1.0,
  appearDuration      = 0.4,
  disappearDuration   = 0.3,
  objectPosition      = 'center',   // ← TAMBAH INI
  onHover,
  onLeave,
}) => {
  const containerRef    = useRef(null);
  const sceneRef        = useRef(null);
  const rendererRef     = useRef(null);
  const uniformsRef     = useRef(null);
  const animationIdRef  = useRef(null);
  const isInsideRef     = useRef(false);
  const targetMouseRef  = useRef(new THREE.Vector2(0.5, 0.5));
  const lerpedMouseRef  = useRef(new THREE.Vector2(0.5, 0.5));
  const [isTouch]       = useState(isTouchDevice);

  /* ── EARLY RETURN untuk mobile: render gambar statis saja ── */
  if (isTouch) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        <img
          src={srcFront}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition }} 
        />
      </div>
    );
  }

  /* ────────────────────────────── VERTEX SHADER ──────────────────────────── */
  const vertexShader = /* glsl */`
    varying vec2 v_uv;
    void main() {
      v_uv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  /* ────────────────────────────── FRAGMENT SHADER ────────────────────────── */
  const fragmentShader = /* glsl */`
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
      if (screenAspect > imgAspect) {
        float scale = screenAspect / imgAspect;
        newUV.y = (uv.y - 0.5) / scale + 0.5;
      } else {
        float scale = imgAspect / screenAspect;
        if (screenAspect < 0.8) {
          newUV.x = (uv.x - 0.5) / scale + 0.80;
        } else {
          newUV.x = (uv.x - 0.5) / scale + 0.5;
        }
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

  /* ─────────────────────────── INIT THREE.JS ─────────────────────────────── */
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

      const scene  = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_texFront:    { value: texFront },
        u_texReveal:   { value: texReveal },
        u_mouse:       { value: new THREE.Vector2(0.5, 0.5) },
        u_time:        { value: 0.0 },
        u_resolution:  { value: new THREE.Vector2(W, H) },
        u_radius:      { value: 0.0 },
        u_speed:       { value: animationSpeed },
        u_imageAspect: { value: imageAspect },
        u_turbulence:  { value: turbulenceIntensity },
      };
      uniformsRef.current = uniforms;

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          uniforms, vertexShader, fragmentShader,
          depthTest: false, depthWrite: false,
        })
      );
      scene.add(mesh);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
      /* ── Turunkan resolusi render 50% untuk desktop low-end ── */
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      rendererRef.current = renderer;

      container.querySelector('canvas')?.remove();
      container.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, {
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%', zIndex: 1,
      });

const tick = () => {
  const u = uniformsRef.current;
  if (!u) return;

  lerpedMouseRef.current.lerp(targetMouseRef.current, 0.1);
  u.u_mouse.value.copy(lerpedMouseRef.current);

  /* update time hanya saat hover */
  if (isInsideRef.current) {
    u.u_time.value += 0.01 * animationSpeed;
  }

  /* render SELALU — agar animasi shrink tetap terlihat */
  rendererRef.current?.render(sceneRef.current, camera);

  animationIdRef.current = requestAnimationFrame(tick);
};

      /* Render pertama kali (tampilkan gambar front) */
      renderer.render(scene, camera);
      tick();
    });
  }, [srcFront, srcReveal, maskRadius, turbulenceIntensity, animationSpeed]);

  /* ──────────────────────────── MOUSE HANDLER ────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !uniformsRef.current) return;

    const inside =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom;

    if (inside) {
      targetMouseRef.current.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      );
      if (!isInsideRef.current) {
        isInsideRef.current = true;
        onHover?.();
        const startR = uniformsRef.current.u_radius.value;
        const t0 = Date.now();
        const grow = () => {
          const p = Math.min((Date.now() - t0) / 1000 / appearDuration, 1);
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
        const p = Math.min((Date.now() - t0) / 1000 / disappearDuration, 1);
        uniformsRef.current.u_radius.value = startR * (1 - Math.pow(p, 3));
        if (p < 1) requestAnimationFrame(shrink);
      };
      shrink();
    }
  }, [maskRadius, appearDuration, disappearDuration, onHover, onLeave]);

// Tambah callback baru — letakkan setelah handleMouseMove
const handleDocMouseLeave = useCallback(() => {
  if (!isInsideRef.current || !uniformsRef.current) return;
  isInsideRef.current = false;
  onLeave?.();
  const startR = uniformsRef.current.u_radius.value;
  const t0 = Date.now();
  const shrink = () => {
    if (!uniformsRef.current) return;
    const p = Math.min((Date.now() - t0) / 1000 / disappearDuration, 1);
    uniformsRef.current.u_radius.value = startR * (1 - Math.pow(p, 3));
    if (p < 1) requestAnimationFrame(shrink);
  };
  shrink();
}, [disappearDuration, onLeave]);

// Edit useEffect — tambah listener mouseleave
  useEffect(() => {
    if (isTouch) return; // ← guard di dalam effect, bukan early return komponen
    initGL();
    document.addEventListener('mousemove',  handleMouseMove,     { passive: true });
    document.addEventListener('mouseleave', handleDocMouseLeave);
    return () => {
      document.removeEventListener('mousemove',  handleMouseMove);
      document.removeEventListener('mouseleave', handleDocMouseLeave);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      rendererRef.current?.dispose();
    };
  }, [initGL, handleMouseMove, handleDocMouseLeave, isTouch]);

  // ✅ Early return SETELAH semua hook
  if (isTouch) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
        <img
          src={srcFront}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        src={srcFront}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ position: 'relative', zIndex: 0 }}
      />
    </div>
  );
};

export default WoofyRevealDual;