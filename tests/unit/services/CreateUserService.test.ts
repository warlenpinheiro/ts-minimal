import { CreateUserService } from '../../../src/services/CreateUserService';
import { MockUserRepository } from '../../mocks/MockUserRepository';
import { Container } from '../../../src/container/Container';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let mockRepository: MockUserRepository;
  let container: Container;

  beforeEach(() => {
    container = Container.getInstance();
    mockRepository = new MockUserRepository();
    container.register('CreateUserRepository', mockRepository);
    service = new CreateUserService();
  });

  afterEach(() => {
    mockRepository.clear();
  });

  it('should create user successfully', async () => {
    const requestDTO = { name: 'John Doe', email: 'john@example.com' };
    
    const result = await service.execute(requestDTO);

    expect(result.isSuccess).toBe(true);
    expect(result.value.name).toBe('John Doe');
    expect(result.value.email).toBe('john@example.com');
    expect(result.value.id).toBeDefined();
  });

  it('should return validation error for invalid data', async () => {
    const requestDTO = { name: '', email: 'john@example.com' };
    
    const result = await service.execute(requestDTO);

    expect(result.isFailure).toBe(true);
    expect(result.error.message).toContain('Nome é obrigatório');
  });

  it('should return validation error for invalid email', async () => {
    const requestDTO = { name: 'John Doe', email: 'invalid-email' };
    
    const result = await service.execute(requestDTO);

    expect(result.isFailure).toBe(true);
    expect(result.error.message).toContain('Email inválido');
  });
});