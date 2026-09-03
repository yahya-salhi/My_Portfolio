import PropTypes from "prop-types";

import { contactInfo, availability } from "../constants";

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

const ContactInfo = () => (
  <div className="flex flex-col gap-6">
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
  </div>
);

export default ContactInfo;
