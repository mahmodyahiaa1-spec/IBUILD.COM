import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    n: "01",
    title: "Construction & Integrated Finishes",
    desc: "Full construction with architectural finishes delivered as one seamless package.",
  },
  {
    n: "02",
    title: "Engineering Services",
    desc: "Structural, MEP and site engineering tailored to each development.",
  },
  {
    n: "03",
    title: "Specialized Services",
    desc: "Niche scopes — façades, joinery, restoration and premium fit-outs.",
  },
  {
    n: "04",
    title: "Interior & Exterior Design",
    desc: "Concept-to-completion design for villas, apartments, hotels and commercial spaces.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="What we do"
          title="Four"
          italicWord="disciplines"
          subtext="An integrated practice covering every stage of a project — from the first sketch to the final handover."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="group relative bg-surface border border-stroke rounded-3xl p-8 md:p-10 overflow-hidden"
            >
              <span className="absolute -inset-px rounded-3xl accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: "1px" }} />
              <span className="absolute inset-px rounded-3xl bg-surface" />
              <div className="relative">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="text-xs text-muted tracking-[0.3em]">{s.n}</span>
                  <span className="text-muted group-hover:text-text-primary transition-colors">→</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
