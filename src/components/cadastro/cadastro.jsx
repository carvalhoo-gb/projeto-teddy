import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./cadastro.css";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

useEffect(() => {
        document.body.classList.add('cadastro-page');
        return () => {
            document.body.classList.remove('cadastro-page');
        };
    }, []);

  const handleCadastro = () => {
    navigate('/'); // Redireciona para a página login
    window.location.reload(); 
  };

  return (
    <div className="cadastro-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     <Card title="Cadastro" style={{ width: '300px'}}>
        <div className="p-fluid">
          <div className="field">
          <label htmlFor="nome">Nome</label>
          <InputText id="nome" type='text'/>
        </div>
          <div className="field">
          <label htmlFor="username">E-mail</label>
          <InputText id="username" type='email'/>
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <InputText id="password" type='password'/>
        </div>
        <Button label='Cadastrar' onClick={handleCadastro} className="btn-cadastrar"/>
       </div>
      </Card>
    </div>
  );
};

