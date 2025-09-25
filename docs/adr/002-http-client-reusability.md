# ADR-002: Cliente HTTP Reutilizável

## Status
Aceito

## Contexto
Múltiplos services precisam fazer requisições HTTP para APIs externas (ViaCEP, SendGrid, etc.). Sem um cliente HTTP centralizado, cada gateway implementaria sua própria lógica de requisição, resultando em duplicação de código.

## Decisão
Implementamos um `IHttpClient` genérico que é injetado em todos os gateways que precisam fazer requisições HTTP.

### Interface Genérica
```typescript
interface IHttpClient {
  request<T>(request: HttpRequest): Promise<HttpResponse<T>>;
  get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T>(url: string, body?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  // ... outros métodos
}
```

### Implementação com Fetch
```typescript
class FetchHttpClient implements IHttpClient {
  // Implementação usando fetch nativo
  // Timeout, error handling, JSON parsing
}
```

### Uso em Gateways
```typescript
class ViaCepGateway implements ICepGateway {
  constructor(private httpClient: IHttpClient) {}
  
  async findByCep(cep: string): Promise<CepData | null> {
    const response = await this.httpClient.get(`${this.baseUrl}/${cep}/json/`);
    // ...
  }
}
```

## Consequências

### Positivas
- **Reutilização Máxima**: Um cliente para todos os gateways
- **Testabilidade**: Mock único do `IHttpClient` testa todos os gateways
- **Flexibilidade**: Trocar de fetch para axios sem quebrar gateways
- **Configuração Centralizada**: Timeout, headers, interceptors em um lugar
- **Manutenibilidade**: Bugs de HTTP corrigidos em um lugar

### Negativas
- **Abstração Extra**: Camada adicional sobre fetch/axios
- **Overhead Mínimo**: Wrapper sobre bibliotecas nativas

## Alternativas Consideradas

### 1. Fetch Direto em Cada Gateway
```typescript
class ViaCepGateway {
  async findByCep(cep: string) {
    const response = await fetch(`${this.baseUrl}/${cep}/json/`);
    // ...
  }
}
```
**Rejeitado**: Duplicação de código, difícil de testar

### 2. Biblioteca HTTP Específica (Axios)
```typescript
import axios from 'axios';
```
**Rejeitado**: Dependência externa desnecessária, fetch nativo é suficiente

### 3. HTTP Client por Gateway
```typescript
class ViaCepHttpClient extends BaseHttpClient {}
class EmailHttpClient extends BaseHttpClient {}
```
**Rejeitado**: Complexidade desnecessária para casos simples

## Implementação

### Factory Pattern
```typescript
class ClientFactory {
  static createHttpClient(type: ClientType = 'fetch'): IHttpClient {
    switch (type) {
      case 'fetch':
        return new FetchHttpClient();
      default:
        throw new Error(`Client type ${type} not supported`);
    }
  }
}
```

### Container Registration
```typescript
const httpClient = ClientFactory.createHttpClient('fetch');
container.register<IHttpClient>('HttpClient', httpClient);

// Gateways recebem o mesmo client
const cepGateway = new ViaCepGateway(httpClient);
const emailGateway = new HttpEmailGateway(httpClient, apiUrl, apiKey);
```

### Configuração
- **Timeout**: 10s por padrão
- **Headers**: Content-Type: application/json automático
- **Error Handling**: Conversão de erros de rede para mensagens legíveis
- **Abort Controller**: Cancelamento de requisições

## Extensibilidade

### Interceptors (Futuro)
```typescript
interface IHttpClient {
  addRequestInterceptor(interceptor: RequestInterceptor): void;
  addResponseInterceptor(interceptor: ResponseInterceptor): void;
}
```

### Retry Logic (Futuro)
```typescript
interface HttpRequest {
  retries?: number;
  retryDelay?: number;
}
```

## Notas
Esta decisão estabelece a base para comunicação HTTP padronizada, facilitando debugging, logging e monitoramento de requisições externas.