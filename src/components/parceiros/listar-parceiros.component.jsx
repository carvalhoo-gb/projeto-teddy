import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ParceirosService from "../../services/parceiros.service";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function ListarParceiros() {
    const [cepData, setCepData] = useState(null);
    const [cep, setCep] = useState('');
    const [cepsSalvos, setCepsSalvos] = useState([]); // Lista de CEPs salvos
    const toast = useRef(null);

    useEffect(() => {
        carregarCepsSalvos(); // Carrega os CEPs salvos no início
        getCepData('01001000'); // Busca um CEP padrão
    }, []);

    // Buscar CEP da API
    const getCepData = (cep) => {
        if (!cep) {
            toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Digite um CEP válido.', life: 3000 });
            return;
        }

        ParceirosService.getParceiroById(cep).then((response) => {
            setCepData(response.data);
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Erro!', detail: 'Não foi possível buscar o CEP.', life: 3000 });
        });
    };

    // Salvar CEP no localStorage
    const salvarCep = () => {
        if (!cepData) return;

        let ceps = JSON.parse(localStorage.getItem("ceps")) || [];
        if (!ceps.find(c => c.cep === cepData.cep)) {
            ceps.push(cepData);
            localStorage.setItem("ceps", JSON.stringify(ceps));
            setCepsSalvos(ceps);
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'CEP salvo!', life: 2000 });
        } else {
            toast.current.show({ severity: 'info', summary: 'Atenção', detail: 'CEP já foi salvo.', life: 2000 });
        }
    };

    // Carregar CEPs salvos
    const carregarCepsSalvos = () => {
        let ceps = JSON.parse(localStorage.getItem("ceps")) || [];
        setCepsSalvos(ceps);
    };

    // Limpar todos os CEPs salvos
    const limparCeps = () => {
        localStorage.removeItem("ceps");
        setCepsSalvos([]);
        toast.current.show({ severity: 'warn', summary: 'Limpo', detail: 'Todos os CEPs foram removidos.', life: 2000 });
    };

    return (
        <div className='body-ceps'>
            <Toast ref={toast} />
            <div className="card">
                <h1>Consulta de CEP</h1>
                <div className="search-container">
                    <InputText value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP..." />
                    <Button label="Buscar" icon="pi pi-search" onClick={() => getCepData(cep)} />
                </div>
                {cepData && (
                    <div className='cep-container'>
                        <h5>Dados do CEP:</h5>
                        <p><strong>CEP:</strong> {cepData.cep}</p>
                        <p><strong>Logradouro:</strong> {cepData.logradouro}</p>
                        <p><strong>Bairro:</strong> {cepData.bairro}</p>
                        <p><strong>Cidade:</strong> {cepData.localidade} - {cepData.uf}</p>
                        <Button label="Salvar CEP" icon="pi pi-save" onClick={salvarCep} className="p-button-success" />
                  </div>
                )}
   <br></br> <hr></hr>
                <div className='text-home'><h4>CEPs Salvos</h4></div>
                <hr></hr>
                <DataTable value={cepsSalvos} paginator rows={5}>
                    <Column field="cep" header="CEP" sortable></Column>
                    <Column field="logradouro" header="Logradouro" sortable></Column>
                    <Column field="bairro" header="Bairro" sortable></Column>
                    <Column field="localidade" header="Cidade" sortable></Column>
                    <Column field="uf" header="Estado" sortable></Column>
                </DataTable>
                <Button label="Limpar CEPs" icon="pi pi-trash" className="p-button-danger" onClick={limparCeps} />
            </div>
        </div>
    );
}
