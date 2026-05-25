# Automação de API com Cypress

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)
![API Testing](https://img.shields.io/badge/API-Testing-orange)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

Projeto moderno de automação de testes de API utilizando Cypress, com arquitetura escalável, organização por domínio, validação de contratos, relatórios HTML, evidências e integração contínua.

O projeto usa a API pública [ServeRest](https://serverest.dev/) como alvo de testes para demonstrar fluxos reais de autenticação, usuários, testes negativos e validações REST.

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
cypress/fixtures/               Massa estática de testes
cypress/schemas/                Contratos JSON Schema
cypress/support/                Commands e setup global
services/                       Camada de serviços por domínio
utils/                          Factories e helpers reutilizáveis
docs/                           Documentação técnica
```

## Cenários Cobertos

- Autenticação com sucesso
- Credenciais inválidas
- CRUD de usuários
- Cadastro duplicado
- Validação de status codes
- Validação de contrato de resposta
- Validação de tempo de resposta
- Geração de evidências e relatório HTML

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
