import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { User, UserSchema } from '@schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '@schemas/refresh-token.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: RefreshTokenSchema, name: RefreshToken.name },
    ]),
  ],
})
export class AuthModule {}
