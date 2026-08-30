# Automação de API com Cypress

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![API Testing](https://img.shields.io/badge/API-Testing-orange)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

Projeto moderno de automação de testes de API utilizando Cypress, com arquitetura escalável, organização por domínio, validação de contratos, relatórios HTML, evidências e integração contínua.

O projeto usa a API pública [ServeRest](https://serverest.dev/) como alvo de testes para demonstrar fluxos reais de autenticação, usuários, produtos, carrinhos, testes negativos e validações REST.

## Tech Stack

- Cypress
- JavaScript
- Node.js
- AJV para JSON Schema
- Mochawesome Reporter
- GitHub Actions

## Estrutura

```text
.github/workflows/              Pipeline de CI
cypress/e2e/                    Testes funcionais por domínio
  ├── auth/                     Testes de autenticação
  ├── users/                    Testes de usuários
  ├── products/                 Testes de produtos
  └── carts/                    Testes de carrinhos
cypress/fixtures/               Massa estática de testes
cypress/schemas/                Contratos JSON Schema
cypress/support/                Commands e setup global
services/                       Camada de serviços por domínio
utils/                          Factories e helpers reutilizáveis
docs/                           Documentação técnica
```

## Cenários Cobertos

### Autenticação
- Login com sucesso (usuário administrador)
- Credenciais inválidas (401)
- Validação de campos obrigatórios (400)
- Validação de formato de email
- Validação de contrato de resposta

### Usuários
- CRUD completo (criar, consultar, atualizar, remover)
- Cadastro com email duplicado (400)
- Busca de usuário inexistente (400)
- Atualização de usuário inexistente (400)
- Remoção de usuário inexistente (400)
- Validação de campos obrigatórios
- Cadastro de usuário não administrador
- Listagem com validação de SLA de tempo de resposta
- Validação de contrato de resposta

### Produtos
- CRUD completo (criar, consultar, atualizar, remover)
- Cadastro com nome duplicado (400)
- Busca de produto inexistente (400)
- Criação sem autenticação (401)
- Criação com token inválido (401)
- Remoção sem autenticação (401)
- Listagem com validação de SLA de tempo de resposta
- Validação de contrato de resposta

### Carrinhos
- Criação e consulta de carrinho
- Cancelamento de compra
- Conclusão de compra
- Busca de carrinho inexistente (400)
- Criação sem autenticação (401)
- Criação com produto inexistente (400)
- Criação com quantidade maior que estoque (400)
- Listagem com validação de SLA de tempo de resposta
- Validação de contrato de resposta

## Instalação

```bash
npm install
```

## Configuração

```bash
cp .env.example .env
```

Variáveis disponíveis:

```env
BASE_URL=https://serverest.dev
REQUEST_TIMEOUT_MS=5000
```

## Executar testes

```bash
# Interface gráfica
npm run cy:open

# Linha de comando
npm run cy:run

# Headless para CI
npm run cy:run:headless

# Alias principal
npm run test:api

# Executar testes por domínio
npx cypress run --spec "cypress/e2e/auth/**/*.cy.js"
npx cypress run --spec "cypress/e2e/users/**/*.cy.js"
npx cypress run --spec "cypress/e2e/products/**/*.cy.js"
npx cypress run --spec "cypress/e2e/carts/**/*.cy.js"
```

## Relatorios e Evidencias

Após a execução, os artefatos são gerados em:

```text
cypress/reports/html             Relatório HTML Mochawesome
cypress/evidence/videos          Vídeos da execução
cypress/evidence/screenshots     Screenshots em caso de falha
```

## Integração Contínua

O workflow `.github/workflows/api-tests.yml` executa os testes automaticamente em push, pull request e também manualmente pelo `workflow_dispatch`.

Ao final da execução, o GitHub Actions publica os artefatos:

- Relatório HTML
- Vídeos
- Screenshots

## Arquitetura

Mais detalhes em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Boas Práticas Implementadas

- **Massa dinâmica**: Dados de teste gerados dinamicamente para evitar conflitos
- **Fail on status code false**: Permite testar cenários negativos sem falhar no `cy.request`
- **Validação de contrato**: Schemas JSON validados com AJV
- **Organização por domínio**: Testes, services e schemas organizados por contexto
- **Cleanup**: Remoção de dados de teste após execução
- **SLA de performance**: Validação de tempo de resposta máximo
- **CI/CD**: Pipeline automatizado com GitHub Actions
