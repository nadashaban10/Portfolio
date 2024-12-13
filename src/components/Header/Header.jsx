import React, { useState } from 'react';
import { FaTimes, FaBars, FaSun } from 'react-icons/fa';
import { MdOutlineModeNight } from "react-icons/md";
import { CiLight, CiMenuBurger  } from "react-icons/ci";
import './header.css';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <>
      <header className="flex">
        <button className="menu icon-button" onClick={() => setShowMenu(true)}>
        <CiMenuBurger size="23px" />
        </button>
        <div></div>
        <nav className='main-header'>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="icon-button" onClick={toggleDarkMode}>
          {darkMode ? <CiLight /> : <MdOutlineModeNight />}
        </button>
        {showMenu && ( 
          <div className="fixed">
            <ul className="modal">
              <li className="close-icon"><a className="icon-button-close" onClick={() => setShowMenu(false)}><FaTimes /></a></li> 
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;