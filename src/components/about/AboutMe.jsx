import React from "react";
import { motion } from "framer-motion";
import "./aboutme.css";

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="about-me-section">
      <motion.div 
        className="Devcontainer"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          className="section-title"
          variants={childVariants}
        >
          About Me
        </motion.h2>
        <motion.p 
          className="section-description"
          variants={childVariants}
        >
          Hello! I'm <span className="highlight">Nada Shaban </span>, a passionate frontend developer based in Cairo, Egypt.
          With a strong foundation in web technologies and UI/UX design, I aim to build dynamic, user-centered applications. I have a
          background in Software Engineering and GIS, which equips me with a unique perspective on problem-solving and spatial
          visualization in tech projects.
        </motion.p>

        <motion.div 
          className="content"
          variants={containerVariants}
        >
          <motion.h3 
            className="subsection-title"
            variants={childVariants}
          >
            Skills
          </motion.h3>
          <motion.ul 
            className="list"
            variants={containerVariants}
          >
            <motion.li variants={childVariants}>React.js, Redux Toolkit</motion.li>
            <motion.li variants={childVariants}>HTML, CSS</motion.li>
            <motion.li variants={childVariants}>Linux OS, MySQL</motion.li>
            <motion.li variants={childVariants}>Familiar with APIs, web servers, and networking</motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
