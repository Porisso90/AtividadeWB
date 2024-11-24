// main.ts
import readlineSync from 'readline-sync';
//import { Cliente } from '../src/models/Cliente';
import { ClienteService } from '../src/services/ClienteService';
import { ProdutoService } from '../src/services/ProdutoService';
//import { ConsumoService } from '../src/services/ConsumoService';

const produtoService = new ProdutoService();
//const consumoService = new ConsumoService(produtoService);
const clienteService = new ClienteService(produtoService);

function exibirMenuPrincipal() {
  console.log('==== Menu Principal ====');
  console.log('1 - Gerenciar Clientes');
  console.log('2 - Gerenciar Produtos');
  console.log('3 - Registrar Consumo');
  console.log('4 - Relatórios');
  console.log('0 - Sair');
  return readlineSync.question('Escolha uma opção: ');
}

function menuCRUDClientes() {
    let opcao = '';
    while (opcao !== '0') {
      console.log('==== CRUD de Clientes ====');
      console.log('1 - Adicionar Cliente');
      console.log('2 - Listar Clientes');
      console.log('3 - Atualizar Cliente');
      console.log('4 - Remover Cliente');
      console.log('0 - Voltar');
      opcao = readlineSync.question('Escolha uma opção: ');
  
      switch (opcao) {
        case '1':
          const nome = readlineSync.question('Nome do Cliente: ');
          const genero = readlineSync.question('Gênero do Cliente: ');
          const idade = readlineSync.questionInt('Idade do Cliente: ');
          const email = readlineSync.question('Email do Cliente: ');
          const telefone = readlineSync.question('Telefone do Cliente: ');
          clienteService.adicionarCliente(nome, genero, idade, email, telefone);
          break;
        case '2':
          console.log(clienteService.listarClientes());
          break;
          case '3':
            const idAtualizar = readlineSync.questionInt('ID do Cliente para atualizar: ');
            const novoNome = readlineSync.question('Novo Nome do Cliente: ');
            const novoGenero = readlineSync.question('Novo Gênero do Cliente: ');
            const novaIdade = readlineSync.questionInt('Nova Idade do Cliente: '); // Solicita nova idade
            const novoEmail = readlineSync.question('Novo Email do Cliente: '); // Solicita novo e-mail
            const novoTelefone = readlineSync.question('Novo Telefone do Cliente: '); // Solicita novo telefone
            clienteService.atualizarCliente(idAtualizar, novoNome, novoGenero, novaIdade, novoEmail, novoTelefone);
            console.log('Cliente atualizado com sucesso!');
            break;
        case '4':
          const idRemover = readlineSync.questionInt('ID do Cliente para remover: ');
          clienteService.removerCliente(idRemover);
          break;
        case '0':
          console.log('Voltando ao menu principal...');
          break;
        default:
          console.log('Opção inválida, tente novamente.');
      }
    }
  }
  
function menuCRUDProdutos() {
  let opcao = '';
  while (opcao !== '0') {
    console.log('==== CRUD de Produtos ====');
    console.log('1 - Adicionar Produto');
    console.log('2 - Listar Produtos');
    console.log('3 - Atualizar Produto');
    console.log('4 - Remover Produto');
    console.log('0 - Voltar');
    opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        const nomeProduto = readlineSync.question('Nome do Produto: ');
        const valor = readlineSync.questionFloat('Valor do Produto: ');
        const categoria = readlineSync.question('Categoria do Produto: ');
        produtoService.adicionarProduto(nomeProduto, valor, categoria);
        console.log('Produto adicionado com sucesso!');
        break;
      case '2':
        console.log(produtoService.listarProdutos());
        break;
      case '3':
        const idProdutoAtualizar = readlineSync.questionInt('ID do Produto para atualizar: ');
        const novoNomeProduto = readlineSync.question('Novo Nome do Produto: ');
        const novoValor = readlineSync.questionFloat('Novo Valor do Produto: ');
        const novaCategoria = readlineSync.question('Nova Categoria do Produto: ');
        produtoService.atualizarProduto(idProdutoAtualizar, novoNomeProduto, novoValor, novaCategoria);
        console.log('Produto atualizado com sucesso!');
        break;
      case '4':
        const idProdutoRemover = readlineSync.questionInt('ID do Produto para remover: ');
        produtoService.removerProduto(idProdutoRemover);
        console.log('Produto removido com sucesso!');
        break;
      case '0':
        console.log('Voltando ao menu principal...');
        break;
      default:
        console.log('Opção inválida, tente novamente.');
    }
  }
}

function iniciarPrograma() {
  let opcao = '';
  while (opcao !== '0') {
    opcao = exibirMenuPrincipal();

    switch (opcao) {
      case '1':
        menuCRUDClientes();
        break;
      case '2':
        menuCRUDProdutos();
        break;
        case '3':
            menuRegistroConsumo(); // Chama o menu de registro de consumo
        case '4':
            menuRelatorios(clienteService); // Chama o menu de listagem de consumos
      case '0':
        console.log('Encerrando o programa...');
        break;
      default:
        console.log('Opção inválida, tente novamente.');
    }
  }
}

function menuRegistroConsumo() {
    let opcao = '';
    while (opcao !== '0') {
        console.log('==== Registro de Consumo ====');
        console.log('1 - Registrar Consumo');
        console.log('2 - Listar Consumoes');
        console.log('0 - Voltar');
        opcao = readlineSync.question('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const clienteId = readlineSync.questionInt('ID do Cliente: ');
                const produtoId = readlineSync.questionInt('ID do Produto: ');
                const quantidadeId = readlineSync.questionInt('quantidade do Produto: ');
                clienteService.registrarConsumo(clienteId, produtoId,quantidadeId);
                break;
            case '2':
                console.log(clienteService.listarConsumoes());
                break;
            case '0':
                console.log('Voltando ao menu principal...');
                break;
            default:
                console.log('Opção inválida, tente novamente.');
        }
    }
}

function menuRelatorios(clienteService: ClienteService) {
  let opcao = '';
  while (opcao !== '0') {
      console.log('==== Menu de Relatórios ====');
      console.log('1 - Top 10 Clientes que Mais Consumiram');
      console.log('2 - Clientes por Gênero');
      console.log('3 - Serviços Mais Consumidos');
      console.log('4 - Serviços Mais Consumidos por Gênero');
      console.log('5 - Top 10 Clientes que Menos Consumiram');
      console.log('6 - Top 5 Clientes que Mais Consumiram em Valor');
      console.log('0 - Voltar ao Menu Principal');
      opcao = readlineSync.question('Escolha uma opção: ');

      switch (opcao) {
          case '1':
              console.log(clienteService.listarClientesMaisConsumidores());
              break;
          case '2':
              console.log(clienteService.listarClientesPorGenero());
              break;
          case '3':
              console.log(clienteService.listarServicosMaisConsumidos());
              break;
          case '4':
              console.log(clienteService.listarServicosMaisConsumidosPorGenero());
              break;
          case '5':
              console.log(clienteService.listarClientesMenosConsumidores());
              break;
          case '6':
              console.log(clienteService.listarClientesMaisConsumidoresEmValor());
              break;
          case '0':
              console.log('Voltando ao menu principal...');
              break;
          default:
              console.log('Opção inválida, tente novamente.');
      }
  }
}


// Iniciar o programa
iniciarPrograma();