import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { onImgError } from "@/lib/imageFallback";
import finishes from "@/assets/service-finishes.jpg";
import engineering from "@/assets/service-engineering.jpg";
import specialized from "@/assets/service-specialized.jpg";
import interior from "@/assets/service-interior.jpg";
import exterior from "@/assets/service-exterior.jpg";
import hospitality from "@/assets/service-hospitality.jpg";

const slides = [
  { n: "01", title: "Architectural Finishes", caption: "Onyx, brass, marble — every surface considered.", img: finishes },
  { n: "02", title: "Engineering at Source", caption: "Structural, MEP and site engineering tailored to each build.", img: engineering },
  { n: "03", title: "Specialized Craft", caption: "Bespoke joinery, façades and premium fit-outs.", img: specialized },
  { n: "04", title: "Interior Atmospheres", caption: "Light, material and proportion in dialogue.", img: interior },
  { n: "05", title: "Exterior Presence", caption: "Façades that perform at twilight and at dawn.", img: exterior },
  { n: "06", title: "Hospitality Suites", caption: "Spaces that hold guests like a held breath.", img: hospitality },
];

// Tunable response curve. Higher stiffness = snappier reaction to scroll speed.
const SPRING_CONFIG = { stiffness: 110, damping: 28, mass: 0.5 };

export function ImmersiveJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced) return <ReducedJourney />;

  return <AnimatedJourney containerRef={ref} />;
}

function AnimatedJourney({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);

  const x = useTransform(smooth, [0, 1], ["6vw", `-${(slides.length - 1) * 86 + 8}vw`]);
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const idx = Math.min(slides.length - 1, Math.max(0, Math.round(v * (slides.length - 1))));
    setActive(idx);
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative bg-bg"
      style={{ height: `${slides.length * 100}vh` }}
      aria-roledescription="carousel"
      aria-label="Immersive services journey"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        role="region"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(60%_60%_at_50%_40%,rgba(78,133,191,0.18),transparent_70%)]" />

        <div className="absolute top-10 md:top-14 left-6 md:left-12 z-20 max-w-md">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-2">Six chapters</p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-[1.05]">
            An <span className="italic">immersive</span> journey<br />through our craft.
          </h2>
        </div>

        <div className="absolute top-10 md:top-14 right-6 md:right-12 z-20 text-right font-display text-text-primary" aria-hidden="true">
          <div className="text-5xl md:text-6xl italic leading-none tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted mt-1">
            of {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        <motion.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center will-change-transform"
        >
          {slides.map((s, i) => (
            <JourneySlide key={s.n} slide={s} index={i} progress={smooth} total={slides.length} active={i === active} />
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[min(560px,80vw)]">
          <div className="flex items-center gap-3 w-full">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted hidden md:inline">Scroll</span>
            <div
              className="relative flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden"
              role="progressbar"
              aria-label="Journey progress"
              aria-valuemin={1}
              aria-valuemax={slides.length}
              aria-valuenow={active + 1}
            >
              <motion.div className="absolute inset-y-0 left-0 origin-left h-full accent-gradient" style={{ scaleX: barScale, width: "100%" }} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted hidden md:inline">Touch</span>
          </div>
          <div className="flex gap-1.5" role="tablist" aria-label="Chapters">
            {slides.map((s, i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Chapter ${s.n}: ${s.title}`}
                className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-text-primary" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneySlide({
  slide,
  index,
  progress,
  total,
  active,
}: {
  slide: { n: string; title: string; caption: string; img: string };
  index: number;
  progress: ReturnType<typeof useSpring>;
  total: number;
  active: boolean;
}) {
  const center = index / (total - 1);
  const window = 1 / (total - 1);
  const local = useTransform(progress, (v) => {
    const d = Math.abs(v - center) / window;
    return Math.max(0, 1 - d);
  });
  const scale = useTransform(local, [0, 1], [0.92, 1]);
  const imgY = useTransform(local, [0, 1], ["8%", "-6%"]);
  const opacity = useTransform(local, [0, 1], [0.55, 1]);

  return (
    <motion.article
      style={{ scale, opacity }}
      role="group"
      aria-roledescription="slide"
      aria-label={`Chapter ${slide.n} of ${String(total).padStart(2, "0")}: ${slide.title}`}
      aria-current={active ? "true" : undefined}
      className="relative w-[86vw] h-[78vh] mx-0 shrink-0 rounded-3xl overflow-hidden border border-stroke bg-surface"
    >
      <motion.img
        src={slide.img}
        onError={onImgError}
        alt={slide.title}
        loading="lazy"
        width={1280}
        height={1600}
        style={{ y: imgY }}
        className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />

      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-text-primary">
        <span className="text-[10px] tracking-[0.4em] text-text-primary/60 mb-3">CHAPTER {slide.n}</span>
        <h3 className="font-display text-3xl md:text-5xl italic leading-[1.05] max-w-[18ch]">
          {slide.title}
        </h3>
        <p className="mt-4 text-sm md:text-base text-text-primary/80 max-w-[40ch]">
          {slide.caption}
        </p>
      </div>
    </motion.article>
  );
}

/** Static, no-scroll-hijack fallback for users that prefer reduced motion. */
function ReducedJourney() {
  return (
    <section
      id="journey"
      className="relative bg-bg py-20 md:py-28"
      aria-label="Services journey"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-10 md:mb-14 max-w-md">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-2">Six chapters</p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-[1.05]">
            An <span className="italic">immersive</span> journey<br />through our craft.
          </h2>
        </div>
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0">
          {slides.map((s) => (
            <li key={s.n} className="relative rounded-3xl overflow-hidden border border-stroke bg-surface aspect-[16/11]">
              <img src={s.img} alt={s.title} onError={onImgError} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-text-primary">
                <span className="text-[10px] tracking-[0.4em] text-text-primary/60 mb-2">CHAPTER {s.n}</span>
                <h3 className="font-display text-2xl md:text-3xl italic leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-text-primary/80 max-w-[44ch]">{s.caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
