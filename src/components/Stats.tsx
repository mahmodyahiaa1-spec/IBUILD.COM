import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years experience" },
  { value: "95+", label: "Projects delivered" },
  { value: "200%", label: "Satisfied clients" },
];

export function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center md:text-left"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary tabular-nums leading-none mb-3">
                {s.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.3em]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
