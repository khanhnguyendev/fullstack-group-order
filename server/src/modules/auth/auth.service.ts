import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { SignUpWithGuestDto } from '../user/dto/guest/guest.sign-up.dto';
import { User } from '../user/schema/user.schema';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    @InjectModel(User.name) private UserModel: Model<User>,

    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign up with guest
   *
   * Step 1: Create a new guest user
   * Step 2: Generate a token
   * Step 3: Return the user and token
   *
   * @param dto
   */
  async signUpWithGuest(dto: SignUpWithGuestDto): Promise<any> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Step 1: Create a new guest user
      const newUser = await this.userService.createGuestUser(dto.name, session);

      // Step 2: Generate a token
      const access_token = await this.jwtService.signAsync({
        sub: newUser._id,
        username: newUser.name,
      });

      await session.commitTransaction();
      session.endSession();

      // Step 3: Return the user and token
      return {
        user: newUser,
        access_token,
      };
    } catch (error) {
      this.logger.error('Failed to sign up with guest', error.stack);

      // Rollback the transaction
      this.logger.error('Rolling back transaction...');
      await session.abortTransaction();

      throw new Error(`Error signing up with guest: ${error.message}`);
    } finally {
      // End the session
      session.endSession();
    }
  }
}
