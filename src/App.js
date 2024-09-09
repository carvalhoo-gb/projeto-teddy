import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'primereact/resources/themes/saga-orange/theme.css';  // Tema específico
import 'primereact/resources/primereact.min.css';          // Estilos primários do PrimeReact
import 'primeicons/primeicons.css';                        // Ícones do PrimeIcons

import ListarParceiros from "./components/parceiros/listar-parceiros.component";
import ListarEmpresasExternas from "./components/parceiros/listar-empresas-externas";

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
              <Link to={"/ListarEmpresasExternas"} className="nav-link">
                Empresas Externas
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListarParceiros/>} />
            <Route path="/ListarParceiros" element={<ListarParceiros/>} />
            <Route path="/ListarEmpresasExternas" element={<ListarEmpresasExternas/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
