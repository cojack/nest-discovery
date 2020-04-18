import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Register} from "./discovery/register.decorator";

@Controller()
@Register()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
