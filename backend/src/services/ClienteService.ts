// ClienteService.ts
import { Cliente } from '../models/Cliente';
import { Consumo } from '../models/Consumo';
import { ProdutoService } from './ProdutoService';
import { ConsumoService } from './ConsumoService';

export class ClienteService {
  private clientes: Cliente[] = [];
  private consumos: Consumo[] = [];
  private consumoService: ConsumoService | null = null;
  private proximoId = 1;

  private produtoService: ProdutoService;
  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }

  setConsumoService(consumoService: ConsumoService) {
    this.consumoService = consumoService;
  }

  adicionarCliente(nome: string, genero: string, idade: number, email: string, telefone: string): void {
    const novoCliente: Cliente = {
      id: this.proximoId,
      nome,
      genero,
      idade,
      email,
      telefone,
    };
    this.clientes.push(novoCliente);
    this.proximoId++;
    console.log("Cliente adicionado com sucesso!");
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }

  atualizarCliente(idAtualizar: number, novoNome: string, novoGenero: string, novaIdade: number, novoEmail: string, novoTelefone: string): void {
    const cliente = this.clientes.find(cliente => cliente.id === idAtualizar);
    if (cliente) {
        cliente.nome = novoNome;
        cliente.genero = novoGenero;
        cliente.idade = novaIdade; // Atualiza a idade
        cliente.email = novoEmail;  // Atualiza o e-mail
        cliente.telefone = novoTelefone; // Atualiza o telefone
        console.log("Cliente atualizado com sucesso!");
    } else {
        console.error("Cliente não encontrado.");
    }
}

  removerCliente(idRemover: number): void {
    const index = this.clientes.findIndex(cliente => cliente.id === idRemover);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      console.log("Cliente removido com sucesso!");
    } else {
      console.error("Cliente não encontrado.");
    }
  }
  registrarConsumo(clienteId: number, produtoId: number, quantidade: number): void {
    const consumo = new Consumo(clienteId, produtoId, quantidade);  // Passando quantidade agora
    this.consumos.push(consumo);
    console.log("Consumo registrado com sucesso!");
  }
  
// Método para listar todos os consumos
listarConsumoes(): Consumo[] {
    return this.consumos;
}
// 1. Listagem dos 10 clientes que mais consumiram produtos ou serviços, em quantidade
listarClientesMaisConsumidores(): Cliente[] {
  const consumosPorCliente = this.clientes.map(cliente => ({
    cliente,
    totalConsumido: this.consumos.filter(consumo => consumo.clienteId === cliente.id).length,
  }));
  return consumosPorCliente.sort((a, b) => b.totalConsumido - a.totalConsumido)
                           .slice(0, 10)
                           .map(item => item.cliente);
  
}

// 2. Listagem de todos os clientes por gênero
listarClientesPorGenero(): { [genero: string]: Cliente[] } {
  const clientes = this.clientes;
  const clientesPorGenero: { [genero: string]: Cliente[] } = {};
  clientes.forEach(cliente => {
    const genero = cliente.genero;
    if (!clientesPorGenero[genero]) {
      clientesPorGenero[genero] = [];
    }
    clientesPorGenero[genero].push(cliente);
  });
  return clientesPorGenero;
}

// 3. Listagem geral dos serviços ou produtos mais consumidos
listarServicosMaisConsumidos(): { [produtoId: number]: number } {
  const consumos = this.consumos;
  const servicosMaisConsumidos: { [produtoId: number]: number } = {};
  consumos.forEach(consumo => {
    const produtoId = consumo.produtoId;
    if (!servicosMaisConsumidos[produtoId]) {
      servicosMaisConsumidos[produtoId] = 0;
    }
    servicosMaisConsumidos[produtoId]++;
  });
  return servicosMaisConsumidos;
}

// 4. Listagem dos serviços ou produtos mais consumidos por gênero
listarServicosMaisConsumidosPorGenero(): { [genero: string]: { [produtoId: number]: number } } {
  const consumos = this.consumos;
  const clientes = this.clientes;
  const servicosMaisConsumidosPorGenero: { [genero: string]: { [produtoId: number]: number } } = {};
  consumos.forEach(consumo => {
    const clienteId = consumo.clienteId;
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    const genero = cliente ? cliente.genero : "Indefinido";
    const produtoId = consumo.produtoId;
    if (!servicosMaisConsumidosPorGenero[genero]) {
      servicosMaisConsumidosPorGenero[genero] = {};
    }
    if (!servicosMaisConsumidosPorGenero[genero][produtoId]) {
      servicosMaisConsumidosPorGenero[genero][produtoId] = 0;
    }
    servicosMaisConsumidosPorGenero[genero][produtoId]++;
  });
  return servicosMaisConsumidosPorGenero;
  
}

// 5. Listagem dos 10 clientes que menos consumiram produtos ou serviços
listarClientesMenosConsumidores(): Cliente[] {
  const consumos = this.consumos;
  const clientes = this.clientes;
  const clientesMenosConsumidores = clientes.sort((a, b) => {
    const consumosA = consumos.filter(consumo => consumo.clienteId === a.id).length;
    const consumosB = consumos.filter(consumo => consumo.clienteId === b.id).length;
    return consumosA - consumosB;
  }).slice(0, 10);
  return clientesMenosConsumidores;
}

// 6. Listagem dos 5 clientes que mais consumiram em valor, não em quantidade
listarClientesMaisConsumidoresEmValor(): Cliente[] {
  const clientes = this.clientes;
  const consumos = this.consumoService?.listar() || [];
  const clientesMaisConsumidoresEmValor = clientes.map(cliente => {
    const consumosDoCliente = consumos.filter(consumo => consumo.clienteId === cliente.id);
    const valorTotal = consumosDoCliente.reduce((total, consumo) => {
      return total + this.produtoService.obterValorPorId(consumo.produtoId);
    }, 0);
    return { cliente, valorTotal };
  }).sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5).map(item => item.cliente);
  return clientesMaisConsumidoresEmValor;
}
}
