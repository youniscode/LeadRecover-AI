import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LeadProvider } from './store/LeadContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </StrictMode>,
)
