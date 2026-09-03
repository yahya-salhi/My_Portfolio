import SocialIcons from "./SocialIcons";

const Footer = () => (
  <footer className="border-t border-border bg-bg-primary">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between sm:px-12">
      <p className="text-sm text-text-muted">
        &copy; {new Date().getFullYear()} Yahya Salhi. All rights reserved.
      </p>

      <nav className="flex items-center gap-4" aria-label="Footer navigation">
        <a
          href="/#/privacy"
          className="text-sm text-text-secondary transition-colors hover:text-accent-primary"
        >
          Privacy
        </a>
        <span aria-hidden="true" className="h-3 w-px bg-border" />
        <SocialIcons size="sm" />
      </nav>
    </div>
  </footer>
);

export default Footer;
