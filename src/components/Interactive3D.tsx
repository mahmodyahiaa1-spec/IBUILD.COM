import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive 3D architectural piece. Reacts to pointer hover and
 * supports pointer/touch drag to rotate the model. Shows a small
 * tooltip near the cursor while interacting.
 */
export function Interactive3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(-18);
  const ry = useMotionValue(28);
  const srx = useSpring(rx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 90, damping: 18, mass: 0.6 });

  const [hint, setHint] = useState<{ x: number; y: number; visible: boolean; dragging: boolean }>({
    x: 0, y: 0, visible: false, dragging: false,
  });
  const dragState = useRef<{ active: boolean; lastX: number; lastY: number; rx: number; ry: number } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const setHover = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      const x = (cx - r.left) / r.width - 0.5;
      const y = (cy - r.top) / r.height - 0.5;
      ry.set(28 + x * 60);
      rx.set(-18 - y * 35);
      setHint((h) => ({ ...h, x: cx - r.left, y: cy - r.top, visible: true }));
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = dragState.current;
      if (d?.active) {
        const dx = e.clientX - d.lastX;
        const dy = e.clientY - d.lastY;
        ry.set(d.ry + dx * 0.45);
        rx.set(d.rx - dy * 0.4);
        const r = el.getBoundingClientRect();
        setHint((h) => ({ ...h, x: e.clientX - r.left, y: e.clientY - r.top, visible: true }));
      } else if (e.pointerType !== "touch") {
        setHover(e.clientX, e.clientY);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      el.setPointerCapture?.(e.pointerId);
      dragState.current = {
        active: true,
        lastX: e.clientX,
        lastY: e.clientY,
        rx: rx.get(),
        ry: ry.get(),
      };
      setHint((h) => ({ ...h, dragging: true, visible: true }));
    };
    const endDrag = (e: PointerEvent) => {
      if (dragState.current?.active) {
        try { el.releasePointerCapture?.(e.pointerId); } catch { /* noop */ }
      }
      dragState.current = null;
      setHint((h) => ({ ...h, dragging: false }));
    };

    const onLeave = () => {
      if (dragState.current?.active) return;
      rx.set(-18); ry.set(28);
      setHint((h) => ({ ...h, visible: false }));
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rx, ry]);

  // Idle drift so the piece feels alive without input.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      if (!dragState.current?.active) {
        const dt = (t - start) / 1000;
        ry.set(ry.get() + Math.sin(dt * 0.6) * 0.04);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ry]);

  const transform = useTransform([srx, sry], (vals) => {
    const [x, y] = vals as number[];
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  });

  return (
    <div
      ref={wrap}
      role="img"
      aria-label="Interactive 3D villa model — drag to rotate"
      className="absolute inset-0 flex items-center justify-center touch-pan-y select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        style={{ transform, transformStyle: "preserve-3d" }}
        className="relative w-[420px] h-[420px] md:w-[560px] md:h-[560px] pointer-events-none"
      >
        <Plate />
        <Box w={260} h={150} d={180} x={-130} y={-40} z={-90} accent />
        <Box w={180} h={90} d={140} x={-90} y={-130} z={-70} />
        <Box w={120} h={80} d={140} x={130} y={-15} z={-70} />
        <Box w={300} h={6} d={120} x={-150} y={110} z={20} flat />
      </motion.div>

      <div className="absolute inset-0 [background:radial-gradient(40%_30%_at_50%_60%,rgba(137,170,204,0.18),transparent_70%)] pointer-events-none" />

      {/* Floating tooltip */}
      <div
        role="tooltip"
        aria-hidden={!hint.visible}
        className={`pointer-events-none absolute z-10 px-3 py-1.5 rounded-full bg-bg/80 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.22em] text-text-primary whitespace-nowrap transition-opacity duration-200 ${
          hint.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: hint.x + 16, top: hint.y + 16 }}
      >
        {hint.dragging ? "Rotating…" : "Drag to rotate"}
      </div>
    </div>
  );
}

function Plate() {
  return (
    <div
      style={{
        transform: "rotateX(90deg) translateZ(-115px)",
        transformStyle: "preserve-3d",
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[420px] rounded-md"
    >
      <div
        className="w-full h-full"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 32px)",
          maskImage: "radial-gradient(closest-side, #000, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, #000, transparent)",
        }}
      />
    </div>
  );
}

function Box({
  w, h, d, x, y, z, accent = false, flat = false,
}: { w: number; h: number; d: number; x: number; y: number; z: number; accent?: boolean; flat?: boolean }) {
  const faces: { t: string; cls?: string }[] = [
    { t: `translateZ(${d / 2}px)` },
    { t: `translateZ(-${d / 2}px) rotateY(180deg)` },
    { t: `rotateY(90deg) translateZ(${w / 2}px)`, cls: "w-[var(--d)] left-1/2 -translate-x-1/2" },
    { t: `rotateY(-90deg) translateZ(${w / 2}px)`, cls: "w-[var(--d)] left-1/2 -translate-x-1/2" },
    { t: `rotateX(90deg) translateZ(${h / 2}px)`, cls: "h-[var(--d)] top-1/2 -translate-y-1/2" },
    { t: `rotateX(-90deg) translateZ(${h / 2}px)`, cls: "h-[var(--d)] top-1/2 -translate-y-1/2" },
  ];
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: w,
        height: h,
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
        transformStyle: "preserve-3d",
        ["--d" as unknown as string]: `${d}px`,
      } as React.CSSProperties}
    >
      {faces.map((f, i) => (
        <div
          key={i}
          className={`absolute inset-0 border ${accent ? "border-white/25" : "border-white/15"} ${f.cls ?? ""}`}
          style={{
            transform: f.t,
            background: flat
              ? "linear-gradient(180deg, rgba(137,170,204,0.22), rgba(78,133,191,0.08))"
              : accent
                ? "linear-gradient(180deg, rgba(28,28,32,0.85), rgba(10,10,12,0.92))"
                : "linear-gradient(180deg, rgba(22,22,26,0.78), rgba(10,10,12,0.92))",
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.04)",
          }}
        >
          {!flat && (
            <div
              className="absolute inset-2 opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 18px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 22px)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
