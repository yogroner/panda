import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };
      setMousePos({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const lerpRing = () => {
      // Smoothly follow the mouse reference
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(lerpRing);
    };

    lerpRing();
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Only run once on mount

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-accent1 rounded-full pointer-events-none z-[9999] mix-blend-exclusion transition-[width,height,background] duration-200 group-hover:w-4 group-hover:h-4 group-hover:bg-accent2 will-change-transform high-contrast:bg-white high-contrast:mix-blend-normal"
        style={{ 
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)` 
        }}
      />
      {/* Ring - lerps behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-accent1/50 rounded-full pointer-events-none z-[9998] transition-[width,height,border-color] duration-300 cubic-bezier(0.23,1,0.32,1) group-hover:w-16 group-hover:h-16 group-hover:border-accent2 will-change-transform high-contrast:border-white"
      />
    </>
  );
};
