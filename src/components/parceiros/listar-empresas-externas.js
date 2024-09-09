import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmpresasExternasService from "../../services/empresas-externas.service";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';

export default function ListarEmpresasExternas() {
    let emptyProduct = {
        name: "",
        companyName: "",
        collaboratorsCount: "",
        isActive: "",
    };
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const getEmpresasExternas = () => {
        EmpresasExternasService.getEmpresasExternas().then((data) => setProducts(data.data));
    }

    useEffect(() => {
        getEmpresasExternas();
    }, []);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);
        setProductDialog(false);

        if (product.id) {
            EmpresasExternasService.putEmpresaExterna(product.id, product).then((response) => {
                const savedProduct = response.data; // Dados completos vindos do backend

                let _products = [...products];

                const index = findIndexById(product.id);
                _products[index] = savedProduct; // Atualizar o produto com os dados do backend
                toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Empresa Atualizada', life: 3000 });

                setProducts(_products);
                setProduct(emptyProduct);
            }).catch(error => {
                // Tratar erro, se necessário
                console.error("Erro ao salvar empresa", error);
            });
        } else {
            EmpresasExternasService.postEmpresaExterna(product).then((response) => {
                const savedProduct = response.data; // Dados completos vindos do backend

                let _products = [...products];

                _products.push(savedProduct); // Adicionar o novo produto com os dados completos
                toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Empresa Cadastrada', life: 3000 });

                setProducts(_products);
                setProduct(emptyProduct);
            }).catch(error => {
                // Tratar erro, se necessário
                console.error("Erro ao salvar parceira", error);
            });
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        EmpresasExternasService.deleteEmpresaExternaById(product.id).then(() => toast.current.show({ severity: 'success', summary: 'Sucesso!', detail: 'Empresa deletada.', life: 3000 }));
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const toolbarTemplate = () => {
        return (
            <Button label="Adicionar Empresa" icon="pi pi-plus" severity="success" onClick={openNew} />
        );
    };

    const statusBodyTemplate = (rowData) => {
        rowData.isActive === true || rowData.isActive === "Ativa" ? rowData.isActive = "Ativa" : rowData.isActive = "Inativa"
        return <Tag value={rowData.isActive} severity={getSeverity(rowData)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.isActive) {
            case "Ativa":
                return 'success';

            case "Inativa":
                return 'danger';

            default:
                return null;
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="c-6 flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Empresas Externas</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Confirmar" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['isActive'] = e.value;
        setProduct(_product);
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar center={toolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="{first} ao {last} de {totalRecords} empresas" globalFilter={globalFilter} header={header}>
                    <Column field="id" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="companyName" header="Empresa" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="collaboratorsCount" header="N° de Colaboradores" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="isActive" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Dados da Empresa" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nome
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="companyName" className="font-bold">
                        Nome da Empresa
                    </label>
                    <InputText id="companyName" value={product.companyName} onChange={(e) => onInputChange(e, 'companyName')} />
                </div>
                <div className="field">
                    <label htmlFor="collaboratorsCount" className="font-bold">
                        N° de Colaboradores
                    </label>
                    <InputText id="collaboratorsCount" value={product.collaboratorsCount} onChange={(e) => onInputChange(e, 'collaboratorsCount')} keyfilter="int" />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Status da Empresa</label>

                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="status" name="status" value="Ativa" onChange={onCategoryChange} checked={product.isActive === "Ativa"} />
                            <label className='mb-0' htmlFor="status">Ativa</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="status2" name="status2" value="Inativa" onChange={onCategoryChange} checked={product.isActive === "Inativa"} />
                            <label className='mb-0' htmlFor="status2">Inativa</label>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Tem certeza que deseja excluir a seguinte empresa: <br></br><b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
