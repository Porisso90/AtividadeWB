import React, { useState, useEffect } from "react";

const ConsumoForm: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]); // Clientes cadastrados
  const [produtos, setProdutos] = useState<any[]>([]); // Produtos cadastrados
  const [clienteId, setClienteId] = useState<number | string>(""); // ID do cliente selecionado
  const [produtoId, setProdutoId] = useState<number | string>(""); // ID do produto selecionado
  const [quantidade, setQuantidade] = useState<number>(1); // Quantidade do produto consumido

  // Carregar lista de produtos e clientes
  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch("http://localhost:5000/api/clientes");
      const data = await response.json();
      setClientes(data);
    };

    const fetchProdutos = async () => {
      const response = await fetch("http://localhost:5000/api/produtos");
      const data = await response.json();
      
      // Garantir que o retorno seja um array
      if (Array.isArray(data)) {
        setProdutos(data);
      } else {
        console.error("Erro: dados de produtos não são um array", data);
      }
    };

    fetchClientes();
    fetchProdutos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteId || !produtoId || quantidade <= 0) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    const consumo = { clienteId, produtoId, quantidade };

    const response = await fetch("http://localhost:5000/api/consumos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consumo),
    });

    const data = await response.json();
    if (data.message === "Consumo registrado com sucesso!") {
      alert("Consumo registrado com sucesso!");
    } else {
      alert("Erro ao registrar consumo.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Consumo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecione o cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Produto:</label>
          <select
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          >
            <option value="">Selecione o produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} - {produto.valor}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min="1"
          />
        </div>

        <button type="submit">Registrar Consumo</button>
      </form>
    </div>
  );
};

export default ConsumoForm;
