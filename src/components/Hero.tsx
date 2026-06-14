import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import villaBefore from "@/assets/villa-before.jpg";
import villaAfter from "@/assets/villa-after.jpg";
import { onImgError } from "@/lib/imageFallback";

const roles = ["architect", "builder", "designer", "developer"];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [stage, setStage] = useState<0 | 1>(0);

  // Scroll-driven before → after villa reveal across a 2x viewport section.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const clipInset = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);
  const afterClip = useTransform(clipInset, (v) => `inset(0 0 0 ${v})`);
  const dividerLeft = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);
  const progressPct = useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`);
  const [pctText, setPctText] = useState("0%");
  useMotionValueEvent(progressPct, "change", (v) => setPctText(v));

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  // Smooth snap between stage 0 (before) and stage 1 (after) on scroll-end.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let timer: number | undefined;
    let lastY = window.scrollY;
    let snapping = false;

    const snap = () => {
      if (snapping) return;
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      // Only snap if the user has finished scrolling within the hero.
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;
      const direction = window.scrollY - lastY; // >0 down, <0 up
      let target: number;
      if (direction > 0) target = progress > 0.15 ? 1 : 0;
      else if (direction < 0) target = progress < 0.85 ? 0 : 1;
      else target = progress < 0.5 ? 0 : 1;
      if (Math.abs(progress - target) < 0.02) {
        setStage(target as 0 | 1);
        return;
      }
      snapping = true;
      const top = root.offsetTop + target * total;
      window.scrollTo({ top, behavior: "smooth" });
      setStage(target as 0 | 1);
      window.setTimeout(() => { snapping = false; }, 700);
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(snap, 140);
    };
    const onScrollStart = () => { lastY = window.scrollY; };

    window.addEventListener("wheel", onScrollStart, { passive: true });
    window.addEventListener("touchstart", onScrollStart, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", onScrollStart);
      window.removeEventListener("touchstart", onScrollStart);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
        .from(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 }, "-=0.8");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    // 200vh outer gives us room for the scroll wipe; the inner is sticky.
    <section id="home" ref={rootRef} className="relative w-full h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Before image (base layer) */}
        <div className="absolute inset-0">
          <img
            src={villaBefore}
            alt="Villa before construction"
            onError={onImgError}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </div>
        {/* After image (revealed by scroll) */}
        <motion.div className="absolute inset-0" style={{ clipPath: afterClip }}>
          <img
            src={villaAfter}
            alt="Villa after construction"
            onError={onImgError}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>

        {/* Dividing line follows the reveal */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px bg-text-primary/60 z-10 pointer-events-none"
          style={{ left: dividerLeft }}
        >
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-text-primary/90 flex items-center justify-center text-bg text-xs shadow-lg">↔</span>
        </motion.div>

        {/* Before/After labels */}
        <div className="absolute top-1/2 left-6 md:left-10 -translate-y-1/2 z-10 text-text-primary/90 text-xs uppercase tracking-[0.3em] backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full">
          Before
        </div>
        <div className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 z-10 text-text-primary/90 text-xs uppercase tracking-[0.3em] backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full">
          After
        </div>

        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

        {/* Build progress indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-primary/80">Build</span>
          <div className="relative w-40 md:w-56 h-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left h-full accent-gradient rounded-full"
              style={{ scaleX: progressScale, width: "100%" }}
            />
          </div>
          <span className="text-[10px] tabular-nums text-text-primary/80 w-8 text-right">{pctText}</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-primary/60 hidden md:inline">
            {stage === 0 ? "Foundation" : "Finished"}
          </span>
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
            Collection '26 — Cairo, Egypt
          </p>
          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
            i Build<span className="text-[0.4em] align-super not-italic"></span>
          </h1>
          <p className="blur-in text-lg md:text-2xl text-text-primary/90 mb-4">
            A modern{" "}
            <span
              key={roleIndex}
              className="font-display italic text-text-primary animate-role-fade-in inline-block"
            >
              {roles[roleIndex]}
            </span>{" "}
            studio in Cairo.
          </p>
          <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
            Scroll to watch a villa rise — from raw foundation to finished home.
          </p>
          <div className="blur-in inline-flex flex-wrap justify-center gap-4">
            <a href="#projects" className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg transition-all hover:scale-105">
              See projects
            </a>
            <a href="#contact" className="group relative rounded-full text-sm px-7 py-3.5 text-text-primary transition-transform hover:scale-105">
              <span className="absolute inset-0 rounded-full border-2 border-stroke group-hover:border-transparent" />
              <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative inline-flex items-center bg-bg rounded-full">Reach out →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
