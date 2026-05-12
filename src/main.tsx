import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LeadProvider } from './store/LeadContext'
import { LanguageProvider } from './store/LanguageContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <LeadProvider>
        <App />
      </LeadProvider>
    </LanguageProvider>
  </StrictMode>,
)
