# Arquitetura do Projeto

## Visão Geral

Este projeto implementa uma arquitetura em camadas para automação de testes de API, seguindo princípios de separação de responsabilidades e reutilização de código.

## Camadas

### 1. Testes (`cypress/e2e/`)

Organizados por domínio de negócio:

| Domínio | Arquivo | Descrição |
|---------|---------|-----------|
| Auth | `login.cy.js` | Cenários positivos de autenticação |
| Auth | `login-negative.cy.js` | Cenários negativos de autenticação |
| Users | `users.cy.js` | CRUD e cenários positivos de usuários |
| Users | `users-negative.cy.js` | Cenários negativos de usuários |
| Products | `products.cy.js` | CRUD e cenários de produtos |
| Carts | `carts.cy.js` | Fluxo de carrinho de compras |

### 2. Services (`services/`)

Camada de abstração para comunicação com a API:

| Service | Responsabilidade |
|---------|------------------|
| `httpClient.js` | Wrapper HTTP centralizado com `failOnStatusCode: false` |
| `auth.service.js` | Operações de autenticação |
| `users.service.js` | CRUD de usuários |
| `products.service.js` | CRUD de produtos |
| `carts.service.js` | Operações de carrinho |

### 3. Schemas (`cypress/schemas/`)

Contratos JSON Schema para validação de respostas:

| Schema | Uso |
|--------|-----|
| `auth.schema.js` | Login e erros de autenticação |
| `user.schema.js` | Usuários e listagens |
| `product.schema.js` | Produtos e listagens |
| `cart.schema.js` | Carrinhos e itens |

### 4. Utils (`utils/`)

Utilitários reutilizáveis:

| Util | Função |
|------|--------|
| `dataFactory.js` | Geração de massa de teste dinâmica |
| `schemaValidator.js` | Validação de contratos com AJV |

### 5. Fixtures (`cypress/fixtures/`)

Massa estática para cenários específicos:

| Fixture | Conteúdo |
|---------|----------|
| `auth.json` | Credenciais inválidas e formatos de email |
| `products.json` | Produtos com dados inválidos |

## Fluxo de Dados

```
Teste (cy.js)
    ↓
Service (services/*.js)
    ↓
HttpClient (services/httpClient.js)
    ↓
API ServeRest
    ↓
Response
    ↓
Schema Validation (utils/schemaValidator.js)
    ↓
Assertions
```

## Boas Práticas

### Massa Dinâmica

O `dataFactory.js` gera dados únicos usando timestamp + random:

```javascript
const uniqueId = () => `${Date.now()}${Math.floor(Math.random() * 10000)}`;
```

Isso garante que cada execução use dados diferentes, evitando conflitos.

### Fail on Status Code False

O `HttpClient` configura `failOnStatusCode: false` por padrão, permitindo que cenários negativos (400, 401, 404) retornem a resposta para validação em vez de falhar o teste.

### Validação de Contrato

O `schemaValidator.js` usa AJV para validar respostas contra schemas JSON:

```javascript
validateContract(schema, responseBody);
```

### Cleanup

Testes que criam dados fazem cleanup ao final para manter a base limpa:

```javascript
after(() => {
  if (resourceId) {
    Service.delete(resourceId);
  }
});
```

## CI/CD

O pipeline no GitHub Actions:

1. Instala dependências com `npm ci`
2. Executa testes com `npm run cy:run:headless`
3. Publica artefatos (relatório HTML, vídeos, screenshots)

## Extensibilidade

Para adicionar um novo domínio:

1. Criar service em `services/novo.service.js`
2. Criar schemas em `cypress/schemas/novo.schema.js`
3. Criar testes em `cypress/e2e/novo/novo.cy.js`
4. Adicionar builders no `utils/dataFactory.js` se necessário
