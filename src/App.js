import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'primereact/resources/themes/saga-orange/theme.css';  // Tema específico
import 'primereact/resources/primereact.min.css';          // Estilos primários do PrimeReact
import 'primeicons/primeicons.css';                        // Ícones do PrimeIcons

import AdicionarParceiro from "./components/parceiros/adicionar-parceiro";
import ListarParceiros from "./components/parceiros/listar-parceiros.component";
import EditarParceiro from "./components/parceiros/editar-parceiro.component";
import Parceiros from "./components/parceiros/parceiros.component";
import Tabela from "./components/parceiros/tabela.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/ListarParceiros"} className="navbar-brand">
            Teddy
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/ListarParceiros"} className="nav-link">
                Parceiros
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Parceiros"} className="nav-link">
                Tabela
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/AdicionarParceiro"} className="nav-link">
                Adicionar Parceiro
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListarParceiros/>} />
            <Route path="/ListarParceiros" element={<ListarParceiros/>} />
            <Route path="/Parceiros" element={<Parceiros/>} />
            <Route path="/Tabela" element={<Tabela/>} />
            <Route path="/AdicionarParceiro" element={<AdicionarParceiro/>} />
            <Route path="/EditarParceiro/:id" element={<EditarParceiro/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
