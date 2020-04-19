import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DiscoverModule} from "./discovery/discover.module";
import { HealthController } from './health.controller';

@Module({
  imports: [DiscoverModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
