import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Expose } from './discovery/expose.decorator';
import { ZookeeperOptions } from './discovery-zookeeper/zookeeper-config.interface';

@Controller()
@Expose<ZookeeperOptions>({
  path: 'qwe',
})
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
