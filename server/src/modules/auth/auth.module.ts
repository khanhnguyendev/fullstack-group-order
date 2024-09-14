import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '@schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@modules/user/user.module';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '@schemas/refresh-token.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: RefreshTokenSchema, name: RefreshToken.name },
    ]),
    UserModule,
  ],
})
export class AuthModule {}
