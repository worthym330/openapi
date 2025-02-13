import { Module } from '@nestjs/common';
import { BotService } from './bot-service.service';
import { BotServiceController } from './bot-service.controller';

@Module({
  controllers: [BotServiceController],
  providers: [BotService],
})
export class BotServiceModule {}
