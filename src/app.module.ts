import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotServiceModule } from './bot-service/bot-service.module';

@Module({
  imports: [BotServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
