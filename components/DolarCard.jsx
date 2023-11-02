const DolarCard = ({ oficialData, blueData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className=" p-4 rounded-lg shadow-md">
        <h3>Dólar Oficial</h3>
        <p>Precio de Compra: ${oficialData.compra}</p>
        <p>Precio de Venta: ${oficialData.venta}</p>
        {/* <p>Fecha de Actualización: {oficialData.fechaActualizacion}</p> */}
      </div>

      <div className=" p-4 rounded-lg shadow-md">
        <h3>Dólar Blue</h3>
        <p>Precio de Compra: ${blueData.compra}</p>
        <p>Precio de Venta: ${blueData.venta}</p>
        {/* <p>Fecha de Actualización: {blueData.fechaActualizacion}</p> */}
      </div>
    </div>
  );
};

export default DolarCard;