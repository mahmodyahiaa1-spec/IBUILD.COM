import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { onImgError } from "@/lib/imageFallback";
import { useSwipe } from "@/lib/useSwipe";
import lobby from "@/assets/project-lobby.jpg";
import living from "@/assets/project-living.jpg";
import bath from "@/assets/project-bath.jpg";
import facade from "@/assets/project-facade.jpg";

const shots = [
  { img: lobby, caption: "Hotel Lobby — Sharm El Sheikh" },
  { img: living, caption: "Living Room — Heliopolis Villa" },
  { img: bath, caption: "Master Bath — Mostakbal City" },
  { img: facade, caption: "Villa Façade — Cairo" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    lastTrigger.current = triggerRefs.current[open] ?? null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      lastTrigger.current?.focus();
    };
  }, [open]);

  return (
    <section
      id="gallery"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Inside the work"
          title="Detail"
          italicWord="gallery"
          subtext="Close-up moments from finished spaces across our portfolio. Click any tile to enlarge."
        />
        <ul
          role="list"
          aria-label="Project detail gallery"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 list-none p-0"
        >
          {shots.map((s, i) => (
            <li key={s.caption} role="listitem" className="contents">
              <motion.button
                ref={(el) => { triggerRefs.current[i] = el; }}
                type="button"
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-60px" }}
                aria-label={`Enlarge image: ${s.caption}`}
                aria-haspopup="dialog"
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-stroke bg-surface text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <img
                  src={s.img}
                  alt={s.caption}
                  onError={onImgError}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/0 to-transparent" />
                {/* Always-visible zoom affordance */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 h-8 rounded-full bg-bg/70 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.18em] text-text-primary opacity-90 group-hover:bg-text-primary group-hover:text-bg transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                  </svg>
                  Zoom
                </span>
                <figcaption className="absolute bottom-3 left-3 right-3 text-[11px] uppercase tracking-[0.2em] text-text-primary/90">
                  {s.caption}
                </figcaption>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            shots={shots}
            index={open}
            onIndex={setOpen}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  shots,
  index,
  onIndex,
  onClose,
}: {
  shots: { img: string; caption: string }[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const total = shots.length;
  const current = shots[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  const next = () => onIndex((index + 1) % total);
  const prev = () => onIndex((index - 1 + total) % total);
  const swipe = useSwipe((dir) => (dir === "left" ? next() : prev()));

  useEffect(() => {
    const focusables = () => {
      const root = dialogRef.current;
      if (!root) return [] as HTMLElement[];
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
    };
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); return; }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) { e.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) { e.preventDefault(); last.focus(); }
      } else {
        if (active === last || !dialogRef.current?.contains(active)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery viewer — ${current.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9998] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
      onClick={onClose}
      {...swipe}
    >
      <button
        ref={firstFocusRef}
        type="button"
        aria-label="Close gallery viewer"
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary text-lg hover:bg-white hover:text-bg transition-colors z-10"
      >
        ✕
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary hover:bg-white hover:text-bg transition-colors z-10"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary hover:bg-white hover:text-bg transition-colors z-10"
      >
        ›
      </button>

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[92vw] max-h-[78vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        aria-roledescription="image"
        aria-label={`${current.caption}, ${index + 1} of ${total}`}
      >
        <img
          src={current.img}
          alt={current.caption}
          onError={onImgError}
          draggable={false}
          className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-2xl select-none"
        />
        <figcaption className="text-xs uppercase tracking-[0.3em] text-text-primary/80">
          {current.caption} <span className="text-muted ml-3">{index + 1} / {total}</span>
        </figcaption>
      </motion.figure>

      {/* Thumbnail strip — quick browse to other images */}
      <div
        role="tablist"
        aria-label="Choose image"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[92vw] overflow-x-auto px-2 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {shots.map((g, i) => (
          <button
            key={g.caption + i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${g.caption}`}
            onClick={() => onIndex(i)}
            className={`relative h-14 w-20 shrink-0 rounded-md overflow-hidden border transition-all ${
              i === index ? "border-text-primary scale-105" : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={g.img} alt="" onError={onImgError} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
