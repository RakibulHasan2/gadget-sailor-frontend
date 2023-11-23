import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SelectedProductsProvider } from './context/SelectedProductsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedProductsProvider>
      <App />
    </SelectedProductsProvider>
  </React.StrictMode>,
)
