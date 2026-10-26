import { useRef, useState } from "react";
import { LuAppWindow, LuDatabase, LuPalette, LuShieldCheck, LuWrench } from "react-icons/lu";
import { engineering } from "../../data/site";
import SectionHeading from "../ui/SectionHeading";

const engineeringIcons = {
  frontend: LuAppWindow,
  data: LuDatabase,
  ui: LuPalette,
  quality: LuShieldCheck,
  tools: LuWrench,
};

export default function Engineering() {
  const [activeId, setActiveId] = useState(engineering[0].id);
  const tabsRef = useRef([]);
  const active = engineering.find((item) => item.id === activeId) || engineering[0];

  const onTabKeyDown = (event, index) => {
    const last = engineering.length - 1;
    let next = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveId(engineering[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="section" id="engineering">
      <div className="container">
        <SectionHeading
          eyebrow="Engineering"
          title="What I actually spend my time on."
          lede="Grouped by the kind of problem, not by a wall of logos."
        />

        <div className="engineering-layout">
          <div className="engineering-tabs" role="tablist" aria-label="Engineering strengths">
            {engineering.map((item, index) => {
              const selected = item.id === active.id;
              const Icon = engineeringIcons[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  ref={(element) => { tabsRef.current[index] = element; }}
                  aria-selected={selected}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={selected ? "is-active" : undefined}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {Icon ? <Icon aria-hidden="true" /> : null}
                  {item.title}
                </button>
              );
            })}
          </div>

          <div
            className="engineering-panel"
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
          >
            <h3>{active.title}</h3>
            <p>{active.summary}</p>
            <ul className="tag-list">
              {active.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
