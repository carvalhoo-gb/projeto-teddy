import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import profileImage from '../../assets/profile-gabriel.jpeg';
import profileImage1 from '../../assets/profile-matheus.jpeg';
import profileImage2 from '../../assets/profile-thierry.jpeg';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';

export default function Sobre() {
  const header = <h1 className='cabecalho-sobre'>Aplicação de Gestão de CEPs</h1>;
  
  const footer = (
    <div className="profile">
        
    <div className="profile-container">
        <Avatar image={profileImage} size='xlarge' shape="circle" />
        <label>Gabriel Carvalho.</label>
        <Button label="Instagram" icon="pi pi-instagram" className="p-button-outlined insta-button" onClick={() => window.open('https://www.instagram.com/carvalhoo_gb/')} />
    </div>
    
    <div className="profile-container">
        <Avatar image={profileImage1} size='xlarge' shape="circle" />
        <label>Matheus Souza.</label>
        <Button label="Instagram" icon="pi pi-instagram" className="p-button-outlined insta-button" onClick={() => window.open('https://www.instagram.com/matheuusmd/')} />
    </div>

    <div className="profile-container">
        <Avatar image={profileImage2} size='xlarge' shape="circle" />
        <label>Thierry Rodrigues.</label>
        <Button label="Instagram" icon="pi pi-instagram" className="p-button-outlined insta-button" onClick={() => window.open('https://www.instagram.com/bythierryzin_/')} />
    </div>
</div>

  );

  return (
    <div className="sobre flex justify-content-center align-items-center">
      <Card title={header} footer={footer}>
        <section>
          <h2>Funcionalidades Principais</h2>
          <h4>Consulta de CEP:</h4>
          <p>
          <ol type='1'>
            <li>O usuário insere um CEP.</li>
          </ol>
          </p>

          <h4>Listagem de CEP:</h4>
          <p>
          <ol type='1'>
            <li>O usuário pode visualizar um histórico das consultas feitas (caso aperte em salvar).</li>
            <li>O sistema consulta uma API de CEPs (ViaCEP) e retorna informações como logradouro, bairro, cidade e estado.</li>
          </ol>
          </p>
          <h4>Salvamento de CEPs:</h4>
          <p>
          <ol type='1'>
            <li>Os CEPs salvos ficam armazenados no local storage. </li>
          </ol>
          </p>

          <h4>Gerenciamento de CEPs:</h4>
          <p>
          <ol type='1'>
            <li>O usuário pode excluir CEPs salvos. </li>
          </ol>
          </p>
        </section>

        <section>
          <h2>Tecnologias Utilizadas</h2>
          <ol type='1'>
            <li>React para a construção da interface do usuário.</li>
            <li>PrimeReact para componentes ricos e estilização.</li>
            <li>Integração com APIs RESTful para consulta de CEPs.</li>
            <li>Login com armazenamento em cookie e local storage.</li>
          </ol>
        </section>

        
        <h2 className="title">Desenvolvido por:</h2>
      </Card>
    </div>
  );
}
