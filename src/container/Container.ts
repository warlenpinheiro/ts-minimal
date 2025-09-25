import { createContainer, AwilixContainer, asClass, asFunction, asValue } from 'awilix';

// Criando container Awilix
export const container: AwilixContainer = createContainer();

// Re-exportando tipos úteis do Awilix
export { asClass, asFunction, asValue } from 'awilix';