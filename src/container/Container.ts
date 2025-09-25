type Constructor<T = {}> = new (...args: any[]) => T;

export class Container {
  private static instance: Container;
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register<T>(token: string, implementation: Constructor<T> | T): void {
    this.services.set(token, implementation);
  }

  registerSingleton<T>(token: string, implementation: Constructor<T> | T): void {
    this.services.set(token, implementation);
    this.singletons.set(token, null);
  }

  resolve<T>(token: string): T {
    if (this.singletons.has(token)) {
      let instance = this.singletons.get(token);
      if (!instance) {
        const implementation = this.services.get(token);
        instance = typeof implementation === 'function' ? new implementation() : implementation;
        this.singletons.set(token, instance);
      }
      return instance;
    }

    const implementation = this.services.get(token);
    if (!implementation) {
      throw new Error(`Service ${token} not found`);
    }
    
    return typeof implementation === 'function' ? new implementation() : implementation;
  }
}

export const container = Container.getInstance();