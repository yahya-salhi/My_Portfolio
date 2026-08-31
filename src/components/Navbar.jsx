import { useEffect, useRef, useState } from "react";
import { navLinks } from "../constants";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          const link = navLinks.find((l) => l.id === visible.target.id);
          if (link) setActive(link.title);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  const handleBrandClick = (event) => {
    event.preventDefault();
    setActive("");
    setMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const handleLinkClick = (title) => {
    setActive(title);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`border-b bg-bg-glass backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "border-border-light shadow-lg" : "border-border"
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-(--layout-navbar-height) max-w-(--layout-max-width) items-center justify-between px-6 md:px-8 lg:px-12">
          <a
            href="#"
            onClick={handleBrandClick}
            className="flex items-center gap-3 rounded-sm transition-opacity hover:opacity-80"
          >
            <img src="/logo.svg" alt="Yahya Salhi logo" className="h-9 w-auto object-contain" />
          </a>

          <ul className="hidden items-center gap-3 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.title;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => handleLinkClick(link.title)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.title}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="accent-dot absolute inset-x-3 -bottom-0.5 mx-auto h-1 w-1 rounded-full"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div ref={menuRef} className="relative md:hidden">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              className="flex h-11 w-11 items-center justify-center rounded-sm text-text-primary transition-colors duration-150 hover:text-accent-secondary"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {menuOpen && (
              <div
                id="mobile-nav-menu"
                className="glass absolute right-0 top-[calc(100%+0.75rem)] w-[min(17rem,calc(100vw-3rem))] rounded-lg p-2"
              >
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = active === link.title;
                    return (
                      <li key={link.id}>
                        <a
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={`#${link.id}`}
                          onClick={() => handleLinkClick(link.title)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex min-h-11 items-center rounded-sm px-3 text-sm font-medium transition-colors duration-150 ${
                            isActive
                              ? "border-l-2 border-l-accent-secondary bg-bg-glass pl-2.5 text-text-primary"
                              : "text-text-secondary hover:bg-bg-glass-hover hover:text-text-primary"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mr-2 h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-accent-secondary" : "bg-transparent"
                            }`}
                          />
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
