import { Consumo } from './Consumo';
export class Cliente {
    constructor(
      public id: number,
      public nome: string,
      public genero: 'M' | 'F',
      public totalGasto: number = 0,
      public consumoProdutos: Consumo[] = []
    ) {}
  }
  