import React, { useState, useEffect } from 'react';

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>Não há clientes cadastrados.</p>
      ) : (
        <ul>
          {clientes.map((cliente: any) => (
            <li key={cliente.id}>
              {cliente.nome} - {cliente.idade} anos
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaClientes;
