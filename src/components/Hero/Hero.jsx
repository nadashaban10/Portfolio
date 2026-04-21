import React from 'react';
import { motion } from 'framer-motion';
import './hero.css';
import img from "../../../public/images/WhatappImage.jpg";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";

function Hero() {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
  };

  // Typing effect for the title
  const titleText = "Building digital products, brands, and experience.";
  const titleWords = titleText.split(" ");
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        {/* ===== LEFT CONTENT ===== */}
        <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={item}>
            <span className="pulse-dot"></span> Currently Frontend Developer @ PaySky Egypt
          </motion.div>

          <motion.h1 className="hero-title" variants={item}>
            {titleWords.map((word, index) => (
              <motion.span 
                key={index} 
                style={{ display: "inline-block", marginRight: "12px" }}
                variants={wordVariants}
              >
                {word === "digital" || word === "products," ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p className="hero-description" variants={item}>
            Hi, I'm <strong className="text-accent">Nada Shaban</strong>. A Frontend Developer specializing in React and Next.js, currently building scalable interfaces and enterprise dashboards in the fintech sector.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <motion.a 
              href="#projects" 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Latest Work
            </motion.a>
            <motion.a 
              href="https://drive.google.com/file/d/1pEdToFofNxHUiog8HWKk_nbg0iuNoKsx/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineDownload style={{ fontSize: '1.2rem' }} /> Resume
            </motion.a>
          </motion.div>

          <motion.div className="hero-socials" variants={item}>
            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="https://www.linkedin.com/in/nada-shaban-89340a223/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </motion.a>
            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="https://github.com/nadashaban10" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </motion.a>
            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="mailto:nadashapann@gmail.com" aria-label="Email">
              <FaEnvelope />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ===== RIGHT: BROWSER MOCKUP AVATAR ===== */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
        >
          <motion.div 
            className="browser-mockup"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="browser-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="browser-body">
              <img src={img} alt="Nada Shaban" />
            </div>
            <div className="browser-glow"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
