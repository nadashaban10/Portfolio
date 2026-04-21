import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-content">
          <span className="logo" style={{ fontSize: '1.2rem' }}>nada<span className="logo-dot">.</span></span>
          <p className="made-with">
            Designed & Built with <FaHeart className="heart-icon" /> by Nada Shaban
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
