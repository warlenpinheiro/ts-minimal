import { User } from '../../entities/User';

export class InMemoryDatabase {
  private static instance: InMemoryDatabase;
  private users: User[] = [
    new User('1', 'João', 'joao@example.com'),
    new User('2', 'Maria', 'maria@example.com')
  ];

  static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  getUsers(): User[] {
    return [...this.users];
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  saveUser(user: User): void {
    this.users.push(user);
  }
}