# Boilerplate TypeScript Minimal

Boilerplate minimal para APIs em TypeScript com boas práticas.

## Características

- ✅ TypeScript configurado
- ✅ Express.js
- ✅ Arquitetura em camadas (Entity/Controller/Service/Repository/Infra)
- ✅ Injeção de dependência
- ✅ Separação de domínio e infraestrutura
- ✅ Middleware de segurança (Helmet, CORS)
- ✅ Rate limiting
- ✅ Validação com Zod
- ✅ Tratamento de erros específicos
- ✅ Result Pattern
- ✅ DTOs para API
- ✅ Health checks avançados
- ✅ Request/Response logging
- ✅ Documentação Swagger
- ✅ Graceful shutdown
- ✅ Docker + Docker Compose
- ✅ Scripts de setup
- ✅ Testes (Jest + Supertest)
- ✅ Pre-commit hooks (Husky + lint-staged)
- ✅ ESLint configurado
- ✅ Hot reload com tsx

## Instalação Rápida

```bash
# Setup automático
./scripts/setup.sh

# Ou manual
npm install
cp .env.example .env
```

## Desenvolvimento

```bash
# Servidor de desenvolvimento
npm run dev
# ou
./scripts/dev.sh

# Com Docker
docker-compose up -d
```

## Build

```bash
npm run build
npm start
```

## Documentação

Acesse http://localhost:3000/docs para ver a documentação Swagger da API.

## Testes

```bash
npm test              # Executar testes
npm run test:watch    # Modo watch
npm run test:coverage # Com cobertura
```

## Estrutura

```
src/
├── index.ts              # Arquivo principal
├── entities/             # Entidades de domínio
├── controllers/          # Controllers por funcionalidade
├── services/             # Services por funcionalidade
├── repositories/         # Interfaces dos repositories
├── dtos/                 # Data Transfer Objects
├── schemas/              # Schemas de validação (Zod)
├── routes/               # Rotas da API
├── middleware/           # Middlewares (validation, logging, errors)
├── docs/                 # Documentação Swagger
├── container/            # Injeção de dependência
├── types/                # Tipos e classes de erro
└── infra/                # Camada de infraestrutura
    ├── config/           # Configurações de banco
    ├── database/         # Conexões e models
    │   ├── connections/  # Conexões específicas por banco
    │   └── models/       # Models e relations do ORM
    └── repositories/     # Implementações dos repositories
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)
- `REPOSITORY_TYPE`: Tipo de repositório (memory/sequelize)
- `API_URL`: URL da API para documentação Swagger

## Endpoints Principais

- `GET /health` - Health check básico
- `GET /health/health` - Health check completo
- `GET /health/ready` - Readiness probe
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário
- `POST /users` - Criar usuário
- `GET /docs` - Documentação Swagger

## Arquitetura

**Princípios aplicados:**
- Clean Architecture
- SOLID
- Dependency Injection
- Single Responsibility (um controller/service por funcionalidade)
- Result Pattern para tratamento de erros
- DTOs para desacoplamento da API