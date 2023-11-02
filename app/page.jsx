'use client'
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { fetchDolarData } from '../api/dolarApi';
import DolarCard from "@/components/DolarCard";

import { fetchCryptoExchangeData } from '../api/cryptoApi';
import CryptoCard from '@/components/CryptoCard';


export default function Home() {

  const [dolarOficialData, setDolarOficialData] = useState(null);
  const [dolarBlueData, setDolarBlueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oficialData = await fetchDolarData('oficial');
        const blueData = await fetchDolarData('blue');
        setDolarOficialData(oficialData);
        setDolarBlueData(blueData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dollar data:', error);
      }
    };

    fetchData();
  }, []);


  
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
      <br />

      {/* Dolar Section */}
      {dolarOficialData && dolarBlueData && (
          <DolarCard oficialData={dolarOficialData} blueData={dolarBlueData} />
      )}

    </main>
  )
}
