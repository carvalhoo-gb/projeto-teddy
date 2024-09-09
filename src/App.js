import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
// import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.min.css';          // Estilos primários do PrimeReact
import 'primeicons/primeicons.css';                        // Ícones do PrimeIcons
import Cookies from 'js-cookie';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import LogoTeddy from "./media/logo-teddy.png";
import './App.css'

import ListarParceiros from "./components/parceiros/listar-parceiros.component";
import ListarEmpresasExternas from "./components/empresas-externas/listar-empresas-externas";
import Sobre from "./components/sobre/sobre";
import Login from "./components/login/login";

function App() {
  const location = useLocation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Tenta obter o nome de usuário do cookie
    const user = Cookies.get('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </a>
  );
  const items = [
    {
      label: 'Parceiros',
      url: '/ListarParceiros'
    },
    {
      label: 'Empresas Externas',
      url: '/ListarEmpresasExternas'
    },
    {
      label: 'Sobre',
      url: '/Sobre'
    },
    {
      label: 'Sair',
      url: '/' // Redireciona para a página de login
    }
  ];

  const start = <img alt="logo" src={LogoTeddy} height="40" className="mr-2"></img>;

  const end = (
    <div className="flex align-items-center gap-2">
      <span className="mx-2">{username ? `Bem-vindo, ${username}` : ''}</span>
    </div>
  );

  return (
    <div className="card">
      {location.pathname !== '/' && (
        <Menubar model={items} start={start} end={end} className="custom-menubar" />
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
  )
}

export default App;
