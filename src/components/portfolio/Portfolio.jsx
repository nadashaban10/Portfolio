import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/site";
import SectionHeading from "../ui/SectionHeading";
import Schematic from "./Schematic";

function ExternalLinks({ project }) {
  return (
    <div className="project-links">
      {project.demo ? (
        <a href={project.demo} target="_blank" rel="noreferrer">Live demo</a>
      ) : null}
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer">Source</a>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, featured, open, onToggle, tiltEnabled }) {
  const visualRef = useRef(null);

  const onMove = (event) => {
    const visual = visualRef.current;
    if (!visual || !tiltEnabled) return;
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (visualRef.current) visualRef.current.style.transform = "";
  };

  return (
    <article className={`project-card ${featured ? "is-featured" : ""}`}>
      <div
        className="project-visual"
        ref={visualRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} />
        ) : (
          <Schematic kind={project.kind} />
        )}
      </div>
      <div className="project-body">
        <p className="project-role">{project.role}</p>
        <h3>{project.name}</h3>
        <p>{project.problem}</p>
        <p className="project-contribution">{project.contribution}</p>
        <ul className="tag-list">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-actions">
          <ExternalLinks project={project} />
          {project.caseStudy ? (
            <button
              type="button"
              className="text-button"
              aria-expanded={open}
              onClick={onToggle}
            >
              {open ? "Hide notes" : "Technical notes"}
            </button>
          ) : null}
        </div>
        {open && project.caseStudy ? (
          <dl className="case-study">
            <div>
              <dt>Context</dt>
              <dd>{project.caseStudy.context}</dd>
            </div>
            <div>
              <dt>Challenge</dt>
              <dd>{project.caseStudy.challenge}</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>{project.caseStudy.approach}</dd>
            </div>
            <div>
              <dt>Trade-off</dt>
              <dd>{project.caseStudy.tradeoff}</dd>
            </div>
            <div>
              <dt>Outcome</dt>
              <dd>{project.caseStudy.outcome}</dd>
            </div>
          </dl>
        ) : null}
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [openId, setOpenId] = useState(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTiltEnabled(fine && !reduced);
  }, []);
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects I can show in public."
          lede="PaySky product code stays private. These are independent projects, with the repository and demo linked only where they actually exist."
        />

        <div className="project-feature-grid">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured
              open={openId === project.id}
              tiltEnabled={tiltEnabled}
              onToggle={() => setOpenId((current) => (current === project.id ? null : project.id))}
            />
          ))}
        </div>

        <div className="project-grid">
          {rest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              open={false}
              tiltEnabled={tiltEnabled}
              onToggle={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
