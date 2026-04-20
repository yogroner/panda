import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConsentProvider } from './lib/consent';
import { AccessibilityProvider } from './lib/accessibility';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsentProvider>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </ConsentProvider>
  </StrictMode>,
);
