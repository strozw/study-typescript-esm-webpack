import React from 'react'
import { createRoot } from 'react-dom/client'

const { App } = await import('./App')

const dom = document.getElementById('root')

if (dom) {
  createRoot(dom).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
