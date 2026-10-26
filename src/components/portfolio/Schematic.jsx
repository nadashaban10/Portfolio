export default function Schematic({ kind }) {
  if (kind === "dashboard") {
    return (
      <div className="schematic schematic-dashboard" aria-hidden="true">
        <span className="schematic-side" />
        <div>
          <span className="schematic-stats" />
          <span className="schematic-chart" />
          <span className="schematic-rows" />
        </div>
      </div>
    );
  }

  if (kind === "food") {
    return (
      <div className="schematic schematic-food" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
    );
  }

  if (kind === "education") {
    return (
      <div className="schematic schematic-education" aria-hidden="true">
        <span className="schematic-title" />
        <span className="schematic-copy" />
        <div><i /><i /><i /></div>
      </div>
    );
  }

  if (kind === "company") {
    return (
      <div className="schematic schematic-company" aria-hidden="true">
        <span className="schematic-nav" />
        <span className="schematic-mark" />
        <span className="schematic-copy" />
      </div>
    );
  }

  if (kind === "angular") {
    return (
      <div className="schematic schematic-angular" aria-hidden="true">
        <span className="schematic-search" />
        <span /><span /><span />
      </div>
    );
  }

  return (
    <div className="schematic schematic-commerce" aria-hidden="true">
      <span className="schematic-nav" />
      <span className="schematic-stage" />
      <div><i /><i /><i /></div>
    </div>
  );
}
