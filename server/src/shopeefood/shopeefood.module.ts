import { Module } from '@nestjs/common';
import { ShopeefoodController } from './shopeefood.controller';
import { ShopeeFoodService } from './shopeefood.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ShopeefoodController],
  providers: [ShopeeFoodService],
  exports: [ShopeeFoodService],
})
export class ShopeefoodModule {}
