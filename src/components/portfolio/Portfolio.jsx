import React from "react";
import { motion } from "framer-motion";
import "./portfolio.css";

const items = [
  {
    id: 1,
    title: "Admin Dashboard ",
    description: "A dynamic admin dashboard utilizing Material-UI for a modern interface and Nivo charts for visualizing admin progress and analytics effectively.",
    img: "/images/ScrAdmin.png", // Path relative to the public folder
    link: "test-ad-dash-board.vercel.app"
  },
  {
    id: 2,
    title: "Educational Web App",
    description: "A responsive, static website developed for branding and online presence of Arcade Academy.",
    img: "/images/educa.png", // Path relative to the public folder
    link: "educational-app-v2.vercel.app"
  },
  {
    id: 3,
    title: "E-Commerce App",
    description: "A responsive e-commerce web app built using React for creating dynamic components and Redux Toolkit for managing app-wide state.",
    img: "/images/deco.png", // Path relative to the public folder
    link: "deco-furniture-app.vercel.app"
  },
  {
    id: 4,
    title: "Food Delivery App",
    description: "A simple food ordering app built with React.js, featuring user login, add-to-cart, and checkout functionality.",
    img: "/images/food.png", // Path relative to the public folder
    link: "food-app-delivery-gamma.vercel.app"
  }
];

const Single = ({ item }) => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <img src={item.img} alt={item.title} />
      <div className="hoverContent">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <button onClick={() => window.open(`https://${item.link}`, "_blank")}>See Demo</button>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <div className="portfolio" style={{ background: "linear-gradient(to bottom, #12071f, #2f204e)" }}>
      <h1>P R O J E C T S</h1>
      <div className="cardsContainer">
        {items.map((item) => (
          <Single item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
