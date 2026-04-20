import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    const saved = localStorage.getItem("accessibility_settings");
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      largeText: false,
    };
  });

  useEffect(() => {
    localStorage.setItem("accessibility_settings", JSON.stringify(state));
    
    // Apply classes to body and html
    const html = document.documentElement;
    const body = document.body;
    
    body.classList.toggle("high-contrast", state.highContrast);
    html.classList.toggle("large-text", state.largeText);
  }, [state]);

  const toggleHighContrast = () => setState(s => ({ ...s, highContrast: !s.highContrast }));
  const toggleLargeText = () => setState(s => ({ ...s, largeText: !s.largeText }));

  return (
    <AccessibilityContext.Provider value={{
      ...state,
      toggleHighContrast,
      toggleLargeText
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return context;
};
