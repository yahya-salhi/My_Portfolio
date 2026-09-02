import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { contactInfo, socialLinks, availability } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const GitHubIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const UpworkIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  upwork: UpworkIcon,
};

const ContactInfoItem = ({ label, value, href }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-bg-glass">
      <span className="text-sm text-text-secondary">{label.charAt(0)}</span>
    </div>
    <div>
      <p className="text-sm font-medium text-text-primary">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-secondary transition-colors hover:text-accent-secondary"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-text-secondary">{value}</p>
      )}
    </div>
  </div>
);

ContactInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
};

const SocialLink = ({ link }) => {
  const Icon = iconMap[link.icon];
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg-glass text-text-secondary transition-all hover:border-accent-primary hover:text-text-primary hover:shadow-glow"
      title={link.name}
    >
      {Icon && <Icon />}
    </a>
  );
};

SocialLink.propTypes = {
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

const fieldClasses =
  "w-full rounded-lg border border-border bg-bg-glass px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/40";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      next.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitted) return;
    if (honeypot) return;
    if (!validate()) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setErrors({
        form: "Contact form is not configured. Please email me directly.",
      });
      return;
    }

    setLoading(true);

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Yahya Salhi",
          from_email: form.email,
          to_email: contactInfo.email,
          message: form.message,
        },
        publicKey
      );
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      if (error.status === 422) {
        setErrors({
          form: "Template configuration issue. Please email me directly.",
        });
      } else if (error.status === 401 || error.status === 403 || error.status === 412) {
        setErrors({
          form: "Email service authentication error. Please email me directly.",
        });
      } else {
        setErrors({
          form: "Something went wrong. Please try again or email me directly.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className={fieldClasses}
              />
              {errors.name && (
                <span className="text-xs text-error">{errors.name}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={fieldClasses}
              />
              {errors.email && (
                <span className="text-xs text-error">{errors.email}</span>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">
                Your Message
              </span>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className={`${fieldClasses} resize-none`}
              />
              {errors.message && (
                <span className="text-xs text-error">{errors.message}</span>
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
          {/* Contact details */}
          <div className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              Contact Details
            </h3>
            <div className="flex flex-col gap-4">
              <ContactInfoItem
                label="Email"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
              />
              <ContactInfoItem
                label="Phone"
                value={contactInfo.phone}
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              />
              <ContactInfoItem
                label="Location"
                value={contactInfo.location}
              />
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <SocialLink key={link.name} link={link} />
              ))}
            </div>
          </div>

          {/* Resume */}
          <div className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              Resume
            </h3>
            <a
              href="/Yahya_Salhi_CV.pdf"
              download="Yahya_Salhi_CV.pdf"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-light bg-bg-glass px-4 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-primary hover:shadow-glow"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>

          {/* Availability */}
          {availability.enabled && (
            <div className="rounded-xl border border-border-light bg-bg-glass p-6 shadow-card">
              <div className="mb-2 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-success animate-pulse"
                />
                <h3 className="text-base font-semibold text-text-primary">
                  {availability.label}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {availability.description}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
