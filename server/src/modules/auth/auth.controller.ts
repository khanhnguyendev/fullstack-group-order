import { ResponseUtil } from '@common/utils/response.util';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpWithGuestDto } from './dto/guest/guest.sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest/sign-up')
  @HttpCode(200)
  async signUpWithGuest(@Body() dto: SignUpWithGuestDto): Promise<any> {
    const response = await this.authService.signUpWithGuest(dto);
    return ResponseUtil.success(response);
  }
}
