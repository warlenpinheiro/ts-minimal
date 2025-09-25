import { container } from './Container';
import { IGetUserRepository } from '../repositories/IGetUserRepository';
import { IListUsersRepository } from '../repositories/IListUsersRepository';
import { ICreateUserRepository } from '../repositories/ICreateUserRepository';
import { IGetAddressRepository } from '../repositories/IGetAddressRepository';
import { IEmailGateway } from '../gateways/IEmailGateway';
import { ICepGateway } from '../gateways/ICepGateway';
import { IHttpClient } from '../clients/IHttpClient';
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
  
  // Repositories (Infra) - Interfaces específicas
  const getUserRepository = RepositoryFactory.createGetUserRepository(repositoryType);
  const listUsersRepository = RepositoryFactory.createListUsersRepository(repositoryType);
  const createUserRepository = RepositoryFactory.createCreateUserRepository(repositoryType);
  const getAddressRepository = RepositoryFactory.createGetAddressRepository(repositoryType);
  
  container.register<IGetUserRepository>('GetUserRepository', getUserRepository);
  container.register<IListUsersRepository>('ListUsersRepository', listUsersRepository);
  container.register<ICreateUserRepository>('CreateUserRepository', createUserRepository);
  container.register<IGetAddressRepository>('GetAddressRepository', getAddressRepository);
  
  // Clients (Infra) - Clientes HTTP reutilizáveis
  const httpClient = ClientFactory.createHttpClient('fetch');
  container.register<IHttpClient>('HttpClient', httpClient);
  
  // Gateways (Infra) - Serviços externos
  const emailGateway = GatewayFactory.createEmailGateway(gatewayType);
  const cepGateway = new ViaCepGateway(httpClient);
  
  container.register<IEmailGateway>('EmailGateway', emailGateway);
  container.register<ICepGateway>('CepGateway', cepGateway);
  
  // Services
  container.registerSingleton<ListUsersService>('ListUsersService', ListUsersService);
  container.registerSingleton<GetUserService>('GetUserService', GetUserService);
  container.registerSingleton<CreateUserService>('CreateUserService', CreateUserService);
  container.registerSingleton<GetUserWithAddressService>('GetUserWithAddressService', GetUserWithAddressService);
  container.registerSingleton<SendWelcomeEmailService>('SendWelcomeEmailService', SendWelcomeEmailService);
  container.registerSingleton<HealthCheckService>('HealthCheckService', HealthCheckService);
  
  // Controllers
  container.register<ListUsersController>('ListUsersController', ListUsersController);
  container.register<GetUserController>('GetUserController', GetUserController);
  container.register<CreateUserController>('CreateUserController', CreateUserController);
  container.register<GetUserWithAddressController>('GetUserWithAddressController', GetUserWithAddressController);
  container.register<HealthCheckController>('HealthCheckController', HealthCheckController);
  container.register<ReadinessController>('ReadinessController', ReadinessController);
}