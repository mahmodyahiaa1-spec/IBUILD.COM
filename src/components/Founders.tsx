import { motion } from "framer-motion";
import { onImgError } from "@/lib/imageFallback";
import ceo from "@/assets/ceo-portrait.jpg";

const founders = [
  {
    name: "Wassim R. Mokhtar",
    role: "Co-Founder & CEO",
    bio: "Faculty of Engineering, Cairo University. 20+ years in real estate and contracting across Egypt and Africa.",
    img: ceo,
  },
  {
    name: "Eng. Hossam El-Din",
    role: "Co-Founder & Head of Engineering",
    bio: "Civil engineer specializing in structural systems and integrated MEP coordination on large-scale residential and hospitality projects.",
    img: ceo,
  },
  {
    name: "Arch. Mariam Nabil",
    role: "Co-Founder & Design Director",
    bio: "Interior architect leading our design language — turning briefs into spaces that are warm, precise and unmistakably crafted.",
    img: ceo,
  },
];

export function Founders() {
  return (
    <section id="founders" className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Founders</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] text-text-primary mb-12 md:mb-16 max-w-3xl">
          The people behind <span className="italic">i Build.</span>
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 list-none p-0">
          {founders.map((f, i) => (
            <motion.li
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="group rounded-3xl border border-stroke bg-surface/30 overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={f.img}
                  onError={onImgError}
                  alt={`${f.name} — ${f.role}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted mb-2">{f.role}</p>
                <p className="font-display italic text-2xl text-text-primary mb-3">{f.name}</p>
                <p className="text-sm text-muted leading-relaxed">{f.bio}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
