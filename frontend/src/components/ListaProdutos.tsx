import React, { useEffect, useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
}

const ListaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para buscar os produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/produtos');
      const produtosData = await response.json();

      // Verifica se a resposta é um array antes de atualizar o estado
      if (Array.isArray(produtosData)) {
        setProdutos(produtosData);  // Atualiza o estado com os produtos
      } else {
        console.error('A resposta não é um array de produtos');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();  // Chama a função para buscar os produtos ao carregar o componente
  }, []);  // O array vazio garante que a requisição seja feita apenas uma vez após o carregamento do componente

  return (
    <div>
      <h2>Lista de Produtos</h2>
      {produtos.length === 0 ? (
        <p>Não há produtos cadastrados.</p>
      ) : (
        <ul>
          {produtos.map(produto => (
            <li key={produto.id}>
              {produto.nome} - R${produto.valor} - Categoria: {produto.categoria}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaProdutos;
