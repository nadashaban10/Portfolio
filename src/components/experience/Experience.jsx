import { useEffect, useRef, useState } from "react";
import { LuBuilding2, LuCodeXml, LuGraduationCap } from "react-icons/lu";
import { roles } from "../../data/site";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import SectionHeading from "../ui/SectionHeading";

const roleIcons = {
  paysky: LuBuilding2,
  alx: LuGraduationCap,
  isekai: LuCodeXml,
};

export default function Experience() {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const update = () => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const start = window.innerHeight * 0.32;
      const distance = Math.max(rect.height - window.innerHeight * 0.25, 1);
      const traveled = start - rect.top;
      setProgress(Math.min(1, Math.max(0, traveled / distance)));

      let current = 0;
      itemRefs.current.forEach((node, index) => {
      if (node && node.getBoundingClientRect().top <= 150) current = index;
      });
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const jumpTo = (index) => {
    const node = itemRefs.current[index];
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I have worked."
          lede="A short account of the work, including the September 2026 promotion to Senior L1."
        />

        <div className="experience-layout">
          <aside className="experience-progress" aria-label="Experience progress">
            <div className="progress-track" aria-hidden="true">
              <span className="progress-fill" style={{ "--progress": progress }} />
            </div>
            <ol>
              {roles.map((role, index) => (
                <li key={role.id}>
                  <button
                    type="button"
                    className={index === active ? "is-active" : undefined}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => jumpTo(index)}
                  >
                    <span className="progress-dot" aria-hidden="true" />
                    <span>
                      <strong>{role.org}</strong>
                      {role.period}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <ol className="role-list" ref={listRef}>
            {roles.map((role, index) => {
              const Icon = roleIcons[role.id] || LuBuilding2;
              return (
                <li
                  key={role.id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                >
                  <article className={`role-block ${index === active ? "is-reading" : ""}`}>
                    <header className="role-top">
                      <div className="role-heading">
                        <span className="role-mark" aria-hidden="true">
                          <Icon />
                        </span>
                        <div>
                          <h3>{role.title}</h3>
                          <p>{role.org}{role.context ? ` · ${role.context}` : ""}</p>
                        </div>
                      </div>
                      <p className="role-period">{role.period}</p>
                    </header>
                    {role.note ? <p className="role-note">{role.note}</p> : null}
                    <ul className="role-points">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
