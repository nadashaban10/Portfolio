import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Engineering from "./components/engineering/Engineering";
import AboutMe from "./components/about/AboutMe";
import Contact from "./components/contact/Contact";
import Footer from "./components/Footer/Footer";
import PointerAura from "./components/cursor/PointerAura";

export default function App() {
  return (
    <>
      <PointerAura />
      <Header />
      <main id="content">
        <Hero />
        <Experience />
        <Portfolio />
        <Engineering />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
