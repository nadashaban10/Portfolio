import Reveal from "../motion/Reveal";

export default function SectionHeading({ eyebrow, title, lede }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </Reveal>
  );
}
