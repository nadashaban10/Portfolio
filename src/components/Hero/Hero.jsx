import React from 'react';
import { motion } from 'framer-motion';
import './hero.css';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import img from "../../../public/images/WhatappImage.jpg";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import devAnimation from "../../../public/animation/Animation - 1734001703754.json";
import Lottie from "react-lottie";

function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className='hero flex'>
      <motion.div 
        className="parent-avatar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img 
          src={img} 
          alt="avatar" 
          className="avatar"
          variants={childVariants}
        />
        <div className='icon-verified'> <RiVerifiedBadgeFill /> </div>
        <motion.h1 
          className='title'
          variants={childVariants}
        >Front-End Developer </motion.h1 > 
        <motion.p 
          className='sub-title'
          variants={childVariants}
        > 
          A passionate and skilled Frontend Developer with a strong focus on creating user-friendly and visually appealing web experiences. 
          I have expertise in HTML, CSS, JavaScript, and popular frontend frameworks like React. 
          I am always eager to learn new technologies and improve my skills to deliver high-quality projects. 
         </motion.p>
        <motion.div 
          className='icons flex'
          variants={childVariants}
        >
          <a href="https://www.linkedin.com/in/nada-shaban-89340a223/" target="_blank" rel="noopener noreferrer"> 
            <FaLinkedin /> 
          </a>
          <a href="" target="_blank" rel="noopener noreferrer"> 
            <IoLogoGithub /> 
          </a>
          <a href="https://wa.me/201156647497" target="_blank" rel="noopener noreferrer"> 
            <FaWhatsapp /> 
          </a>
          <a href="https://www.instagram.com/nshm107/?hl=en" target="_blank" rel="noopener noreferrer"> 
            <FaInstagram /> 
          </a>
        </motion.div>
        <div>
          <button className="resume-button">
            <a 
              href="https://drive.google.com/file/d/1pEdToFofNxHUiog8HWKk_nbg0iuNoKsx/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get Resume
            </a>
          </button>
        </div>
      </motion.div>
      <motion.div 
        className='right-section animation'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      > 
        <Lottie
          options={{
            animationData: devAnimation, 
            loop: true, 
            autoplay: true 
          }}
          height={360}
          width={360}
        />
      </motion.div>
    </section>
  );
}

export default Hero;
