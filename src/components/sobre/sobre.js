import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import profileImage from '../../media/profile.jpg';
import 'primeflex/primeflex.css';

export default function Sobre() {
  const header = <h1>Aplicação de Gestão de Empresas Externas e Parceiros</h1>;
  const footer = (
    <div className="flex flex-column align-items-center">
      <Avatar image={profileImage} size="xlarge" shape="circle" />
      <label className="mt-3">Desenvolvido por Kayã Haufe.</label>
    </div>
  );

  return (
    <div className="sobre flex justify-content-center align-items-center min-h-screen">
      <Card title={header} footer={footer}>
        <section>
          <h2>Visão Geral</h2>
          <p>
            A aplicação de <strong>Gestão de Empresas Externas e Parceiros</strong> é uma solução voltada para o gerenciamento
            e administração de dados de empresas parceiras e colaboradores. O sistema permite que os usuários realizem o
            cadastro, edição e exclusão de empresas externas, com funcionalidades adicionais como filtragem de dados,
            paginação e suporte a operações CRUD (Create, Read, Update, Delete).
          </p>
        </section>

        <section>
          <h2>Tecnologias Utilizadas</h2>
          <ul>
            <li>React para a construção da interface do usuário</li>
            <li>PrimeReact para componentes ricos e estilização</li>
            <li>Integração com APIs RESTful para CRUD de dados</li>
            <li>Login com armazenamento em cookie e local storage</li>
          </ul>
        </section>

        <section>
          <h2>Funcionalidades Principais</h2>
          <ul>
            <li>Cadastro e edição de empresas externas e parceiros</li>
            <li>Suporte a filtragem e busca global de empresas</li>
            <li>Paginação dinâmica para grandes volumes de dados</li>
            <li>Feedbacks interativos com Toasts para ações bem-sucedidas</li>
          </ul>
        </section>
      </Card>
    </div>
  );
}
