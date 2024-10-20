// src/services/ConsumoService.ts
import { Consumo } from '../models/Consumo';

export class ConsumoService {
  private consumos: Consumo[] = [];

  registrar(consumo: Consumo) {
    this.consumos.push(consumo);
  }

  listar(): Consumo[] {
    return this.consumos;
  }
}
