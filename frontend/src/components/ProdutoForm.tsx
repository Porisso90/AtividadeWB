
// src/components/ProdutoForm.tsx
import React, { useState, useEffect } from 'react';

interface Produto {
  id: number;
  nome: string;
  valor: number;
  categoria: string;
}

interface ProdutoFormProps {
  produtoEdit?: Produto;
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({ produtoEdit }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (produtoEdit) {
      setNome(produtoEdit.nome);
      setValor(produtoEdit.valor);
      setCategoria(produtoEdit.categoria);
    }
  }, [produtoEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const novoProduto = { nome, valor, categoria };

    try {
      if (produtoEdit) {
        // Atualizando produto
        await fetch(`http://localhost:500/api/produtos/${produtoEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoProduto),
        });
        alert('Produto atualizado com sucesso!');
      } else {
        // Adicionando novo produto
        await fetch('http://localhost:5000/api/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoProduto),
        });
        alert('Produto adicionado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao processar produto', error);
      alert('Houve um erro ao processar a solicitação.');
    }
  };

  return (
    <div>
      <h2>{produtoEdit ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <button type="submit">{produtoEdit ? 'Atualizar Produto' : 'Adicionar Produto'}</button>
      </form>
    </div>
  );
};

export default ProdutoForm;
