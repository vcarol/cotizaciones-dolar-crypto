const DolarCard = ({ oficialData, blueData, bolsaData, cclData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex flex-col justify-center items-center gap-4 py-5 px-4 md:p-6 rounded-lg shadow-md bg-white dark:bg-[#131316]">
        <h3 className="font-bold uppercase">Dólar Oficial</h3>
        <div className="flex gap-12 text-center">
          <div>
            <p className="text-xs text-gray-500">Compra</p>
            <p className="font-bold text-lg">${oficialData.compra}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Venta</p>
            <p className=" font-bold text-lg">${oficialData.venta}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 py-5 px-4 md:p-6 rounded-lg shadow-md bg-white dark:bg-[#131316]">
        <h3 className="font-bold uppercase">Dólar Blue</h3>
        <div className="flex gap-12 text-center">
          <div>
            <p className="text-xs text-gray-500">Compra</p>
            <p className="font-bold text-lg">${blueData.compra}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Venta</p>
            <p className=" font-bold text-lg">${blueData.venta}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 py-5 px-4 md:p-6 rounded-lg shadow-md bg-white dark:bg-[#131316]">
        <h3 className="font-bold uppercase">Dólar Mep/Bolsa</h3>
        <div className="flex gap-12 text-center">
          <div>
            <p className="text-xs text-gray-500">Compra</p>
            <p className="font-bold text-lg">${bolsaData.compra}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Venta</p>
            <p className="font-bold text-lg">${bolsaData.venta}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 py-5 px-4 md:p-6 rounded-lg shadow-md bg-white dark:bg-[#131316]">
        <h3 className="font-bold uppercase">Dólar CCL</h3>
        <div className="flex gap-12 text-center">
          <div>
            <p className="text-xs text-gray-500">Compra</p>
            <p className="font-bold text-lg">${cclData.compra}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Venta</p>
            <p className="font-bold text-lg">${cclData.venta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DolarCard;