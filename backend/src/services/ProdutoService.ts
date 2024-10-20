// src/services/ProdutoService.ts
import { Produto } from '../models/Produto';

export class ProdutoService {
  private produtos: Produto[] = [];

  criar(produto: Produto) {
    this.produtos.push(produto);
  }

  listar(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  atualizar(id: number, dadosAtualizados: Partial<Produto>) {
    const produto = this.buscarPorId(id);
    if (produto) {
      Object.assign(produto, dadosAtualizados);
    }
  }

  deletar(id: number) {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }
}
