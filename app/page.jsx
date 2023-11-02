'use client'
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';


export default function Home() {

  
  {/* Dark Theme */}
  const [darkMode, setDarkMode] = useState(() => {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    if(darkMode === 'dark'){
      document.querySelector('html').classList.add('dark')
    }else {
      document.querySelector('html').classList.remove('dark')
    }
  })

  // funcion para cambiar el modo oscuro/claro
  const toggleDarkMode = () => {
    setDarkMode(prev => prev === 'light' ? 'dark' : 'light')
  }
  {/* Fin Dark Theme */}


  return (
    <main className='dark:bg-neutral-900 h-screen dark:text-white'>
      <button 
        className='w-[40px] h-[40px] bg-slate-400 rounded-full flex items-center justify-center'
        onClick={toggleDarkMode}
      >
        {darkMode === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
      hey
    </main>
  )
}
