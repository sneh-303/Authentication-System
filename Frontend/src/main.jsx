import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>  //Additional checks: It enables extra checks and warnings 
  // Double rendering: It intentionally renders components twice to help identify issues with side effects, missing cleanup functions, or incorrect state management.
    <App />
  // {/* </StrictMode>, */}
)
