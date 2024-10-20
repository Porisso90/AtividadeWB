// src/services/ClienteService.ts
import { Cliente } from '../models/Cliente';

export class ClienteService {
  private clientes: Cliente[] = [];

  criar(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  listar(): Cliente[] {
    return this.clientes;
  }

  buscarPorId(id: number): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  atualizar(id: number, dadosAtualizados: Partial<Cliente>) {
    const cliente = this.buscarPorId(id);
    if (cliente) {
      Object.assign(cliente, dadosAtualizados);
    }
  }

  deletar(id: number) {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
  }
}