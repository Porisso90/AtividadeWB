// src/models/Consumo.ts
export class Consumo {
  constructor(
    public id: number,
    public clienteId: number,
    public produtoId: number
    // Adicione mais propriedades se necessário, mas remova o que não é necessário
  ) {}
}
