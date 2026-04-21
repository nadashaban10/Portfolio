import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./portfolio.css";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const items = [
  {
    id: 1,
    title: "Deco Furniture",
    description: "A full-stack e-commerce platform with product browsing, cart management, and seamless order flows. Built with React and Redux.",
    img: "/images/deco.png",
    link: "https://deco-furniture-app.vercel.app",
    github: "https://github.com/nadashaban10",
    tags: ["React", "Redux", "CSS"],
    category: "React",
  },
  {
    id: 2,
    title: "Admin Dashboard",
    description: "Dynamic admin dashboard utilizing Material-UI for a modern interface and Nivo charts for deep analytics visualization.",
    img: "/images/ScrAdmin.png",
    link: "https://test-ad-dash-board.vercel.app",
    github: "https://github.com/nadashaban10",
    tags: ["React", "MUI", "Charts"],
    category: "React",
  },
  {
    id: 3,
    title: "Educational Platform",
    description: "Responsive website developed for Arcade Academy's branding, featuring modern design and smooth user experience.",
    img: "/images/educa.png",
    link: "https://educational-app-v2.vercel.app",
    github: "https://github.com/nadashaban10",
    tags: ["HTML", "CSS", "JS"],
    category: "Static",
  },
  {
    id: 4,
    title: "Food Delivery App",
    description: "Interactive food ordering application with user authentication, stateful cart functionality, and streamlined checkout.",
    img: "/images/food.png",
    link: "https://food-app-delivery-gamma.vercel.app",
    github: "https://github.com/nadashaban10",
    tags: ["React", "CSS"],
    category: "React",
  },
  {
    id: 5,
    title: "Hayms Software",
    description: "Corporate branding website developed for Hayms Software Company, highlighting their services and portfolio.",
    img: "/images/softwarecompany.png",
    link: "https://company-web-app-iota.vercel.app",
    github: "https://github.com/nadashaban10",
    tags: ["HTML", "CSS", "JS"],
    category: "Static",
  },
];

const FILTERS = ["All", "React", "Static"];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
};

const Card = ({ item }) => {
  return (
    <motion.article
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      layout
    >
      <div className="card-image-container">
        <div className="card-overlay"></div>
        <img src={item.img} alt={item.title} className="card-image" loading="lazy" />
        
        {/* Floating action buttons appear on hover */}
        <div className="card-quick-actions">
          <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label="View Demo">
            <FaExternalLinkAlt />
          </a>
          <a href={item.github} target="_blank" rel="noopener noreferrer" aria-label="View Source">
            <FaGithub />
          </a>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <div className="card-tags">
            {item.tags.map((tag) => (
              <span className="card-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description}</p>
        
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-cta">
          Explore Project <FaArrowRight className="cta-icon" />
        </a>
      </div>
    </motion.article>
  );
};

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="projects" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Selected Work
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A showcase of my recent work in frontend development, spanning from complex React applications to polished static sites.
          </motion.p>
        </div>

        <div className="filter-container">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? "active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
