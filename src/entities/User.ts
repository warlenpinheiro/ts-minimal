export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date = new Date()
  ) {}

  static create(name: string, email: string): User {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório');
    }
    
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }

    return new User(
      Date.now().toString(),
      name.trim(),
      email.toLowerCase().trim()
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}