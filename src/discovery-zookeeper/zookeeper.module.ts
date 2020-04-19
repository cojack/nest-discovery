import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { ADAPTER_IFACE, ZOOKEEPER_CONFIG } from './zookeeper.constants';
import {
  ZookeeperModuleAsyncOptions,
  ZookeeperModuleOptions,
  ZookeeperOptionsFactory,
} from './zookeeper-config.interface';
import { zookeeperProvider } from './zookeeper.provider';
import { ZookeeperAdapter } from './zookeeper.adapter';
import iterate from 'iterare';

@Module({
  providers: [zookeeperProvider, ZookeeperAdapter],
  exports: [ZookeeperAdapter]
})
export class ZookeeperModule {
  public static forRoot(options: ZookeeperModuleOptions): DynamicModule {

    return {
      module: ZookeeperModule,
      providers: [{
        provide: ZOOKEEPER_CONFIG,
        useValue: options.config,
      }, {
        provide: ADAPTER_IFACE,
        useValue: options.iface
      }],
    };
  }

  public static forRootAsync(options: ZookeeperModuleAsyncOptions[]): DynamicModule {
    return {
      module: ZookeeperModule,
      imports: iterate(options).map(option => option.imports).flatten().toArray(),
      providers: iterate(options).map(option => this.createAsyncProviders(option)).flatten().toArray(),
    };
  }

  private static createAsyncProviders(
    options: ZookeeperModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const providers: Provider[] = [];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    if (options.useValue) {
      providers.push({
        provide: options.provide,
        useValue: options.useValue
      })
    }

    const provider = this.createAsyncOptionsProvider(options);
    if (provider) {
      providers.push(provider);
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: ZookeeperModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: options.provide,
        useFactory: async (...args: any[]) => await options.useFactory(...args),
        inject: options.inject || [],
      };
    }
    if (options.useExisting || options.useClass) {
      return {
        provide: options.provide,
        useFactory: async (optionsFactory: ZookeeperOptionsFactory) => await optionsFactory.createZookeeperOptions(),
        inject: [options.useExisting || options.useClass],
      };
    }
    return null;
  }
}
