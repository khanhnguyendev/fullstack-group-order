import { Controller } from '@nestjs/common';
import { ShopeeFoodService } from './shopeefood.service';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(private readonly shopeeFoodService: ShopeeFoodService) {}
}
