import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotService } from './bot-service.service';

@Controller('bot-service')
export class BotServiceController {
  constructor(private readonly botServiceService: BotService) {}

  @Post('check')
  async checkCompliance(@Body() body: { targetUrl: string; policyUrl: string }) {
    return this.botServiceService.analyzeCompliance(body.targetUrl, body.policyUrl);
  }
}
