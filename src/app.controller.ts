import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("api")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
