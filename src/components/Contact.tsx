import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Interactive3D } from "./Interactive3D";

export function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, []);

  const marqueeText = Array(10).fill("BUILDING THE FUTURE • ").join("");

  return (
    <section id="contact" className="relative bg-bg pt-20 md:pt-28 pb-8 md:pb-12 overflow-hidden">
      {/* Interactive 3D backdrop */}
      <div className="absolute inset-0">
        <Interactive3D />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="whitespace-nowrap text-7xl md:text-9xl font-display italic text-text-primary/90 leading-none">
            {marqueeText}{marqueeText}
          </div>
        </div>
      </div>
    </section>
  );
}