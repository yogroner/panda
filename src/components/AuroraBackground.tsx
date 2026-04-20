import React from "react";

export const AuroraBackground: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[60vh] rounded-full blur-[40px] opacity-[0.12] animate-aurora-drift bg-[radial-gradient(circle,_#b3ffc8_0%,_transparent_70%)] [transform:translateZ(0)] will-change-transform" />
        <div className="absolute top-[20%] right-[-15%] w-[50vw] h-[70vh] rounded-full blur-[40px] opacity-[0.12] animate-aurora-drift bg-[radial-gradient(circle,_#ff6ef7_0%,_transparent_70%)] [animation-duration:18s] [animation-delay:-6s] [transform:translateZ(0)] will-change-transform" />
        <div className="absolute bottom-[-10%] left-[30%] w-[55vw] h-[55vh] rounded-full blur-[40px] opacity-[0.12] animate-aurora-drift bg-[radial-gradient(circle,_#5eadff_0%,_transparent_70%)] [animation-duration:20s] [animation-delay:-3s] [transform:translateZ(0)] will-change-transform" />
      </div>
      <div className="fixed inset-0 z-[1] opacity-[0.035] pointer-events-none noise" aria-hidden="true" />
    </>
  );
};
