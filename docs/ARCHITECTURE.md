# Arquitetura do Projeto

Este projeto separa testes, serviços, dados e validações para facilitar manutenção e crescimento por domínio.

## Camadas

- `cypress/e2e`: specs funcionais organizadas por domínio de negócio.
- `services`: wrappers de API responsáveis por centralizar chamadas HTTP.
- `cypress/schemas`: contratos JSON Schema usados nas validações de resposta.
- `utils`: factories e helpers reutilizáveis.
- `cypress/fixtures`: massa estática para cenários específicos.
- `cypress/evidence`: screenshots e vídeos gerados nas execuções.
- `cypress/reports/html`: relatório HTML Mochawesome.

## Boas práticas aplicadas

- Testes independentes, com massa criada dinamicamente.
- `failOnStatusCode: false` centralizado para permitir validação explícita de cenários negativos.
- Contratos de resposta validados com JSON Schema.
- Scripts padronizados para execução local e CI.
- Workflow do GitHub Actions com upload de relatórios e evidências.
