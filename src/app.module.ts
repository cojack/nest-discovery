import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DiscoverModule} from "./discovery/discover.module";

@Module({
  imports: [DiscoverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
