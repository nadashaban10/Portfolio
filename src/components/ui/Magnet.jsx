import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export default function Magnet({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!element || reduced || !fine) return undefined;

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      element.style.transform = `translate3d(${x * 0.16}px, ${y * 0.28}px, 0)`;
    };
    const reset = () => {
      element.style.transform = "";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", reset);
    };
  }, [reduced]);

  return (
    <span className={`magnet ${className}`.trim()} ref={ref}>
      {children}
    </span>
  );
}
