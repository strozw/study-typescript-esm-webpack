import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'

const dom = document.getElementById('root')

if (dom) {
  createRoot(dom).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
