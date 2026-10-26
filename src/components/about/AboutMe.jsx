import { about, education, profile } from "../../data/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../motion/Reveal";

export default function AboutMe() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-window">
            <div className="about-window-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <figure className="about-portrait">
              <img src="/images/WhatappImage.jpg" alt={`Portrait of ${profile.fullName}`} />
            </figure>
          </div>
          <div>
            <SectionHeading
              eyebrow="About"
              title="Frontend work, with a Software Engineering track behind it."
            />
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 24)}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <ul className="education-list">
          {education.map((item) => (
            <li key={item.school} className="education-card">
              <p className="eyebrow">Education</p>
              <h3>{item.program}</h3>
              <p className="education-school">{item.school}</p>
              <p className="role-period">{item.period}</p>
              <p>{item.detail}</p>
              {item.points ? (
                <ul className="education-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
