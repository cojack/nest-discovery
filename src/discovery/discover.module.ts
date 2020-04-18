import {Module, OnModuleInit} from "@nestjs/common";
import {DiscoveryModule} from "@nestjs/core";
import {RegisterService} from "./register.service";

@Module({
    imports: [DiscoveryModule],
    providers: [RegisterService]
})
export class DiscoverModule implements OnModuleInit {

    constructor(private readonly registerService: RegisterService) {
    }

    public async onModuleInit(): Promise<any> {
        await this.registerService.register();
    }

}
