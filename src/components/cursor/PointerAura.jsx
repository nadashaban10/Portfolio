import { useEffect, useRef } from "react";

export default function PointerAura() {
  const auraRef = useRef(null);

  useEffect(() => {
    const aura = auraRef.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!aura || !fine || reduced) return undefined;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    let running = true;

    const loop = () => {
      if (!running) return;
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      aura.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      aura.dataset.visible = "true";
      const interactive = event.target.closest?.("a, button, input, textarea, summary");
      aura.dataset.hot = interactive ? "true" : "false";
    };

    const onLeave = () => {
      aura.dataset.visible = "false";
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) frame = requestAnimationFrame(loop);
      else cancelAnimationFrame(frame);
    };

    aura.dataset.visible = "false";
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div ref={auraRef} className="pointer-aura" aria-hidden="true" />;
}
