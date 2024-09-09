import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'primereact/resources/themes/saga-orange/theme.css';  // Tema específico
import 'primereact/resources/primereact.min.css';          // Estilos primários do PrimeReact
import 'primeicons/primeicons.css';                        // Ícones do PrimeIcons
import "./App.css";                      

import ListarParceiros from "./components/parceiros/listar-parceiros.component";
import ListarEmpresasExternas from "./components/empresas-externas/listar-empresas-externas";
import Sobre from "./components/sobre/sobre";
import Login from "./components/login/login";

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Condicionalmente renderiza a Navbar apenas se o caminho não for "/login" */}
      {location.pathname !== '/' && (
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
            <li className="nav-item">
              <Link to={"/Sobre"} className="nav-link">
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Sair
              </Link>
            </li>
          </div>
        </nav>
      )}

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ListarParceiros" element={<ListarParceiros />} />
          <Route path="/ListarEmpresasExternas" element={<ListarEmpresasExternas />} />
          <Route path="/Sobre" element={<Sobre />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
