import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import useContactForm from "../hooks/useContactForm";
import SocialIcons from "./SocialIcons";
import ContactInfo from "./ContactInfo";

const fieldClasses =
  "w-full rounded-lg border border-border bg-bg-glass px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/40";

const Contact = () => {
  const {
    formRef,
    form,
    errors,
    loading,
    submitted,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  } = useContactForm({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          Get in touch
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          Let&apos;s talk.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        {/* Left column — form */}
        <motion.div
          variants={fadeIn("up", "spring", 0, 0.7)}
          className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card sm:p-8"
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            I&apos;m always open to discussing new opportunities, collaborations,
            or just having a chat about technology. Fill out the form and
            I&apos;ll get back to you.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 flex flex-col gap-5"
          >
            {/* Honeypot — hidden from humans */}
            <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                id="contact-name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={fieldClasses}
              />
              {errors.name && (
                <span id="contact-name-error" className="text-xs text-error">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                id="contact-email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={fieldClasses}
              />
              {errors.email && (
                <span id="contact-email-error" className="text-xs text-error">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Your Message
              </span>
              <textarea
                rows={6}
                name="message"
                id="contact-message"
                autoComplete="off"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${fieldClasses} resize-none`}
              />
              {errors.message && (
                <span id="contact-message-error" className="text-xs text-error">
                  {errors.message}
                </span>
              )}
            </label>

            {errors.form && (
              <p className="text-sm text-error">{errors.form}</p>
            )}

            {submitted ? (
              <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success-bg px-4 py-3 text-sm text-success">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
                Message sent successfully. I&apos;ll get back to you soon.
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-text-primary shadow-glow transition-all hover:bg-accent-tertiary hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            )}
          </form>
        </motion.div>

        {/* Right column — info sidebar */}
        <motion.div
          variants={fadeIn("up", "spring", 0.12, 0.7)}
          className="flex flex-col gap-6"
        >
          <ContactInfo />

          {/* Social links */}
          <div className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              Connect
            </h3>
            <div className="flex gap-3">
              <SocialIcons size="md" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
