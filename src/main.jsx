import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// <App />
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container">
      <App />
    </div>
  </StrictMode>,
)

