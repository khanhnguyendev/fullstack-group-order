import { Body, Controller, Post } from '@nestjs/common';
import { ResponseUtil } from '@common/utils/response.util';
import { AuthService } from './auth.service';
import { SignUpWithGuestDto } from '../user/dto/guest/guest.sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest/sign-up')
  async signUpWithGuest(@Body() dto: SignUpWithGuestDto): Promise<any> {
    const response = await this.authService.signUpWithGuest(dto);
    return ResponseUtil.success(response);
  }
}
