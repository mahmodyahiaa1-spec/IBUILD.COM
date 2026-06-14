import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Build", "Design", "Create"];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 2700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 900);
    return () => { cancelAnimationFrame(raf); clearInterval(id); };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg overflow-hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 text-xs text-muted uppercase tracking-[0.3em]"
      >
        i Build®
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 right-6 md:right-10 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="h-full accent-gradient origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137,170,204,0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}
