import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AppRouter from './Router/Router.jsx'
import { Toaster } from 'react-hot-toast'
import ChatProvider from './Context/ChatContext/ChatProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Toaster/>
      <ChatProvider>
      <AppRouter/>
      </ChatProvider>
      
      </BrowserRouter>

  </StrictMode>,
)
