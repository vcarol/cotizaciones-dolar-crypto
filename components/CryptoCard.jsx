
const CryptoCard = ({ data }) => {

  // Inicializamos valores iniciales para el mejor precio de compra y venta
  let bestAsk = Number.MAX_VALUE; // Inicializado con un valor grande
  let bestBid = 0; // Inicializado con un valor pequeño
  let bestAskExchange = ''; // Nombre del exchange con el mejor precio de compra
  let bestBidExchange = ''; // Nombre del exchange con el mejor precio de venta


  // Iteramos a través de los datos para encontrar los mejores precios
  for (const [exchange, exchangeData] of Object.entries(data)) {
    if (exchangeData.ask < bestAsk) {
      bestAsk = exchangeData.ask;
      bestAskExchange = exchange;
    }
    if (exchangeData.bid > bestBid) {
      bestBid = exchangeData.bid;
      bestBidExchange = exchange;
    }
  }

  return (
    <div>
      <p>Mejor Precio de Compra: ${bestAsk} en {bestAskExchange}</p>
      <p>Mejor Precio de Venta: ${bestBid} en {bestBidExchange}</p>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(data).map(([exchange, exchangeData]) => (
          <div key={exchange} className="p-4 rounded-lg shadow-md">
            <h3>{exchange}</h3>
            <p>Precio de Compra: ${exchangeData.ask}</p>
            <p>Precio de Venta: ${exchangeData.bid}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoCard;