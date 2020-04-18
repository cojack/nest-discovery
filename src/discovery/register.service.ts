import {DiscoveryService, MetadataScanner} from "@nestjs/core";

export class RegisterService {
    constructor(private readonly discoveryService: DiscoveryService, private readonly metadataScanner: MetadataScanner) {
        debugger;
    }

    public async register(): Promise<void> {
        /*const providers = this.discoveryService.getProviders();
        const controllers = this.discoveryService.getControllers();*/
        debugger;
    }
}
