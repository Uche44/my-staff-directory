import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import VConsole from "vconsole";

// Only enable vConsole in development or as needed
if (import.meta.env.MODE === "development") {
  new VConsole();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
