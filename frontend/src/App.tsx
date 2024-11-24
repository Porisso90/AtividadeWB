import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ClienteForm from "./components/ClienteForm";
import ProdutoForm from "./components/ProdutoForm";
import ListaClientes from "./components/ListaClientes";
import ListaProdutos from "./components/ListaProdutos";
import ListaConsumos from "./components/ListaConsumos";
import ConsumoForm from "./components/ConsumoForm";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/consumos">Consumos</Link></li>
          <li><Link to="/cadastro-consumo">Cadastrar Consumo</Link></li>
          <li><Link to="/cadastro-cliente">Cadastrar Cliente</Link></li>
          <li><Link to="/cadastro-produto">Cadastrar Produto</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/produtos" element={<ListaProdutos />} />
        <Route path="/consumos" element={<ListaConsumos />} />
        <Route path="/cadastro-consumo" element={<ConsumoForm />} />
        <Route path="/cadastro-cliente" element={<ClienteForm />} />
        <Route path="/cadastro-produto" element={<ProdutoForm />} />
        <Route path="/" element={<h1>Bem-vindo ao Sistema de Gestão!</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
