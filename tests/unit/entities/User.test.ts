import { User } from '../../../src/entities/User';

describe('User Entity', () => {
  describe('create', () => {
    it('should create user with valid data', () => {
      const user = User.create('John Doe', 'john@example.com');

      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should throw error for empty name', () => {
      expect(() => User.create('', 'john@example.com')).toThrow('Nome é obrigatório');
    });

    it('should throw error for invalid email', () => {
      expect(() => User.create('John Doe', 'invalid-email')).toThrow('Email inválido');
    });

    it('should normalize email to lowercase', () => {
      const user = User.create('John Doe', 'JOHN@EXAMPLE.COM');
      expect(user.email).toBe('john@example.com');
    });

    it('should trim name', () => {
      const user = User.create('  John Doe  ', 'john@example.com');
      expect(user.name).toBe('John Doe');
    });
  });
});