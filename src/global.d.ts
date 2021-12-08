declare interface IContext {
  log(...args: any[]): void;
  error(...args: any[]): void;
  clear(): void;
}

declare interface IProtocol {
  program: string;
  args?: string[];
}