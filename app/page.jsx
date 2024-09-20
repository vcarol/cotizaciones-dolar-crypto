"use client";
/* imagenes exchanges */
import beloImg from "../public/criptos/belo.jpg";
import lemonImg from "../public/criptos/lemon.jpg";
import ripioImg from "../public/criptos/ripio.jpg";
import letsImg from "../public/criptos/lestbit.jpg";
import buenbitImg from "../public/criptos/buenbit.png";
import bybitImg from "../public/criptos/bybit.jpg";
import tiendaImg from "../public/criptos/tiendacrypto.png";
import bitsoImg from "../public/criptos/bitso-logo.png";
import fiwindImg from "../public/criptos/fiwind.jpg";

/* iconos selected crypto */
import usdtIcon from "../public/criptos/tether.svg";
import usdcIcon from "../public/criptos/usdc.svg";
import ethIcon from "../public/criptos/ethereum.svg";
import btcIcon from "../public/criptos/bitcoin.svg";
import daiIcon from "../public/criptos/dai.svg";

import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { fetchDolarData } from "../api/dolarApi";
import DolarCard from "@/components/DolarCard";

import { fetchCryptoExchangeData } from "../api/cryptoApi";
import CryptoCard from "@/components/CryptoCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState("dark");

  const [dolarOficialData, setDolarOficialData] = useState(null);
  const [dolarBlueData, setDolarBlueData] = useState(null);
  const [dolarBolsaData, setDolarBolsaData] = useState(null);
  const [dolarCclData, setDolarCclData] = useState(null);

  const [cryptoData, setCryptoData] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("usdt"); // estado inicial para la criptomoneda seleccionada

  const [lastDolarUpdate, setLastDolarUpdate] = useState(null);
  const [lastCryptoUpdate, setLastCryptoUpdate] = useState(null);

  const [loading, setLoading] = useState(true);

  /* imagenes exchange */
  const exchangeImg = {
    belo: beloImg,
    lemoncash: lemonImg,
    ripio: ripioImg,
    letsbit: letsImg,
    buenbit: buenbitImg,
    bitsoalpha: bitsoImg,
    bybit: bybitImg,
    tiendacrypto: tiendaImg,
    ripio: ripioImg,
    fiwind: fiwindImg,
  };

  useEffect(() => {
    // Dolar
    // función para obtener los datos del dolar
    const fetchData = async () => {
      // try {
      //   const dolarData = await fetchDolarData()
      //   if (dolarData && dolarData.length > 0) {
      //     const oficialData = dolarData.find(item => item.casa.nombre === 'Dolar Oficial')
      //     const blueData = dolarData.find(item => item.casa.nombre === 'Dolar Blue')
      //     const bolsaData = dolarData.find(item => item.casa.nombre === 'Dolar Bolsa')
      //     const cclData = dolarData.find(item => item.casa.nombre === 'Dolar Contado con Liqui')
      //     setDolarOficialData(oficialData.casa)
      //     setDolarBlueData(blueData.casa)
      //     setDolarBolsaData(bolsaData.casa)
      //     setDolarCclData(cclData.casa)
      //     setLoading(false)
      //     setLastDolarUpdate(new Date())

      //   } else {
      //     console.error('No se encontraron datos del dolar.')
      //     setLoading(false)
      //   }

      // } catch (error) {
      //   console.error('Error fetching dollar data:', error)
      //   setLoading(false)
      // }

      // llamada anterior, con otra api
      try {
        const oficialData = await fetchDolarData("oficial");
        const blueData = await fetchDolarData("blue");
        const cclData = await fetchDolarData("contadoconliqui");
        const bolsaData = await fetchDolarData("bolsa");
        setDolarOficialData(oficialData);
        setDolarBlueData(blueData);
        setDolarCclData(cclData);
        setDolarBolsaData(bolsaData);
        setLoading(false); // cambia el estado a falso cuando los datos se han cargado
        setLastDolarUpdate(new Date());
      } catch (error) {
        console.error("Error fetching dollar data:", error);
        setLoading(false); // es para asegurar que se desactive el estado en caso de error
      }
    };

    // función para obtener los datos de criptomonedas
    const fetchCryptoData = async () => {
      try {
        const exchanges = [
          "belo",
          "lemoncash",
          "ripio",
          "buenbit",
          "letsbit",
          "bitsoalpha",
          "bybit",
          "tiendacrypto",
          "ripio",
          "fiwind",
        ];
        const coin = selectedCrypto; // utiliza la criptomoneda seleccionada
        const fiat = "ars";
        const volume = 0.1;
        const exchangeLinks = {
          belo: {
            link: "https://belo.app/",
            name: "Belo",
          },
          lemoncash: {
            link: "https://www.lemon.me/",
            name: "Lemon Cash",
          },
          letsbit: {
            link: "https://www.letsbit.io/",
            name: "Let's Bit",
          },
          buenbit: {
            link: "https://buenbit.com/",
            name: "Buenbit",
          },
          bitsoalpha: {
            link: "https://bitso.com/",
            name: "Bitso Alpha",
          },
          bybit: {
            link: "https://bybit.com/",
            name: "Bybit",
          },
          tiendacrypto: {
            link: "https://tiendacrypto.com/",
            name: "TiendaCrypto",
          },
          ripio: {
            link: "https://ripio.com/",
            name: "Ripio",
          },
          fiwind: {
            link: "https://fiwind.io/",
            name: "fiwind",
          },
        };

        const cryptoData = {};

        for (const exchange of exchanges) {
          const exchangeData = await fetchCryptoExchangeData(
            exchange,
            coin,
            fiat,
            volume
          );
          exchangeData.img = exchangeImg[exchange]; // se asocia el enlace al intercambio
          exchangeData.link = exchangeLinks[exchange].link; // se asocia el enlace al intercambio
          exchangeData.name = exchangeLinks[exchange].name; // se asocia el enlace al intercambio
          cryptoData[exchange] = exchangeData;
        }

        setCryptoData(cryptoData);
        setLastCryptoUpdate(new Date());
        setLoading(false); // cambia el estado a falso cuando los datos se han cargado
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false); // es para asegurar que se desactive el estado en caso de error
      }
    };

    // Realiza la primera llmada al montar el componente y se  programa llamadas periodicas
    fetchData();
    fetchCryptoData();

    const dolarInterval = setInterval(fetchData, 3 * 60 * 1000);
    const cryptoInterval = setInterval(fetchCryptoData, 3 * 60 * 1000);

    // limpia los intervalos
    return () => {
      clearInterval(dolarInterval);
      clearInterval(cryptoInterval);
    };
  }, [selectedCrypto]);
  //****************************************************************** */

  // Función para manejar el cambio en el select
  const handleCrypto = (crypto) => {
    setSelectedCrypto(crypto);
  };
  // con select / options
  // const handleCryptoChange = (e) => {
  //   setSelectedCrypto(e.target.value)
  // }
  //****************************************************************** */
  // Dark Theme
  useEffect(() => {
    if (darkMode === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  });

  // funcion para cambiar el modo oscuro/claro
  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  {
    /* Fin Dark Theme */
  }

  return (
    <main className="dark:bg-[#23232a] dark:text-[#ddd] border-none ">
      <div className="max-w-[1140px] mx-auto md:px-8 px-4 ">
        <div className="flex flex-col">
          {/* header */}
          <div className="flex justify-between items-center w-full h-24">
            <div className="dar:text-white font-bold text-xl">
              Argen<span className="text-[#a063f5]">Coin.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/faq"
                className="hidden font-bold text-sm hover:text-[#a063f5]"
              >
                Ayuda/FAQ
              </Link>
              <button
                className="w-[34px] h-[34px] bg-[#a063f5] text-white rounded-full flex items-center justify-center"
                onClick={toggleDarkMode}
              >
                {darkMode === "dark" ? (
                  <FaSun size={18} />
                ) : (
                  <FaMoon size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="text-center my-8">
            <h1 className="text-[28px] sm:text-3xl md:text-4xl font-semibold">
              Cotizaciones 💸 <br />
              al alcance de tu mano
            </h1>
            <div className="w-full mt-4 mb-8 text-md md:text-lg leading-normal opacity-70 font-medium">
              Sigue las cotizaciones en vivo de las criptomonedas más
              destacadas,
              <br className="hidden md:block" /> como Bitcoin, Ethereum y las
              stablecoins, además del dólar.
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
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
          <section>
            {/* Dolar Section */}
            <div>
              {dolarOficialData &&
                dolarBlueData &&
                dolarBolsaData &&
                dolarCclData && (
                  <DolarCard
                    oficialData={dolarOficialData}
                    blueData={dolarBlueData}
                    bolsaData={dolarBolsaData}
                    cclData={dolarCclData}
                  />
                )}
            </div>

            {/* Crypto Section */}

            {/* select para seleccionar la criptomoneda */}
            <div>
              <div className="flex flex-col gap-y-4 justify-center items-center mt-12 pb-8">
                <label
                  htmlFor="cryptoSelect"
                  className="font-bold text-xl md:text-xl"
                >
                  Selecciona una criptomoneda:
                </label>
                <div className="flex flex-wrap justify-center mx-auto gap-2 font-bold text-base md:text-lg">
                  <div
                    className={`flex items-center gap-1 py-2 pl-3 pr-4 rounded-md cursor-pointer ${
                      darkMode === "dark" ? "dark:bg-[#131316]" : "bg-white "
                    } ${selectedCrypto === "usdt" ? "selected" : ""}`}
                    onClick={() => handleCrypto("usdt")}
                    title="Tether"
                  >
                    <Image
                      src={usdtIcon}
                      alt=""
                      className="w-5 h-5 md:w-7 md:h-7"
                    />
                    USDT
                  </div>
                  <div
                    className={`flex items-center gap-1 py-2 pl-3 pr-4 rounded-md cursor-pointer ${
                      darkMode === "dark" ? "dark:bg-[#131316]" : "bg-white "
                    } ${selectedCrypto === "usdc" ? "selected" : ""}`}
                    onClick={() => handleCrypto("usdc")}
                    title="USD Coin"
                  >
                    <Image
                      src={usdcIcon}
                      alt=""
                      className="w-5 h-5 md:w-7 md:h-7"
                    />
                    USDC
                  </div>
                  <div
                    className={`flex items-center gap-1 py-2 pl-3 pr-4 rounded-md cursor-pointer ${
                      darkMode === "dark" ? "dark:bg-[#131316]" : "bg-white "
                    } ${selectedCrypto === "dai" ? "selected" : ""}`}
                    onClick={() => handleCrypto("dai")}
                    title="Dai"
                  >
                    <Image
                      src={daiIcon}
                      alt=""
                      className="w-5 h-5 md:w-7 md:h-7 "
                    />
                    DAI
                  </div>
                  <div
                    className={`flex items-center gap-1 py-2 pl-3 pr-4 rounded-md cursor-pointer ${
                      darkMode === "dark" ? "dark:bg-[#131316]" : "bg-white "
                    } ${selectedCrypto === "btc" ? "selected" : ""}`}
                    onClick={() => handleCrypto("btc")}
                    title="Bitcoin"
                  >
                    <Image
                      src={btcIcon}
                      alt=""
                      className="w-5 h-5 md:w-7 md:h-7 "
                    />
                    BTC
                  </div>
                  <div
                    className={`flex items-center gap-1 py-2 pl-3 pr-4 rounded-md cursor-pointer ${
                      darkMode === "dark" ? "dark:bg-[#131316]" : "bg-white "
                    } ${selectedCrypto === "eth" ? "selected" : ""}`}
                    onClick={() => handleCrypto("eth")}
                    title="Ethereum"
                  >
                    <Image
                      src={ethIcon}
                      alt=""
                      className="w-5 h-5 md:w-7 md:h-7"
                    />
                    ETH
                  </div>
                </div>
                {/* <select
                  id="cryptoSelect"
                  value={selectedCrypto}
                  onChange={handleCryptoChange}
                  className="py-2 border rounded-md bg-white dark:bg-[#131316] px-4 border-none w-44"
                >
                  <option value="usdt">USDT</option>
                  <option value="usdc">USDC</option>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                </select> */}
              </div>

              {/* Muestra los datos de criptomonedas usando el componente CryptoCard */}
              {cryptoData && <CryptoCard data={cryptoData} />}
            </div>
          </section>
        )}
        {/* fecha y data */}
        <div className="flex flex-wrap gap-12 justify-center items-center mt-16 pb-6 ">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Última actualización:{" "}
              {lastCryptoUpdate && lastCryptoUpdate.toLocaleString()}
            </p>
            {/* <p className="text-xs text-gray-500 dark:text-gray-300">Se utilizaron APIs de <Link href='https://criptoya.com/' className='text-[#a063f5]'>CriptoYa</Link> y <Link href='https://dolarsi.com/' className='text-[#a063f5]'>DolarSi</Link></p> */}
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Todos los precios son pasados a $ARS.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Los valores son meramente informativos y <br /> se basan en la
              información provista por <br /> cada proveedor{" "}
              <Link
                href="https://criptoya.com/"
                className="text-[#a063f5]"
                target="_blank"
              >
                CriptoYa
              </Link>{" "}
              y{" "}
              <Link
                href="https://dolarapi.com/"
                className="text-[#a063f5]"
                target="_blank"
              >
                DolarAPI
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
