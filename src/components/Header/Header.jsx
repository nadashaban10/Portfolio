import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile } from "../../data/site";
import useActiveSection from "../../hooks/useActiveSection";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const sectionIds = nav.map((item) => item.href.slice(1));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => (
    document.documentElement.dataset.theme === "light" ? "light" : "dark"
  ));
  const active = useActiveSection(sectionIds);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      next === "light" ? "#f7f7f5" : "#0e0d0b"
    );
    setTheme(next);
  };

  const cvAction = profile.cv
    ? { href: profile.cv, label: "View CV", external: true }
    : { href: `mailto:${profile.email}?subject=CV%20request`, label: "Request CV", external: false };

  return (
    <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="container header-bar">
        <a className="logo" href="#top">
          {profile.name}
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          <ul>
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a href={item.href} aria-current={isActive ? "true" : undefined}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <a
            className="btn btn-primary header-cv"
            href={cvAction.href}
            {...(cvAction.external ? { download: true } : {})}
          >
            {cvAction.label}
          </a>
          <button
            type="button"
            className="icon-button menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="nav-drawer"
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <motion.div
              className="nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: reduced ? 0 : 24, opacity: reduced ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduced ? 0 : 24, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="nav-panel-top">
                <p>{profile.role}</p>
                <button type="button" className="icon-button" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a className="btn btn-primary" href={cvAction.href} onClick={() => setOpen(false)}>
                {cvAction.label}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
