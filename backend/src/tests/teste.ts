// src/testes/teste.ts
import { ClienteService } from '../services/ClienteService';
import { ProdutoService } from '../services/ProdutoService';
import { ConsumoService } from '../services/ConsumoService';
import { Cliente } from '../models/Cliente';
import { Produto } from '../models/Produto';
import { Consumo } from '../models/Consumo';

const clienteService = new ClienteService();
const produtoService = new ProdutoService();
const consumoService = new ConsumoService();

// Criar clientes com gênero correto
for (let i = 1; i <= 15; i++) {
  clienteService.criar(new Cliente(i, `Cliente ${i}`, 'M', 0)); // 'M' para masculino
}

for (let i = 16; i <= 30; i++) {
  clienteService.criar(new Cliente(i, `Cliente ${i}`, 'F', 0)); // 'F' para feminino
}

// Criar produtos com todos os argumentos necessários
for (let i = 1; i <= 20; i++) {
  produtoService.criar(new Produto(i, `Produto ${i}`, 100, `Categoria ${i}`)); // Ajuste 'Categoria ${i}' conforme sua necessidade
}

// Registrar consumos
for (let i = 1; i <= 30; i++) {
  consumoService.registrar(new Consumo(i, i, 1)); // Ajuste o construtor conforme seu modelo
}

// Testar listagens
console.log('Clientes:', clienteService.listar());
console.log('Produtos:', produtoService.listar());
console.log('Consumos:', consumoService.listar());
