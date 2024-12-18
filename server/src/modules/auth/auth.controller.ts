import { Body, Controller, Post } from '@nestjs/common';
import { ResponseUtil } from '@common/utils/response.util';
import { AuthService } from './auth.service';
import { SignUpWithGuestDto } from '../user/dto/guest/guest.sign-up.dto';
import { Public } from '@common/decorators/public.decorator';
import { API_ROUTES } from '@common/constants/api-route';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(API_ROUTES.AUTH.GUEST.SIGN_UP)
  async signUpWithGuest(@Body() dto: SignUpWithGuestDto): Promise<any> {
    const response = await this.authService.signUpWithGuest(dto);
    return ResponseUtil.success(response);
  }
}
