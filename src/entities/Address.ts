export class Address {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly street: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly createdAt: Date = new Date()
  ) {}

  static create(userId: string, street: string, city: string, zipCode: string): Address {
    if (!street.trim()) throw new Error('Street é obrigatório');
    if (!city.trim()) throw new Error('City é obrigatório');
    if (!zipCode.trim()) throw new Error('ZipCode é obrigatório');

    return new Address(
      Math.random().toString(36).substring(7),
      userId,
      street.trim(),
      city.trim(),
      zipCode.trim()
    );
  }
}