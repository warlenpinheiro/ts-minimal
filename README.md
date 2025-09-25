# Boilerplate TypeScript Minimal

Boilerplate minimal para APIs em TypeScript com boas práticas.

## Características

### Core
- ✅ TypeScript configurado
- ✅ Express.js
- ✅ Arquitetura em camadas (Entity/Controller/Service/Repository/Infra)
- ✅ **Injeção de dependência** (Awilix + Awilix-Express)
- ✅ **Decorators** para rotas e middlewares
- ✅ Separação de domínio e infraestrutura

### Padrões Arquiteturais
- ✅ **Repository Pattern** com interfaces específicas
- ✅ **Gateway Pattern** para serviços externos
- ✅ **Composition Pattern** para relacionamentos
- ✅ **Result Pattern** para tratamento de erros
- ✅ **Factory Pattern** para criação de instâncias

### Segurança & Qualidade
- ✅ Middleware de segurança (Helmet, CORS)
- ✅ Rate limiting
- ✅ Validação com Zod
- ✅ Tratamento de erros específicos
- ✅ ESLint configurado
- ✅ Pre-commit hooks (Husky + lint-staged)

### APIs & Integrações
- ✅ DTOs para API
- ✅ **Cliente HTTP reutilizável** (fetch nativo)
- ✅ **Gateway de Email** (Console/SendGrid)
- ✅ **Gateway de CEP** (ViaCEP)
- ✅ Documentação Swagger

### Observabilidade
- ✅ Health checks avançados
- ✅ Request/Response logging
- ✅ Graceful shutdown

### DevOps & Testes
- ✅ Docker + Docker Compose
- ✅ Scripts de setup
- ✅ Testes (Jest + Supertest)
- ✅ Hot reload com tsx
- ✅ **ADRs** (Architecture Decision Records) - [Ver docs/adr/](./docs/adr/)

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
├── repositories/         # Interfaces dos repositories (persistência)
├── gateways/             # Interfaces para serviços externos
├── clients/              # Interfaces para clientes genéricos (HTTP, etc)
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
    ├── repositories/     # Implementações dos repositories
    ├── gateways/         # Implementações de serviços externos
    └── clients/          # Implementações de clientes genéricos
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)
- `REPOSITORY_TYPE`: Tipo de repositório (memory/sequelize)
- `DATABASE_URL`: URL do banco de dados
- `API_URL`: URL da API para documentação Swagger
- `EMAIL_GATEWAY_TYPE`: Tipo de gateway de email (console/sendgrid)
- `SENDGRID_API_KEY`: Chave da API do SendGrid (produção)

## Endpoints Principais

### Health Check
- `GET /health` - Health check básico
- `GET /health/health` - Health check completo
- `GET /health/ready` - Readiness probe

### Usuários
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário
- `GET /users/:id/with-address` - Buscar usuário com endereço
- `POST /users` - Criar usuário (envia email de boas-vindas)

### Documentação
- `GET /docs` - Documentação Swagger

## Exemplos de Uso

### Criar Usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com"
  }'
```

### Buscar Usuário com Endereço
```bash
curl http://localhost:3000/users/1/with-address
```

### Health Check Completo
```bash
curl http://localhost:3000/health/health
```

### Consultar CEP (via service)
```typescript
// Exemplo de uso do ViaCepGateway
const cepService = container.cradle.createAddressFromCepService;
const result = await cepService.execute('user-id', '01310-100');
```

## Padrões Implementados

### Dependency Injection (Awilix + Awilix-Express)
- **Auto-injection**: Constructor parameters injetados automaticamente
- **Decorators**: Rotas definidas com `@GET()`, `@POST()`, etc.
- **Auto-loading**: Controllers carregados automaticamente
- **Lifetimes**: Singleton, Scoped, Transient
```typescript
// Controller com decorators
@route('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @GET()
  @before(validateBody(schema))
  async create(req: Request, res: Response) {}
}

// Auto-loading
usersRouter.use(loadControllers('../controllers/*.{ts,js}'));
```

### Repository Pattern
- **Persistência**: Interfaces específicas por operação
- **Composition**: Services compõem múltiplos repositories
- **Exemplo**: `GetUserWithAddressService` usa `IGetUserRepository` + `IGetAddressRepository`

### Gateway Pattern
- **Serviços externos**: Email, APIs, Pagamentos
- **Reutilização**: `IHttpClient` compartilhado entre gateways
- **Exemplo**: `ViaCepGateway` e `HttpEmailGateway` usam o mesmo `FetchHttpClient`

### Result Pattern
```typescript
// Tratamento de erros sem exceptions
const result = await userService.execute(data);
if (result.isFailure) {
  throw result.error;
}
return result.value;
```

## Arquitetura

**Princípios aplicados:**
- Clean Architecture
- SOLID (especialmente Interface Segregation)
- **Dependency Injection** (Awilix com auto-injection)
- Single Responsibility (um controller/service por funcionalidade)
- Composition over Inheritance
- Result Pattern para tratamento de erros
- DTOs para desacoplamento da API

### Injeção de Dependência + Decorators
```typescript
// Controllers com decorators
@route('/users')
export class CreateUserController {
  constructor(
    private createUserService: CreateUserService
  ) {}

  @POST()
  @before(validateBody(createUserSchema))
  async handle(req: Request, res: Response, next: NextFunction) {
    const result = await this.createUserService.execute(req.body);
    res.status(201).json({ data: result.value });
  }
}

// Auto-loading de controllers
usersRouter.use(loadControllers('../controllers/*.{ts,js}'));
```

## Documentação Arquitetural

Decisões arquiteturais estão documentadas em [ADRs (Architecture Decision Records)](./docs/adr/):
- Separação Repositories vs Gateways
- Cliente HTTP Reutilizável
- Migração para Awilix
- Integração com Awilix-Express