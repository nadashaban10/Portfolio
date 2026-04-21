import React from "react";
import { motion } from "framer-motion";
import "./aboutme.css";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3,
  SiRedux, SiTailwindcss, SiGit, SiFigma, SiDocker, SiJest
} from "react-icons/si";

const techStack = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Jest", Icon: SiJest, color: "#C21325" },
];

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  
  // Custom slide-in variants for different bento cards
  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
  };
  
  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } },
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.5 } },
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="section-badge">About Me</span>
          <h2 className="section-title">Behind the Code</h2>
        </motion.div>

        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Card 1: Bio (Large) */}
          <motion.div className="bento-card bio-card glass-panel" variants={slideLeft}>
            <h3>Hello World 👋</h3>
            <p>
              I'm <strong className="text-accent">Nada Shaban</strong>, a passionate Frontend Developer based in Cairo, Egypt. With a unique background blending Software Engineering and GIS, I approach UI/UX with an analytical yet deeply creative mindset.
            </p>
            <p>
              I currently work at <strong>PaySky Egypt</strong>, where I build robust, scalable frontend architectures for complex fintech platforms, payment gateways, and multi-tenant e-commerce ecosystems like Yalla Super Mall. I thrive on turning complex business requirements into seamless, pixel-perfect user experiences.
            </p>
          </motion.div>

          {/* Card 2: Tech Stack (Medium) */}
          <motion.div className="bento-card tech-card glass-panel" variants={slideRight}>
            <h3>Tech Stack</h3>
            <div className="tech-grid">
              {techStack.map((tech, i) => (
                <motion.div 
                  className="tech-item" 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <tech.Icon style={{ color: tech.color }} className="tech-icon" />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Location (Small) */}
          <motion.div className="bento-card location-card glass-panel" variants={popIn}>
            <motion.div 
              className="location-icon"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              📍
            </motion.div>
            <div className="location-info">
              <h4>Based In</h4>
              <p>Cairo, Egypt</p>
            </div>
            <div className="location-bg"></div>
          </motion.div>

          {/* Card 4: Stats (Medium) */}
          <motion.div className="bento-card stats-card glass-panel" variants={slideUp}>
            <div className="stat-group">
              <motion.span 
                className="stat-number gradient-text"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
              >
                2+
              </motion.span>
              <span className="stat-label">Years of<br/>Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-group">
              <motion.span 
                className="stat-number gradient-text"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
              >
                10+
              </motion.span>
              <span className="stat-label">Enterprise<br/>Projects</span>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
