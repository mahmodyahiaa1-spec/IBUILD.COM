import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { onImgError } from "@/lib/imageFallback";
import { useSwipe } from "@/lib/useSwipe";
import hotel from "@/assets/project-hotel.jpg";
import villa from "@/assets/project-villa.jpg";
import kids from "@/assets/project-kids.jpg";
import kitchen from "@/assets/project-kitchen.jpg";
import lobby from "@/assets/project-lobby.jpg";
import living from "@/assets/project-living.jpg";
import bath from "@/assets/project-bath.jpg";
import facade from "@/assets/project-facade.jpg";
import hospitality from "@/assets/service-hospitality.jpg";
import interior from "@/assets/service-interior.jpg";
import exterior from "@/assets/service-exterior.jpg";
import finishes from "@/assets/service-finishes.jpg";

type Project = {
  title: string;
  place: string;
  img: string;
  span: string;
  ratio: string;
  gallery: { img: string; caption: string }[];
};

const projects: Project[] = [
  {
    title: "Hotel Project", place: "Sharm El Sheikh", img: hotel,
    span: "md:col-span-7", ratio: "aspect-[16/11]",
    gallery: [
      { img: hotel, caption: "Hotel facade — Sharm El Sheikh" },
      { img: lobby, caption: "Arrival lobby" },
      { img: hospitality, caption: "Signature suite" },
      { img: bath, caption: "Suite bathroom" },
    ],
  },
  {
    title: "3D Design Villa", place: "Heliopolis", img: villa,
    span: "md:col-span-5", ratio: "aspect-[16/11]",
    gallery: [
      { img: villa, caption: "Villa render — Heliopolis" },
      { img: exterior, caption: "Twilight exterior" },
      { img: interior, caption: "Living atmosphere" },
      { img: facade, caption: "Façade study" },
    ],
  },
  {
    title: "Kids Bedrooms", place: "Mostakbal City", img: kids,
    span: "md:col-span-5", ratio: "aspect-[16/11]",
    gallery: [
      { img: kids, caption: "Kids bedroom — Mostakbal City" },
      { img: living, caption: "Adjacent family room" },
      { img: interior, caption: "Material palette" },
    ],
  },
  {
    title: "Modern Kitchen", place: "Heliopolis", img: kitchen,
    span: "md:col-span-7", ratio: "aspect-[16/11]",
    gallery: [
      { img: kitchen, caption: "Modern kitchen — Heliopolis" },
      { img: finishes, caption: "Stone and brass detail" },
      { img: living, caption: "Open-plan dining" },
      { img: bath, caption: "Powder room" },
    ],
  },
];

export function Projects() {
  const [openProj, setOpenProj] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  return (
    <section id="projects" className="bg-bg py-20 md:py-28" aria-labelledby="projects-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected work"
          title="Featured"
          italicWord="projects"
          subtext="A selection of recent projects across hospitality, residential and interior design. Click any project to explore more frames."
          cta={
            <a
              href="#contact"
              className="group relative hidden md:inline-flex rounded-full text-sm px-6 py-3 text-text-primary"
            >
              <span className="absolute inset-0 rounded-full border border-stroke group-hover:border-transparent" />
              <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100" />
              <span className="relative bg-bg rounded-full inline-flex items-center gap-2">
                Start a project →
              </span>
            </a>
          }
        />

        <ul
          role="list"
          aria-label="Featured projects"
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 list-none p-0"
        >
          {projects.map((p, i) => (
            <li key={p.title} role="listitem" className={`contents`}>
              <motion.button
                ref={(el) => { triggerRefs.current[i] = el; }}
                type="button"
                onClick={() => { setOpenProj(i); setShot(0); }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-80px" }}
                aria-label={`Open ${p.title} in ${p.place} — ${p.gallery.length} photos`}
                aria-haspopup="dialog"
                className={`group relative bg-surface border border-stroke rounded-3xl overflow-hidden text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${p.span} ${p.ratio}`}
              >
                <img
                  src={p.img}
                  onError={onImgError}
                  alt={`${p.title} — ${p.place}`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/55 backdrop-blur-0 group-hover:backdrop-blur-md transition-all duration-500" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-text-primary">
                    <p className="text-xs text-text-primary/70 uppercase tracking-[0.2em] mb-1">{p.place}</p>
                    <h3 className="text-xl md:text-2xl font-display italic">{p.title}</h3>
                  </div>
                  <span className="relative opacity-0 group-hover:opacity-100 transition-opacity">
                    <span
                      className="absolute -inset-[2px] rounded-full accent-gradient"
                      style={{ backgroundSize: "200% 200%", animation: "gradient-shift 6s ease infinite" }}
                    />
                    <span className="relative inline-flex items-center bg-text-primary text-bg rounded-full text-xs px-4 py-2">
                      View {p.gallery.length} photos →
                    </span>
                  </span>
                </div>
                <span aria-hidden="true" className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-text-primary/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {p.gallery.length} frames
                </span>
              </motion.button>
            </li>
          ))}
        </ul>

      </div>

      <AnimatePresence>
        {openProj !== null && (
          <ProjectLightbox
            project={projects[openProj]}
            index={shot}
            onIndex={setShot}
            onClose={() => {
              const t = triggerRefs.current[openProj];
              setOpenProj(null);
              setTimeout(() => t?.focus(), 0);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectLightbox({
  project, index, onIndex, onClose,
}: { project: Project; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  const total = project.gallery.length;
  const current = project.gallery[index];
  const next = () => onIndex((index + 1) % total);
  const prev = () => onIndex((index - 1 + total) % total);
  const swipe = useSwipe((dir) => (dir === "left" ? next() : prev()));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); onIndex((index + 1) % total); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); onIndex((index - 1 + total) % total); return; }
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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, total, onIndex, onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — image ${index + 1} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9998] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
      onClick={onClose}
      {...swipe}
    >

      <div className="absolute top-5 left-5 z-10 text-text-primary">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">{project.place}</p>
        <p className="font-display italic text-lg">{project.title}</p>
      </div>

      <button
        ref={firstRef}
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary text-lg hover:bg-white hover:text-bg transition-colors z-10"
      >
        ✕
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + total) % total); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary hover:bg-white hover:text-bg transition-colors z-10"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % total); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-text-primary hover:bg-white hover:text-bg transition-colors z-10"
      >
        ›
      </button>

      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[92vw] max-h-[80vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.img}
          alt={current.caption}
          onError={onImgError}
          className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
        />
        <figcaption className="text-xs uppercase tracking-[0.3em] text-text-primary/80">
          {current.caption} <span className="text-muted ml-3">{index + 1} / {total}</span>
        </figcaption>
      </motion.figure>

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[92vw] overflow-x-auto px-2 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {project.gallery.map((g, i) => (
          <button
            key={g.caption + i}
            type="button"
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
