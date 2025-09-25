# ADR-004: Integração com Awilix-Express

## Status
Aceito

## Contexto
Após migrar para Awilix, as rotas ainda precisavam resolver controllers manualmente, resultando em código repetitivo e verboso:

```typescript
// Problema: Código repetitivo em cada rota
usersRouter.get('/', (req, res, next) => {
  const scope = container.createScope();
  const controller = scope.cradle.listUsersController;
  controller.handle(req, res, next);
});

usersRouter.get('/:id', validateParams(schema), (req, res, next) => {
  const scope = container.createScope();
  const controller = scope.cradle.getUserController;
  controller.handle(req, res, next);
});
```

**Limitações:**
- **Boilerplate**: Muito código repetitivo para cada rota
- **Scope manual**: Criação manual de scopes para cada request
- **Manutenção**: Difícil manter consistência entre rotas
- **Validação**: Middlewares aplicados manualmente em cada rota

## Decisão
Integrar **awilix-express** para automatizar o roteamento e injeção de dependência usando decorators.

### Implementação com Decorators
```typescript
@route('/users')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

  @GET()
  async handle(req: Request, res: Response, next: NextFunction) {
    // Lógica do controller
  }
}

@route('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @POST()
  @before(validateBody(createUserSchema))
  async handle(req: Request, res: Response, next: NextFunction) {
    // Lógica do controller
  }
}
```

### Auto-loading de Controllers
```typescript
// routes/users.ts
export const usersRouter = Router();
usersRouter.use(loadControllers('../controllers/*.{ts,js}', { cwd: __dirname }));
```

## Consequências

### Positivas
- **Menos Código**: 90% redução no código de rotas
- **Auto-loading**: Controllers carregados automaticamente
- **DI Automática**: Injeção de dependência sem configuração manual
- **Decorators**: Rotas definidas próximas à lógica de negócio
- **Middleware**: `@before()` para validações declarativas
- **Scope Automático**: Awilix-express gerencia scopes automaticamente
- **Type Safety**: Tipagem automática em toda a cadeia
- **Manutenibilidade**: Mudanças isoladas nos controllers

### Negativas
- **Dependência Externa**: +3 packages (awilix-express, reflect-metadata)
- **Decorators**: Requer experimentalDecorators no TypeScript
- **Curva de Aprendizado**: Desenvolvedores precisam aprender decorators
- **Magic**: Menos explícito que rotas manuais

## Alternativas Consideradas

### 1. Manter Rotas Manuais
```typescript
// Resolver controllers manualmente
const controller = container.cradle.userController;
```
**Rejeitado**: Muito boilerplate, difícil manutenção

### 2. Factory de Rotas
```typescript
function createRoute(controllerName: string, method: string, path: string) {
  return (req, res, next) => {
    const controller = container.cradle[controllerName];
    controller.handle(req, res, next);
  };
}
```
**Rejeitado**: Ainda verboso, sem type safety

### 3. Routing-Controllers
```typescript
import { Controller, Get, Post } from 'routing-controllers';
```
**Rejeitado**: Mais pesado, menos integrado com Awilix

## Implementação

### Configuração TypeScript
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Dependências
```bash
npm install awilix-express reflect-metadata
```

### Estrutura de Controllers
```typescript
// Decorators disponíveis
@route('/path')           // Define rota base
@GET(), @POST(), @PUT()   // Métodos HTTP
@before(middleware)       // Middleware antes da execução
```

### Auto-loading
```typescript
// Carrega todos os controllers automaticamente
loadControllers('../controllers/*.{ts,js}', { cwd: __dirname })
```

## Padrões de Uso

### Controller Básico
```typescript
@route('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @GET()
  async list(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json({ data: users });
  }
}
```

### Controller com Validação
```typescript
@route('/users')
export class CreateUserController {
  @POST()
  @before(validateBody(createUserSchema))
  async create(req: Request, res: Response) {
    // req.body já validado
  }
}
```

### Controller com Parâmetros
```typescript
@route('/users')
export class GetUserController {
  @GET('/:id')
  @before(validateParams(getUserParamsSchema))
  async getById(req: Request, res: Response) {
    // req.params já validado
  }
}
```

## Migração Realizada

### Antes (Manual)
- 100+ linhas de código de rotas
- Resolução manual de controllers
- Aplicação manual de middlewares
- Criação manual de scopes

### Depois (Awilix-Express)
- ~10 linhas de código de rotas
- Controllers auto-carregados
- Middlewares declarativos
- Scopes automáticos

### Breaking Changes
- Controllers agora usam decorators
- Rotas definidas nos controllers, não em arquivos separados
- Middlewares aplicados via `@before()`

## Notas
Esta integração representa a evolução natural após adotar Awilix, eliminando o último ponto de boilerplate manual e estabelecendo um padrão moderno de desenvolvimento com decorators.