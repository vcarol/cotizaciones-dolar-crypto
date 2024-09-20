import Image from "next/image";
import Link from "next/link";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const CryptoCard = ({ data }) => {
  // Inicializamos valores iniciales para el mejor precio de compra y venta
  let bestAsk = Number.MAX_VALUE; // Inicializado con un valor grande
  let bestBid = 0; // Inicializado con un valor pequeño
  let bestAskExchange = ""; // Nombre del exchange con el mejor precio de compra
  let bestBidExchange = ""; // Nombre del exchange con el mejor precio de venta
  let bestAskExchangeImg = ""; // Logo del exchange con el mejor precio de compra
  let bestBidExchangeImg = ""; // Logo del exchange con el mejor precio de venta

  // Iteramos a través de los datos para encontrar los mejores precios
  for (const [exchange, exchangeData] of Object.entries(data)) {
    if (exchangeData.ask < bestAsk) {
      bestAsk = exchangeData.ask;
      bestAskExchange = exchangeData.name;
      bestAskExchangeImg = exchangeData.img;
    }
    if (exchangeData.bid > bestBid) {
      bestBid = exchangeData.bid;
      bestBidExchange = exchangeData.name;
      bestBidExchangeImg = exchangeData.img;
    }
  }

  return (
    <div>
      <div className="flex justify-evenly mb-12 flex-wrap text-md gap-y-6 ">
        <div>
          <p className="font-bold pb-2 text-center">Mejor Precio de Compra</p>
          <div className="py-3 px-8 bg-white dark:bg-[#131316] rounded-xl flex gap-2 ">
            <Image
              src={bestAskExchangeImg}
              alt=""
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <div className="flex gap-2">
              <h5>{bestAskExchange}</h5>
              <h4 className="font-bold">${bestAsk.toLocaleString("es-AR")}</h4>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold pb-2 text-center">Mejor Precio de Venta</p>
          <div className="py-3 px-8 bg-white dark:bg-[#131316] rounded-xl flex gap-2 ">
            <Image
              src={bestBidExchangeImg}
              alt=""
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <div className="flex gap-2">
              <h5>{bestBidExchange}</h5>
              <h4 className="font-bold">${bestBid.toLocaleString("es-AR")}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mx-auto rounded-2xl flex md:px-24 sm:p-12 py-8 px-4 mb-6 bg-white items-center dark:bg-[#131316] overflow-x-auto">
          <table className="w-full table-auto text-center ">
            <thead className="font-medium ">
              <tr className="text-[14px] md:text-[16px]">
                <th
                  scope="col"
                  className=" font-medium pt-0 pb-3 text-slate-400 dark:text-slate-200 "
                >
                  Exchange
                </th>
                <th
                  scope="col"
                  className="font-medium pt-0 pb-3 text-slate-400 dark:text-slate-200 "
                >
                  Comprá a
                </th>
                <th
                  scope="col"
                  className=" font-medium pt-0 pb-3 text-slate-400 dark:text-slate-200 "
                >
                  Vendé a
                </th>
                <th
                  scope="col"
                  className=" font-medium pt-0 pb-3 text-slate-400 dark:text-slate-200 "
                ></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([exchange, exchangeData]) => (
                <tr
                  key={exchange}
                  className="border-b border-[#f0eff5] dark:border-[#23232a] transition duration-300 ease-in-out hover:bg-[#f0eff5] dark:hover:bg-[#23232a] cursor-pointer"
                >
                  <td className="p-4 whitespace-nowrap flex items-center gap-2 md:gap-4 text-sm md:text-md lg:text-lg ">
                    <Image
                      src={exchangeData.img}
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <h3 className="pr-3 md:pr-0 font-semibold">
                      {exchangeData.name}
                    </h3>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm md:text-md lg:text-lg">
                    ${exchangeData.ask.toLocaleString("es-AR")}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm md:text-md lg:text-lg">
                    ${exchangeData.bid.toLocaleString("es-AR")}
                  </td>
                  <td className="p-4">
                    <Link href={exchangeData.link} target="_blank">
                      <BsFillArrowUpRightSquareFill className="text-[#a063f5] text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
