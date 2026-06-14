import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  italicWord,
  subtext,
  cta,
}: {
  eyebrow: string;
  title: string;
  italicWord: string;
  subtext: string;
  cta?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] text-text-primary mb-4">
          {title} <span className="italic">{italicWord}</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{subtext}</p>
      </div>
      {cta}
    </motion.div>
  );
}
