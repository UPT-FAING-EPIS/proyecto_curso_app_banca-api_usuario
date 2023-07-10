import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check if the server is running' })
  @ApiResponse({ status: 200, description: 'The server is running', type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}