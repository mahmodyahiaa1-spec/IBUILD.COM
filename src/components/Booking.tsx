import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function Booking() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please complete name, email and phone.");
      return;
    }
    const subject = encodeURIComponent(`Appointment request — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nPreferred date: ${form.date}\nPreferred time: ${form.time}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:ibuild@ibuild-egy.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email to confirm the appointment…");
  };

  return (
    <section id="booking" className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Book a visit</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] text-text-primary mb-6">
              Schedule a <span className="italic">consultation.</span>
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed mb-8">
              Share your project brief and a preferred time. Our team will confirm your appointment
              within one business day.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-text-primary">Working hours: <span className="text-muted">Sat–Thu, 9:00 AM – 5:00 PM</span></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-text-primary">Closed Fridays & public holidays</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-text-primary">In-studio or on-site visits available</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 rounded-3xl border border-stroke bg-surface/40 backdrop-blur-md p-6 md:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name *" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
              <Field label="Company" name="company" value={form.company} onChange={onChange} placeholder="Company (if any)" />
              <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
              <Field label="Phone *" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+20 ..." required />
              <Field label="Preferred date" name="date" type="date" value={form.date} onChange={onChange} />
              <Field label="Preferred time" name="time" type="time" value={form.time} onChange={onChange} />
            </div>
            <div className="mt-4">
              <label className="block text-[11px] uppercase tracking-[0.22em] text-muted mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                placeholder="Tell us about your project or book an appointment…"
                className="w-full rounded-2xl bg-bg/60 border border-stroke px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-xs text-muted">By submitting, you agree to be contacted about your inquiry.</p>
              <button
                type="submit"
                className="group relative inline-flex rounded-full text-sm px-6 py-3 text-text-primary self-start"
              >
                <span className="absolute inset-0 rounded-full border border-stroke group-hover:border-transparent" />
                <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100" />
                <span className="relative bg-bg/80 backdrop-blur-md rounded-full px-2 inline-flex items-center gap-2">
                  Request appointment →
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, value, onChange, placeholder, type = "text", required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-muted mb-2">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-full bg-bg/60 border border-stroke px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-white/30 transition-colors"
      />
    </div>
  );
}
