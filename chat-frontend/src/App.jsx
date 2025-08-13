import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import JoinCreatechat from './component/JoinCreateChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JoinCreatechat/>
    </>
  )
}

export default App
