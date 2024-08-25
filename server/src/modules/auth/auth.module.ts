import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { KeyTokenService } from './key-token/key-token.service';
import { JwtModule } from '@nestjs/jwt';
import { KeyTokenModule } from './key-token/key-token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, JwtModule, KeyTokenModule],
})
export class AuthModule {}
