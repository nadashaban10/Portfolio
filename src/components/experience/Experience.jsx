import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import "./experience.css";

const Experience = () => {
  const ref = useRef(null);
  
  // We can track scroll progress to animate the timeline line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.3 } },
  };

  const markerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.6, duration: 0.6 } }
  };

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container experience-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="section-badge">Career</span>
          <h2 className="section-title">Work Experience</h2>
        </motion.div>

        <div className="timeline-wrapper">
          {/* Animated Timeline Line */}
          <motion.div 
            className="timeline-progress-line"
            style={{ scaleY, transformOrigin: "top" }}
          ></motion.div>

          <motion.div 
            className="timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="timeline-item" variants={itemVariants}>
              <motion.div className="timeline-marker" variants={markerVariants}></motion.div>
              <div className="timeline-content glass-panel">
                <div className="timeline-header">
                  <div>
                    <h3 className="job-title">Frontend Developer</h3>
                    <h4 className="company-name">PaySky Egypt (Fintech)</h4>
                  </div>
                  <div className="job-date">Present</div>
                </div>
                
                <div className="job-description">
                  <p>
                    Spearheading frontend development for enterprise-level fintech and e-commerce solutions, focusing on scalability, performance, and modern user experiences.
                  </p>
                  <ul className="job-highlights">
                    <li>
                      <strong>Large Merchant Dashboard:</strong> Developed a comprehensive dashboard for merchants to manage complex fintech operations and track analytics.
                    </li>
                    <li>
                      <strong>Payment Gateways:</strong> Integrated and maintained secure payment gateway interfaces, ensuring seamless transactions.
                    </li>
                    <li>
                      <strong>Multi-tenant E-commerce:</strong> Architected scalable frontend infrastructure supporting independent e-commerce tenants.
                    </li>
                    <li>
                      <strong>Yalla Super Mall:</strong> Built core interfaces and portals for the Yalla Super Mall ecosystem.
                    </li>
                  </ul>
                </div>

                <div className="tech-stack">
                  {["Next.js", "Docker", "Jest", "Zustand", "Axios", "Shadcn", "MUI"].map((tech, i) => (
                    <motion.span 
                      key={tech} 
                      className="tech-tag"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
