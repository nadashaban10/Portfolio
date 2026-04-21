import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import './header.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check initial preference from localStorage or OS
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#home" className="logo">
            <span className="logo-text">nada</span><span className="logo-dot">.</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
            >
              {isLightMode ? <FaMoon /> : <FaSun />}
            </button>
            <a href="#contact" className="hire-btn">Hire Me</a>
            <button
              className="burger-btn"
              onClick={() => setShowMenu(true)}
              aria-label="Open navigation menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            className="drawer-overlay" 
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="drawer" 
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="drawer-top-controls">
                <button 
                  className="theme-toggle mobile-theme-toggle" 
                  onClick={toggleTheme}
                >
                  {isLightMode ? <FaMoon /> : <FaSun />}
                </button>
                <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
                  <FaTimes />
                </button>
              </div>
              <a href="#home" className="logo drawer-logo" onClick={closeMenu}>
                nada<span className="logo-dot">.</span>
              </a>
              <nav aria-label="Mobile navigation">
                <ul className="drawer-links">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="drawer-link" onClick={closeMenu}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a href="#contact" className="btn-primary" onClick={closeMenu} style={{ width: '100%', marginTop: 'auto' }}>
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;