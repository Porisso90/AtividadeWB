// src/services/ConsumoService.ts
import { Consumo } from '../models/Consumo';
import { ProdutoService } from './ProdutoService';

export class ConsumoService {
  private consumos: Consumo[] = [];
  private produtoService: ProdutoService;

  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }

  registrar(clienteId: number, produtoId: number, quantidade: number) {
    const consumo = new Consumo(clienteId, produtoId, quantidade);
    this.consumos.push(consumo);
    console.log("Consumo registrado com sucesso!");
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