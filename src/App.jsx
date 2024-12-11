import React from 'react'
import Hero from './components/Hero/Hero'
import Services from './components/services/Services'
import Portfolio from './components/portfolio/Portfolio'
import Contact from './components/contact/Contact'



function App() {
  return (
    <div className="container ">
      <section>
    <Hero id='home' />
    </section>
    <section id='services'>
    <Services />  
    </section>
    <section id='portfolio'>
    <Portfolio />
    </section>
    <section id='contact'>
    <Contact />
    </section>
    </div>
  )
}

export default App
