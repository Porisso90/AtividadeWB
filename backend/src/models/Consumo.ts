// src/models/Consumo.ts
export class Consumo {
  clienteId: number;
  produtoId: number;
  quantidade: number;  // Adicionando quantidade
  data: Date;

  constructor(clienteId: number, produtoId: number, quantidade: number) {
    this.clienteId = clienteId;
    this.produtoId = produtoId;
    this.quantidade = quantidade;
    this.data = new Date();  // A data é automaticamente registrada na criação
  }
}
