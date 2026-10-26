import { useEffect, useRef, useState } from "react";
import { latticeNodes } from "../../data/site";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

function Fallback({ activeId }) {
  return (
    <svg className="lattice-fallback" viewBox="0 0 320 320" role="img" aria-label="Diagram of connected frontend systems">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <line x1="160" y1="150" x2="70" y2="78" />
        <line x1="160" y1="150" x2="250" y2="70" />
        <line x1="160" y1="150" x2="160" y2="250" />
        <line x1="160" y1="150" x2="58" y2="196" />
        <line x1="160" y1="150" x2="262" y2="188" />
        <line x1="160" y1="150" x2="168" y2="46" />
      </g>
      {latticeNodes.map((node) => {
        const points = {
          react: [160, 150],
          next: [70, 78],
          angular: [250, 70],
          typescript: [160, 250],
          javascript: [58, 196],
          css: [262, 188],
          html: [168, 46],
        }[node.id] || [160, 150];
        const active = node.id === activeId;
        return (
          <circle
            key={node.id}
            cx={points[0]}
            cy={points[1]}
            r={node.id === "react" ? 16 : 9}
            className={active ? "is-active" : undefined}
          />
        );
      })}
    </svg>
  );
}

export default function SystemLattice({ activeId, onHover }) {
  const canvasRef = useRef(null);
  const apiRef = useRef(null);
  const hoverRef = useRef(onHover);
  const activeRef = useRef(activeId);
  const [fallback, setFallback] = useState(false);
  const reduced = usePrefersReducedMotion();
  hoverRef.current = onHover;
  activeRef.current = activeId;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let cancelled = false;
    let api;

    const probe = document.createElement("canvas");
    const webgl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!webgl) {
      setFallback(true);
      return undefined;
    }
    webgl.getExtension("WEBGL_lose_context")?.loseContext();

    import("./createLattice")
      .then(({ mountLattice }) => {
        if (cancelled || !canvasRef.current) return;
        api = mountLattice(canvasRef.current, {
          reduced,
          onHover: (id, pinned) => hoverRef.current?.(id, pinned),
        });
        apiRef.current = api;
        api.highlight(activeRef.current);
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      api?.destroy();
      apiRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    apiRef.current?.highlight(activeId);
  }, [activeId]);

  return (
    <div className="lattice-stage">
      {fallback ? (
        <Fallback activeId={activeId} />
      ) : (
        <canvas ref={canvasRef} className="lattice-canvas" aria-hidden="true" />
      )}
    </div>
  );
}
