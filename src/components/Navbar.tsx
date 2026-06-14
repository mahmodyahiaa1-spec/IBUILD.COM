import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  ];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow ${
          scrolled ? "shadow-md shadow-black/30" : ""
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleClick(e, "home")}
          className="group relative w-9 h-9 rounded-full p-[1.5px] accent-gradient"
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg transition-transform group-hover:scale-110 overflow-hidden">
            <img src="/logo.png" alt="iBuild Logo" className="w-full h-full object-contain p-1" />
          </span>
        </a>
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />
        {links.map((l) => (
          <a
            key={l.id}
            href={l.href}
            onClick={(e) => handleClick(e, l.id)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              active === l.id
                ? "text-text-primary bg-stroke/60"
                : "text-muted hover:text-text-primary hover:bg-stroke/40"
            }`}
          >
            {l.label}
          </a>
        ))}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />
        <a
          href="#contact"
          onClick={(e) => handleClick(e, "contact")}
          className="relative group text-xs sm:text-sm rounded-full"
        >
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative inline-flex items-center gap-1 bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
            Contact <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}