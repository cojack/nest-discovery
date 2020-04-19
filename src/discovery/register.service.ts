import { iterate } from 'iterare';
import { Inject, Injectable } from '@nestjs/common';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { ADAPTER_PROVIDER, DISCOVERY_EXPOSE, DISCOVERY_EXPOSE_OPTIONS } from './discovery.constants';
import { DiscoveredClassWithMeta } from '@golevelup/nestjs-discovery/lib/discovery.interfaces';
import { DiscoveryAdapter } from './discovery-adapter.interface';

@Injectable()
export class RegisterService {
    private controllers: DiscoveredClassWithMeta<string>[];
    constructor(
      private readonly discoveryService: DiscoveryService,
      @Inject(ADAPTER_PROVIDER) private readonly adapterProvider: DiscoveryAdapter
    ) {

    }

    public async register(): Promise<void> {
        this.controllers = await this.discoveryService.controllersWithMetaAtKey(DISCOVERY_EXPOSE);
        iterate(this.controllers)
          .forEach(({discoveredClass}) => {
              const options = Reflect.getMetadata(DISCOVERY_EXPOSE_OPTIONS, discoveredClass.instance) ?? {};
              this.adapterProvider.register(discoveredClass.name, options);
          })
    }

    public async deregister(): Promise<void> {
        iterate(this.controllers)
          .forEach(({discoveredClass}) => {
              const options = Reflect.getMetadata(DISCOVERY_EXPOSE_OPTIONS, discoveredClass.instance) ?? {};
              this.adapterProvider.deregister(discoveredClass.name, options);
          })
    }
}
