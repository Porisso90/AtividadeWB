import express, { Request, Response } from 'express';
import cors from 'cors';
import { ClienteService } from './services/ClienteService';
import { ProdutoService } from './services/ProdutoService';
import { ConsumoService } from './services/ConsumoService';
//import { Consumo } from './models/Consumo';  // Importando o modelo Consumo

// Criando as instâncias dos serviços
const produtoService = new ProdutoService();
const consumoService = new ConsumoService(produtoService);
const clienteService = new ClienteService(produtoService);

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Rota de clientes
app.get('/api/clientes', (_req: Request, res: Response) => {
  res.json(clienteService.listarClientes());
});

app.post('/api/clientes', (req: Request, res: Response) => {
  const { nome, genero, idade, email, telefone } = req.body;

  // Verificando se os dados obrigatórios foram fornecidos
  if (!nome || !genero || !idade || !email || !telefone) {
    return res.status(400).json({ message: 'Faltam dados obrigatórios' });
  }

  // Chamando o método para adicionar cliente
  clienteService.adicionarCliente(nome, genero, idade, email, telefone);
  
  return res.status(201).json({ message: 'Cliente adicionado com sucesso!' });
});

// Rota de produtos
app.get('/api/produtos', (_req, res) => {
  const produtos = produtoService.listarProdutos();
  if (produtos.length === 0) {
    return res.status(404).json({ message: 'Nenhum produto ou serviço cadastrado.' });
  }
  return res.status(200).json(produtos);
});

app.post('/api/produtos', (req, res) => {
  const { nome, valor, categoria } = req.body;

  if (!nome || !valor || !categoria) {
    return res.status(400).json({ message: 'Nome, valor e categoria são obrigatórios!' });
  }

  // Adiciona o produto através do ProdutoService
  produtoService.adicionarProduto(nome, valor, categoria);

  return res.status(201).json({
    message: 'Produto adicionado com sucesso!',
    produto: { nome, valor, categoria },
  });
});

// Rota para registrar consumo
app.post('/api/consumos', (req: Request, res: Response) => {
  const { clienteId, produtoId, quantidade } = req.body;

  if (!clienteId || !produtoId || !quantidade) {
    return res.status(400).json({ message: 'Cliente, produto e quantidade são obrigatórios!' });
  }

  // Registra o consumo com a quantidade
  consumoService.registrar(clienteId, produtoId, quantidade);

  return res.status(201).json({
    message: 'Consumo registrado com sucesso!',
    consumo: { clienteId, produtoId, quantidade },
  });
});


// Rota para listar consumos
app.get('/api/consumos', (_req: Request, res: Response) => {
  const consumos = consumoService.listar();
  res.json(consumos);
});

// Rota para obter os consumos de um cliente
app.get('/api/consumo/:clienteId', (req: Request, res: Response) => {
  const { clienteId } = req.params;
  const consumos = consumoService.listar().filter(consumo => consumo.clienteId === parseInt(clienteId));
  res.json(consumos);
});

// Rota para calcular o valor total consumido por um cliente
app.get('/api/consumo/total/:clienteId', (req: Request, res: Response) => {
  const { clienteId } = req.params;
  const total = consumoService.calcularValorTotalPorCliente(parseInt(clienteId));
  res.json({ total });
});

// Iniciar o servidor
app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
