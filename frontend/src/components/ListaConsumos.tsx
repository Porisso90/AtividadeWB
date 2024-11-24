import React, { useState, useEffect } from 'react';

const ListaConsumos: React.FC = () => {
  const [consumos, setConsumos] = useState<any[]>([]);

  useEffect(() => {
    const fetchConsumos = async () => {
      const response = await fetch('http://localhost:5000/api/consumos');
      const data = await response.json();
      setConsumos(data);
    };

    fetchConsumos();
  }, []);

  return (
    <div>
      <h2>Lista de Consumos</h2>
      {consumos.length === 0 ? (
        <p>Não há consumos registrados.</p>
      ) : (
        <ul>
          {consumos.map((consumo: any) => (
            <li key={consumo.data}>
              Cliente ID: {consumo.clienteId}, Produto ID: {consumo.produtoId}, 
              Quantidade: {consumo.quantidade}, Data: {new Date(consumo.data).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaConsumos;
