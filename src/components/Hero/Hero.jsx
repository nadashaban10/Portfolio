
import { useState } from "react";
import { motion } from "framer-motion";
import { LuGithub, LuLinkedin, LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

import { latticeNodes, profile } from "../../data/site";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import Magnet from "../ui/Magnet";
import SystemLattice from "./SystemLattice";

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(latticeNodes[0]?.id);

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  const staggeredReveal = (delay) =>
    reduced
      ? {}
      : {
          ...reveal,
          transition: {
            ...reveal.transition,
            delay,
          },
        };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.p className="eyebrow hero-kicker" {...staggeredReveal(0)}>
            Frontend Engineer <span aria-hidden="true">·</span> React
            <span aria-hidden="true">·</span> Next.js
            <span aria-hidden="true">·</span> TypeScript
          </motion.p>

          <motion.h1
            id="hero-title"
            {...staggeredReveal(0.06)}
          >
            I build web experiences that bring{" "}
            <span className="hero-highlight">complex ideas to life.</span>
          </motion.h1>

          <motion.p
            className="hero-lede"
            {...staggeredReveal(0.12)}
          >
            I’m a Frontend Engineer with 2+ years of experience building
            production web applications. At PaySky, I work on multi-tenant
            commerce platforms, merchant dashboards, payment workflows, and
            financial applications using React, Next.js, Angular, and
            TypeScript.
          </motion.p>

          {/* <motion.p
            className="hero-supporting-copy"
            {...staggeredReveal(0.16)}
          >
            I care about maintainable architecture, reusable systems, and
            turning complex business requirements into reliable user
            experiences. I’m also expanding my skills in backend development
            and AI-powered applications.
          </motion.p> */}

          <motion.div
            className="hero-actions"
            {...staggeredReveal(0.2)}
          >
            <Magnet>
              <a className="btn btn-primary btn-still" href="#projects">
                Explore my work
                <LuArrowDownRight aria-hidden="true" />
              </a>
            </Magnet>

            <Magnet>
              <a
                className="btn btn-secondary"
                href={`mailto:${profile.email}`}
              >
                Get in touch
                <LuArrowUpRight aria-hidden="true" />
              </a>
            </Magnet>
          </motion.div>

          <motion.ul
            className="hero-links"
            {...staggeredReveal(0.26)}
            aria-label="Professional profiles"
          >
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
              >
                <LuGithub aria-hidden="true" />
                GitHub
                <LuArrowUpRight aria-hidden="true" />
              </a>
            </li>

            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
              >
                <LuLinkedin aria-hidden="true" />
                LinkedIn
                <LuArrowUpRight aria-hidden="true" />
              </a>
            </li>
          </motion.ul>
        </div>

        <motion.div
          className="hero-visual"
          {...staggeredReveal(0.16)}
        >
          <SystemLattice
            activeId={activeId}
            onHover={(id) => {
              if (id) setActiveId(id);
            }}
          />

          <div className="lattice-legend" aria-label="Explore engineering concepts">
            {latticeNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={node.id === activeId ? "is-active" : undefined}
                aria-pressed={node.id === activeId}
                onClick={() => setActiveId(node.id)}
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
              >
                {node.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
