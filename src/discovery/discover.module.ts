import {
    Abstract,
    DynamicModule,
    HttpModule,
    Module,
    OnModuleDestroy,
    OnModuleInit,
    Provider,
    Type,
} from '@nestjs/common';
import {RegisterService} from "./register.service";
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { ADAPTER_PROVIDER } from './discovery.constants';
import { DiscoveryAdapter } from './discovery-adapter.interface';

@Module({
    imports: [HttpModule],
    providers: [RegisterService],
    exports: [RegisterService]
})
export class DiscoverModule implements OnModuleInit, OnModuleDestroy {

    constructor(private readonly registerService: RegisterService) {
    }

    public static forRoot(providers: Provider<DiscoveryAdapter>[] = []): DynamicModule {
        return {
            module: DiscoverModule,
            imports: [DiscoveryModule],
            providers: [...providers]
        };
    }

    public static forRootAsync(options: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useFactory: (...args: any) => DiscoveryAdapter;
    }): DynamicModule {
        const provider: Provider = {
            provide: ADAPTER_PROVIDER,
            useFactory: options.useFactory,
            inject: options?.inject ?? []
        };

        return {
            module: DiscoverModule,
            imports: [DiscoveryModule],
            providers: [provider]
        };
    }

    public async onModuleInit(): Promise<void> {
        await this.registerService.register();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.registerService.deregister();
    }
}
