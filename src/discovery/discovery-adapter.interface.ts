export interface DiscoveryAdapter {
  register(name: string, options?: AdapterOptions<any>): Promise<void>
  deregister(name: string, options?: AdapterOptions<any>): Promise<void>
  query(name: string): any
}

export type AdapterOptions<T> = {
  [P in keyof T]: T[P];
}
