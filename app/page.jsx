'use client'
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { fetchDolarData } from '../api/dolarApi';
import DolarCard from "@/components/DolarCard";

import { fetchCryptoExchangeData } from '../api/cryptoApi';
import CryptoCard from '@/components/CryptoCard';


export default function Home() {

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return 'dark';
    }
    return 'light';
  });

  const [dolarOficialData, setDolarOficialData] = useState(null);
  const [dolarBlueData, setDolarBlueData] = useState(null);

  const [cryptoData, setCryptoData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('usdt'); // estado inicial para la criptomoneda seleccionada

  const [lastDolarUpdate, setLastDolarUpdate] = useState(null);
  const [lastCryptoUpdate, setLastCryptoUpdate] = useState(null);

  const [loading, setLoading] = useState(true);

  // Dolar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const oficialData = await fetchDolarData('oficial')
        const blueData = await fetchDolarData('blue')
        setDolarOficialData(oficialData)
        setDolarBlueData(blueData)
        setLoading(false); // cambia el estado a falso cuando los datos se han cargado
        setLastDolarUpdate(new Date())
      } catch (error) {
        console.error('Error fetching dollar data:', error)
        setLoading(false); // es para asegurar que se desactive el estado en caso de error
      }
    }

    fetchData()
  }, [])

  // Crypto 
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const exchanges = ['belo', 'lemoncash', 'ripio', 'letsbit']
        const coin = selectedCrypto; // utiliza la criptomoneda seleccionada
        const fiat = 'ars'
        const volume = 0.1
        const cryptoData = {}

        for (const exchange of exchanges) {
          const exchangeData = await fetchCryptoExchangeData(exchange, coin, fiat, volume)
          cryptoData[exchange] = exchangeData
        }

        setCryptoData(cryptoData);
        setLastCryptoUpdate(new Date())
        setLoading(false); // cambia el estado a falso cuando los datos se han cargado
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false); // es para asegurar que se desactive el estado en caso de error
      }
    };

    fetchCryptoData()
  }, [selectedCrypto])

  // Función para manejar el cambio en el select
  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value)
  }
  
  // Dark Theme 
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

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin h-10 w-10 mr-2 text-slate-400">
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <span>Cargando...</span>
        </div>
      ) : (
        <>
          {/* Dolar Section */}
          {dolarOficialData && dolarBlueData && (
            <DolarCard oficialData={dolarOficialData} blueData={dolarBlueData} />
          )}

          {/* Crypto Section */}
          {/* select para seleccionar la criptomoneda */}
          <label htmlFor="cryptoSelect" className="font-semibold">
            Selecciona una criptomoneda:
          </label>
          <select
            id="cryptoSelect"
            value={selectedCrypto}
            onChange={handleCryptoChange}
            className="ml-2 p-2 border rounded-md"
          >
            <option value="usdt">USDT</option>
            <option value="usdc">USDC</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>

          {/* Muestra los datos de criptomonedas usando el componente CryptoCard */}
          {cryptoData && <CryptoCard data={cryptoData} />}
          {/* fecha */}
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Última actualización: {lastCryptoUpdate && lastCryptoUpdate.toLocaleString()}
          </p>
        </>
      )}
    </main>
  )
}
