import React, { useState } from 'react';
import "./cadastro.css";

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

