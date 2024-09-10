# Projeto Teddy

Este projeto é uma aplicação de micro front-ends (facilitando o desenvolvimento individiual de um módulo especifico) para cadastro e gestão de parceiros e empresas externas. A aplicação utiliza React (com PrimeReact) e Angular 15. O projeto é containerizado para facilitar o deploy em ambientes de cloud, como AWS ECS.

## Tecnologias Utilizadas

- **Frontend:** React, PrimeReact, Angular 15
- **Containerização:** Docker
<!-- - **Deploy:** GitHub Pages, AWS ECS -->

## Estrutura do Projeto

- `src/` - Código-fonte da aplicação.
- `public/` - Arquivos estáticos e `index.html`.
- `docker/` - Arquivos relacionados ao Docker.

## TODO / TASKS
- [ ] Implementar testes unitários (estimado: 3 dias)
- [ ] Automatizar testes de integração (estimado: 5 dias)
- [ ] Deploy no Vercel (estimado: 1 dia)

## Configuração do Projeto

### 1. Clonando o Repositório

```sh
git clone https://github.com/kayahaufe/teddy.git
cd teddy
```

Rode o seguinte comando no diretório do projeto

```
npm install && npm start
```

Link para acessar no navegador: http://localhost:8081