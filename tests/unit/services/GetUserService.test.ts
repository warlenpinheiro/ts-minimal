import { GetUserService } from '../../../src/services/GetUserService';
import { MockUserRepository } from '../../mocks/MockUserRepository';
import { Container } from '../../../src/container/Container';
import { User } from '../../../src/entities/User';

describe('GetUserService', () => {
  let service: GetUserService;
  let mockRepository: MockUserRepository;
  let container: Container;

  beforeEach(() => {
    container = Container.getInstance();
    mockRepository = new MockUserRepository();
    container.register('GetUserRepository', mockRepository);
    service = new GetUserService();
  });

  afterEach(() => {
    mockRepository.clear();
  });

  it('should return user when found', async () => {
    const user = new User('1', 'John Doe', 'john@example.com');
    mockRepository.addUser(user);

    const result = await service.execute('1');

    expect(result.isSuccess).toBe(true);
    expect(result.value.id).toBe('1');
    expect(result.value.name).toBe('John Doe');
  });

  it('should return error when user not found', async () => {
    const result = await service.execute('999');

    expect(result.isFailure).toBe(true);
    expect(result.error.message).toContain('User with id 999 not found');
  });
});