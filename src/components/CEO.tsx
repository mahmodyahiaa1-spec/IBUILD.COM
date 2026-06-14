import { motion } from "framer-motion";
import { onImgError } from "@/lib/imageFallback";
import ceo from "@/assets/ceo-portrait.jpg";

export function CEO() {
  return (
    <section id="ceo" className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-stroke"
          >
            <img src={ceo} onError={onImgError} alt="Wassim R. Mokhtar — CEO" loading="lazy" width={960} height={1280} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs text-text-primary/70 uppercase tracking-[0.3em] mb-2">Chief Executive</p>
              <p className="font-display italic text-2xl text-text-primary">Wassim R. Mokhtar</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] text-text-primary mb-6">
              Two decades of <span className="italic">craft.</span>
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-6">
              A graduate of the Faculty of Engineering, Cairo University, Wassim brings 20+ years
              of experience in real estate and contracting. Under his direction, i Build delivers
              projects with the discipline of an engineer and the eye of a designer.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p className="text-xs text-muted uppercase tracking-[0.2em] mb-1">Education</p>
                <p className="text-sm text-text-primary">Cairo University, Engineering</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-[0.2em] mb-1">Experience</p>
                <p className="text-sm text-text-primary">20+ years in industry</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
