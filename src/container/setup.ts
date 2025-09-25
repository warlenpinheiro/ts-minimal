import { container, asClass, asFunction, asValue } from './Container';
import { RepositoryFactory, RepositoryType } from '../infra/repositories/RepositoryFactory';
import { GatewayFactory, GatewayType } from '../infra/gateways/GatewayFactory';
import { ClientFactory } from '../infra/clients/ClientFactory';
import { ViaCepGateway } from '../infra/gateways/ViaCepGateway';
import { ListUsersService } from '../services/ListUsersService';
import { GetUserService } from '../services/GetUserService';
import { CreateUserService } from '../services/CreateUserService';
import { GetUserWithAddressService } from '../services/GetUserWithAddressService';
import { SendWelcomeEmailService } from '../services/SendWelcomeEmailService';
import { HealthCheckService } from '../services/HealthCheckService';
import { ListUsersController } from '../controllers/ListUsersController';
import { GetUserController } from '../controllers/GetUserController';
import { CreateUserController } from '../controllers/CreateUserController';
import { GetUserWithAddressController } from '../controllers/GetUserWithAddressController';
import { HealthCheckController } from '../controllers/HealthCheckController';
import { ReadinessController } from '../controllers/ReadinessController';

export function setupContainer(): void {
  const repositoryType: RepositoryType = (process.env.REPOSITORY_TYPE as RepositoryType) || 'memory';
  const gatewayType: GatewayType = (process.env.EMAIL_GATEWAY_TYPE as GatewayType) || 'console';
  
  container.register({
    // Repositories (Infra) - Interfaces específicas
    getUserRepository: asValue(RepositoryFactory.createGetUserRepository(repositoryType)),
    listUsersRepository: asValue(RepositoryFactory.createListUsersRepository(repositoryType)),
    createUserRepository: asValue(RepositoryFactory.createCreateUserRepository(repositoryType)),
    getAddressRepository: asValue(RepositoryFactory.createGetAddressRepository(repositoryType)),
    
    // Clients (Infra) - Clientes HTTP reutilizáveis
    httpClient: asFunction(() => ClientFactory.createHttpClient('fetch')).singleton(),
    
    // Gateways (Infra) - Serviços externos
    emailGateway: asValue(GatewayFactory.createEmailGateway(gatewayType)),
    cepGateway: asFunction(({ httpClient }) => new ViaCepGateway(httpClient)).singleton(),
    
    // Services - Singletons
    listUsersService: asClass(ListUsersService).singleton(),
    getUserService: asClass(GetUserService).singleton(),
    createUserService: asClass(CreateUserService).singleton(),
    getUserWithAddressService: asClass(GetUserWithAddressService).singleton(),
    sendWelcomeEmailService: asClass(SendWelcomeEmailService).singleton(),
    healthCheckService: asClass(HealthCheckService).singleton(),
    
    // Controllers - Nova instância por request
    listUsersController: asClass(ListUsersController).scoped(),
    getUserController: asClass(GetUserController).scoped(),
    createUserController: asClass(CreateUserController).scoped(),
    getUserWithAddressController: asClass(GetUserWithAddressController).scoped(),
    healthCheckController: asClass(HealthCheckController).scoped(),
    readinessController: asClass(ReadinessController).scoped(),
  });
}