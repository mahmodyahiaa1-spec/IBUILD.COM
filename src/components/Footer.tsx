import { MapPin, Mail, Phone, Facebook, Instagram } from "lucide-react";

const socials = [
  { label: "WhatsApp", href: "https://wa.me/201227822584", brand: "bg-emerald-500 hover:bg-emerald-400", icon: WhatsAppIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/18Knt1cBzi/?mibextid=wwXIfr", brand: "bg-[#1877F2] hover:bg-[#2a86ff]", icon: () => <Facebook className="w-4 h-4" strokeWidth={2} /> },
  { label: "Location", href: "https://maps.google.com/?q=22+Ahmed+Zaki+Al-Nozha+Cairo", brand: "bg-rose-500 hover:bg-rose-400", icon: () => <MapPin className="w-4 h-4" strokeWidth={2} /> },
  { label: "Email", href: "mailto:ibuild@ibuild-egy.com", brand: "bg-amber-500 hover:bg-amber-400", icon: () => <Mail className="w-4 h-4" strokeWidth={2} /> },
  { label: "Instagram", href: "https://www.instagram.com/ibuild.design?igsh=MWJkeXIwcjJ0ZnhtNw==", brand: "bg-gradient-to-br from-fuchsia-500 to-pink-500 hover:opacity-90", icon: () => <Instagram className="w-4 h-4" strokeWidth={2} /> },
];

const services = [
  "Construction and Integrated Finishes",
  "Engineering Services",
  "Specialized Services",
  "Interior and Exterior Design",
];

const phones = [
  { label: "+20 122 782 2584", href: "tel:+201227822584" },
  { label: "+20 109 208 0749", href: "tel:+201092080749" },
  { label: "+02 262 016 21", href: "tel:+0226201621" },
];

export function Footer() {
  return (
    <footer className="relative bg-bg border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#home" className="inline-block mb-2">
              <img src="/logo.png" alt="iBuild Logo" className="h-16 w-auto object-contain" />
            </a>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-sm">
              i Build — architectural finishes, interior design, decoration, construction and real
              estate development.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for new projects
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-medium text-text-primary mb-4 uppercase tracking-[0.2em]">Contact us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-muted">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                <span>22 Ahmed Zaki, Highstep, Al-Nozha District, Cairo Governorate</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Mail className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                <a href="mailto:ibuild@ibuild-egy.com" className="hover:text-text-primary transition-colors">ibuild@ibuild-egy.com</a>
              </li>
              {phones.map((p) => (
                <li key={p.href} className="flex items-start gap-3 text-muted">
                  <Phone className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <a href={p.href} className="hover:text-text-primary transition-colors">{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Social */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-4 uppercase tracking-[0.2em]">Services</h3>
              <ul className="space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-muted hover:text-text-primary transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-primary mb-4 uppercase tracking-[0.2em]">Follow us</h3>
              <ul className="flex items-center gap-3">
                {socials.map(({ label, href, brand, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 ${brand}`}
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stroke flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">© {new Date().getFullYear()} i Build. All rights reserved.</p>
          <p className="text-xs text-muted">
            i Build <span className="text-amber-400"></span> for architectural finishes, interior design and decoration.
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.84 11.84 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.37-1.67a11.86 11.86 0 0 0 5.68 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.41-8.43Zm-8.47 18.27h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.78.99 1.01-3.69-.23-.38a9.85 9.85 0 0 1-1.51-5.21c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.87-9.88 9.87Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  );
}