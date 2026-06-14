import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Gallery } from "@/components/Gallery";
import { ImmersiveJourney } from "@/components/ImmersiveJourney";
import { CEO } from "@/components/CEO";
import { Founders } from "@/components/Founders";
import { Booking } from "@/components/Booking";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionTransition } from "@/components/SectionTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "i Build® — Interior Design & Construction Cairo" },
      { name: "description", content: "i Build is a Cairo-based studio for architectural finishes, interior design, decoration, construction and real estate development. 20+ years of craft." },
      { property: "og:title", content: "i Build® — Architectural Finishes & Construction" },
      { property: "og:description", content: "Architectural finishes, interior design, decoration, construction and real estate development in Cairo." },
      { property: "og:url", content: "https://i-build-canvas.lovable.app/" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0da76808-c2d3-46d2-9eee-2410db620a1d/id-preview-b13a11d8--94cfc977-91a1-4bf2-991d-4ff133df2e3a.lovable.app-1781330963073.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0da76808-c2d3-46d2-9eee-2410db620a1d/id-preview-b13a11d8--94cfc977-91a1-4bf2-991d-4ff133df2e3a.lovable.app-1781330963073.png" },
    ],
    links: [{ rel: "canonical", href: "https://i-build-canvas.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "i Build",
          url: "https://i-build-canvas.lovable.app/",
          image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0da76808-c2d3-46d2-9eee-2410db620a1d/id-preview-b13a11d8--94cfc977-91a1-4bf2-991d-4ff133df2e3a.lovable.app-1781330963073.png",
          telephone: "+201227822584",
          email: "ibuild@ibuild-egy.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "22 Ahmed Zaki, Highstep, Al-Nozha District",
            addressLocality: "Cairo",
            addressCountry: "EG",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-bg text-text-primary"
      >
        <Navbar />
        <Hero />
        <SectionTransition><Services /></SectionTransition>
        <ImmersiveJourney />
        <SectionTransition><Projects /></SectionTransition>
        <SectionTransition><Gallery /></SectionTransition>
        <SectionTransition><CEO /></SectionTransition>
        <SectionTransition><Founders /></SectionTransition>
        <SectionTransition><Stats /></SectionTransition>
        <SectionTransition><Booking /></SectionTransition>
        <SectionTransition><Contact /></SectionTransition>
        <Footer />
      </motion.main>
    </>
  );
}
