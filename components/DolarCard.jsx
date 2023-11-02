
const DolarCard = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3>Dólar Oficial</h3>
        <p>Precio de Compra: ${data.oficial.compra}</p>
        <p>Precio de Venta: ${data.oficial.venta}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3>Dólar MEP</h3>
        <p>Precio de Compra: ${data.mep.compra}</p>
        <p>Precio de Venta: ${data.mep.venta}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3>Dólar Blue</h3>
        <p>Precio de Compra: ${data.blue.compra}</p>
        <p>Precio de Venta: ${data.blue.venta}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3>Dólar CCL</h3>
        <p>Precio de Compra: ${data.ccl.compra}</p>
        <p>Precio de Venta: ${data.ccl.venta}</p>
      </div>
    </div>
  );
};

export default DolarCard;