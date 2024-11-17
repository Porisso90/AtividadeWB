// src/services/ConsumoService.ts
import { Consumo } from '../models/Consumo';
import { ProdutoService } from './ProdutoService';

export class ConsumoService {
  private consumos: Consumo[] = [];
  private produtoService: ProdutoService;

  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }

  registrar(consumo: Consumo) {
    this.consumos.push(consumo);
  }

  listar(): Consumo[] {
    return this.consumos;
  }
  calcularValorTotalPorCliente(clienteId: number): number {
    const consumosDoCliente = this.consumos.filter(consumo => consumo.clienteId === clienteId);
    const valorTotal = consumosDoCliente.reduce((total, consumo) => {
      return total + this.produtoService.obterValorPorId(consumo.produtoId);
    }, 0);
    return valorTotal;
  }

  
}