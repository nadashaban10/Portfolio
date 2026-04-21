import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import AboutMe from './components/about/AboutMe';
import Experience from './components/experience/Experience';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
