import React, { Component } from "react";
import ParceirosService from "../../services/parceiros.service";
import { Link } from "react-router-dom";

export default class ListarParceiros extends Component {
  constructor(props) {
    super(props);
    this.retrieveParceiros = this.retrieveParceiros.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveParceiro = this.setActiveParceiro.bind(this);

    this.state = {
      parceiros: [],
      currentParceiro: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveParceiros();
  }

  retrieveParceiros() {
    ParceirosService.getParceiros()
      .then(response => {
        this.setState({
          parceiros: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveParceiros();
    this.setState({
      currentParceiro: null,
      currentIndex: -1
    });
  }

  setActiveParceiro(parceiro, index) {
    this.setState({
      currentParceiro: parceiro,
      currentIndex: index
    });
  }

  render() {
    const { parceiros, currentParceiro, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Parceiros</h4>

          <ul className="list-group">
            {parceiros &&
              parceiros.map((parceiro, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveParceiro(parceiro, index)}
                  key={index}
                >
                  {parceiro.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentParceiro ? (
            <div>
              <h4>Dados do Parceiro</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentParceiro.name}
              </div>
              <div>
                <label>
                  <strong>Descrição:</strong>
                </label>{" "}
                {currentParceiro.description}
              </div>
              <div>
                <label>
                  <strong>Clientes:</strong>
                </label>{" "}
                {currentParceiro.clients && currentParceiro.clients.map((client, index) => (
                  <div key={index}>{client}</div>
                ))}
              </div>
              <div>
                <label>
                  <strong>Projetos:</strong>
                </label>{" "}
                {currentParceiro.projects && currentParceiro.projects.map((client, index) => (
                  <div key={index}>{client}</div>
                ))}
              </div>

              <Link
                to={"/EditarParceiro/" + currentParceiro.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor, selecione um parceiro.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
