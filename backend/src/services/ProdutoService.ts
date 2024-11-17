// src/services/ProdutoService.ts
import { Produto } from '../models/Produto';


export class ProdutoService {
  private produtos: Produto[] = [];
  private produtoMap = new Map<number, Produto>();
  private proximoId: number = 1;
  listarProdutos() {
    if (this.produtos.length === 0) {
      console.log('Nenhum produto ou serviço cadastrado.');
    } else {
      this.produtos.forEach((produto) =>
        console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Valor: ${produto.valor}`)
      );
    }
  }

  atualizarProduto(id: number, novoNome: string, novoValor: number, novaCategoria: string) {
    const produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      produto.nome = novoNome;
      produto.valor = novoValor;
      console.log('Produto atualizado com sucesso!');
    } else {
      console.log('Produto não encontrado.');
    }
  }

  removerProduto(id: number) {
    const index = this.produtos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.produtos.splice(index, 1);
      console.log('Produto removido com sucesso!');
    } else {
      console.log('Produto não encontrado.');
    }
  }

  adicionarProduto(nome: string, valor: number, categoria: string): void {
      const novoProduto = new Produto(this.proximoId, nome, valor, categoria);
      this.produtos.push(novoProduto);
      this.produtoMap.set(this.proximoId, novoProduto);
      this.proximoId++;
  }
  obterValorPorId(id: number): number {
      return this.produtoMap.get(id)?.valor || 0;
  }
  
}
