import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                        
import Cookies from 'js-cookie';
import { Menubar } from 'primereact/menubar';
import LogoTeddy from "./assets/logo-teddy.png";
import './App.css';

import ListarParceiros from "./components/parceiros/listar-parceiros.component";
import ListarEmpresasExternas from "./components/empresas-externas/listar-empresas-externas";
import Sobre from "./components/sobre/sobre";
import Login from "./components/login/login";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Tenta obter o nome de usuário do cookie
    const user = Cookies.get('username');
    user && setUsername(user);
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('username');
    localStorage.removeItem('username');
    setUsername(''); // Limpa o estado do username
    navigate('/'); // Redireciona para a página de login
  };

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
      command: handleLogout // Adiciona a função de logout ao clicar em "Sair"
    }
  ];

  const start = <img alt="logo" src={LogoTeddy} height="40" className="mr-2" />;

  const end = (
    <div className="welcome flex align-items-center gap-2">
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
  );
}

export default App;
