import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';
import { AdapterOptions } from '../discovery/discovery-adapter.interface';

export interface ZookeeperConfiguration {
  connect?: string;
  timeout?: number;
  host_order_deterministic?: boolean;
  data_as_buffer?: boolean;
  debug_level?: number;
}

export type ZookeeperConfig = string | ZookeeperConfiguration;
export type AdapterIface = string;
export interface IfaceConfig {
  name: string,
  family: 'IPv4' | 'IPv6'
}

export interface ZookeeperModuleOptions {
  config: ZookeeperConfig,
  iface: IfaceConfig
}

export interface ZookeeperOptionsFactory {
  createZookeeperOptions(): Promise<ZookeeperConfig | AdapterIface> | ZookeeperConfig | AdapterIface;
}

export interface ZookeeperModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  provide: symbol,
  useExisting?: Type<ZookeeperOptionsFactory>;
  useClass?: Type<ZookeeperOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ZookeeperConfig | AdapterIface> | ZookeeperConfig | AdapterIface;
  useValue?: any;
  inject?: any[];
}

export interface ZookeeperOptions extends AdapterOptions<any> {
  path: string
}
