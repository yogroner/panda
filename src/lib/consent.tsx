import React, { createContext, useContext, useEffect, useState } from "react";

type ConsentChoice = "undecided" | "accepted" | "denied";

interface ConsentContextType {
  choice: ConsentChoice;
  accept: () => void;
  deny: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [choice, setChoice] = useState<ConsentChoice>(() => {
    return (localStorage.getItem("cookie_consent") as ConsentChoice) || "undecided";
  });

  const accept = () => setChoice("accepted");
  const deny = () => setChoice("denied");

  useEffect(() => {
    localStorage.setItem("cookie_consent", choice);
    
    if (choice === "accepted") {
      console.log("Consent Accepted: Initializing tracking...");
      
      // FUNCTIONAL EXAMPLE: Injecting GTM or GA only after consent
      // We check if it already exists to avoid double injection
      if (!document.getElementById("gtm-script")) {
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TT9C75WP');
        `;
        document.head.appendChild(script);
      }
    }
  }, [choice]);

  return (
    <ConsentContext.Provider value={{ choice, accept, deny }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used within ConsentProvider");
  return context;
};
