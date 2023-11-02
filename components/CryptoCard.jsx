
const CryptoCard = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(data).map(([exchange, exchangeData]) => (
        <div key={exchange} className="bg-white p-4 rounded-lg shadow-md">
          <h3>{exchange}</h3>
          <p>Precio de Compra: ${exchangeData.ask}</p>
          <p>Precio de Venta: ${exchangeData.bid}</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoCard;