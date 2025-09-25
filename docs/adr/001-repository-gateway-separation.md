# ADR-001: Separação entre Repositories e Gateways

## Status
Aceito

## Contexto
Inicialmente, o boilerplate utilizava um único `IUserRepository` genérico que violava o Interface Segregation Principle, forçando services a depender de métodos que não utilizavam. Além disso, não havia distinção clara entre persistência de dados e comunicação com serviços externos.

## Decisão
Implementamos a separação entre **Repositories** (persistência) e **Gateways** (serviços externos), com interfaces específicas por operação.

### Repositories (Persistência)
- `IGetUserRepository` - Buscar usuários
- `IListUsersRepository` - Listar usuários  
- `ICreateUserRepository` - Criar usuários
- `IGetAddressRepository` - Buscar endereços

### Gateways (Serviços Externos)
- `IEmailGateway` - Envio de emails
- `ICepGateway` - Consulta de CEP
- `IHttpClient` - Cliente HTTP genérico

### Composition Pattern
Services compõem múltiplos repositories/gateways conforme necessário:
```typescript
class GetUserWithAddressService {
  constructor(
    private userRepository: IGetUserRepository,
    private addressRepository: IGetAddressRepository
  ) {}
}
```

## Consequências

### Positivas
- **Interface Segregation**: Services dependem apenas do que precisam
- **Testabilidade**: Mocks menores e focados
- **Reutilização**: `IHttpClient` compartilhado entre gateways
- **Clareza**: Distinção óbvia entre persistência e serviços externos
- **Evolução**: Mudanças isoladas não afetam outros components

### Negativas
- **Complexidade**: Mais arquivos para gerenciar
- **Curva de aprendizado**: Desenvolvedores precisam entender a separação

## Alternativas Consideradas

### 1. Repository Único
```typescript
interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
}
```
**Rejeitado**: Viola Interface Segregation Principle

### 2. Gateway dentro de Services
```typescript
// services/gateways/EmailGateway.ts
```
**Rejeitado**: Mistura responsabilidades de domínio e infraestrutura

### 3. Repository Aggregator
```typescript
interface IUserAggregateRepository {
  findUserWithRelations(id: string): Promise<UserAggregate>;
}
```
**Considerado para casos complexos**: Pode ser implementado quando necessário

## Implementação

### Estrutura de Diretórios
```
src/
├── repositories/         # Interfaces de persistência
├── gateways/            # Interfaces de serviços externos  
├── clients/             # Interfaces de clientes genéricos
└── infra/
    ├── repositories/    # Implementações de persistência
    ├── gateways/       # Implementações de serviços externos
    └── clients/        # Implementações de clientes genéricos
```

### Container Setup
```typescript
// Repositories específicos
container.register<IGetUserRepository>('GetUserRepository', getUserRepo);
container.register<IListUsersRepository>('ListUsersRepository', listUsersRepo);

// Gateways com client compartilhado
const httpClient = ClientFactory.createHttpClient('fetch');
const cepGateway = new ViaCepGateway(httpClient);
container.register<ICepGateway>('CepGateway', cepGateway);
```

## Notas
Esta decisão estabelece a base para escalabilidade do boilerplate, permitindo adicionar novos repositories e gateways sem afetar código existente.