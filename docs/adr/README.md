# Architecture Decision Records (ADRs)

Este diretório contém as decisões arquiteturais tomadas durante o desenvolvimento do boilerplate.

## Índice

- [ADR-001: Separação entre Repositories e Gateways](./001-repository-gateway-separation.md)
- [ADR-002: Cliente HTTP Reutilizável](./002-http-client-reusability.md)
- [ADR-003: Migração para Awilix](./003-awilix-dependency-injection.md)
- [ADR-004: Integração com Awilix-Express](./004-awilix-express-integration.md)

## Formato

Cada ADR segue o formato:

- **Status**: Proposto | Aceito | Rejeitado | Superseded
- **Contexto**: Situação que motivou a decisão
- **Decisão**: O que foi decidido
- **Consequências**: Impactos positivos e negativos
- **Alternativas Consideradas**: Outras opções avaliadas

## Como Contribuir

Ao fazer mudanças arquiteturais significativas:

1. Crie um novo ADR numerado sequencialmente
2. Documente o contexto e a decisão
3. Liste as consequências e alternativas
4. Atualize este README com o link

## Referências

- [Architecture Decision Records](https://adr.github.io/)
- [ADR Template](https://github.com/joelparkerhenderson/architecture-decision-record)