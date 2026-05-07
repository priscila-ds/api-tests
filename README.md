# Automação de API com Cypress

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![API Testing](https://img.shields.io/badge/API-Testing-orange)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)



## Objetivo

Projeto de automação de testes de API utilizando Cypress, com foco em validação de endpoints REST, organização escalável e integração contínua.
Este projeto demonstra boas práticas de automação aplicadas a cenários reais, incluindo validação de status codes, contratos de resposta, autenticação e testes negativos.


## Tech Stack

- Cypress
- JavaScript
- API Testing
- Node.js
- CI/CD (GitHub Actions)
- REST APIs


### Estrutura

```
cypress/
  e2e/            → Casos de testes (users, auth)
  fixtures/       → Massa de testes. Dados estáticos (mocks)
  support/        → Custom Commands globais

services/         → Camada de abstração da API . Wrappers de serviço por domínio (UserService, AuthService)
utils/            → Helpers e geração de dados dinâmicos (dataFactory)
```

### Cenários Cobertos

- Autenticação
- CRUD de usuários
- Validação de status codes
- Testes negativos
- Validação de schema de resposta
- Tempo de resposta
- Tratamento de erros

### Instalação

```bash
npm install
```

### Configuração

```bash
cp .env.example .env
# edite BASE_URL e AUTH_TOKEN
```

### Executar testes

```bash
# Interface gráfica
npm run cy:open

# Linha de comando
npm run cy:run

# Headless (CI)
npm run cy:run:headless
```

## Integração Contínua

Os testes são executados automaticamente via GitHub Actions a cada push e pull request.





