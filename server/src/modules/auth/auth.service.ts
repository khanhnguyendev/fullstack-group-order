import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { SignUpWithGuestDto } from '../user/dto/guest/guest.sign-up.dto';
import { RefreshToken } from '@schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,

    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign up with guest
   * Step 1: Create a new guest user
   * Step 2: Generate a token
   * Step 3: Return the user and token
   *
   * @param dto - The sign up with guest DTO
   * @returns The user and token
   */
  async signUpWithGuest(dto: SignUpWithGuestDto): Promise<any> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Step 1: Create a new guest user
      const newUser = await this.userService.createGuestUser(dto.name, session);

      // Step 2: Generate a token
      const token = await this.generateUserToken(newUser._id, newUser.username);

      await session.commitTransaction();

      // Step 3: Return the user and token
      return {
        user: newUser,
        token,
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

  /**
   * Generate access token and refresh token
   * Step 1: Generate an access token
   * Step 2: Generate a refresh token
   * Step 3: Store the refresh token
   * Step 4: Return the access token and refresh token
   *
   * @param user_id
   * @param username
   * @returns The access token and refresh token
   */
  async generateUserToken(
    user_id: string,
    username: string,
  ): Promise<Record<string, string>> {
    // Step 1: Generate an access token
    const access_token = await this.jwtService.signAsync({
      sub: user_id,
      username: username,
    });
    // Step 2: Generate a refresh token
    const refresh_token = uuidv4();
    // Step 3: Store the refresh token
    await this.storeRefreshToken(user_id, refresh_token);
    // Step 4: Return the access token and refresh token
    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Store refresh token
   * Step 1: Set the expiration date
   * Step 2: Store the refresh token
   *
   * @param user_id
   * @param token
   */
  async storeRefreshToken(user_id: string, token: string): Promise<void> {
    // Step 1: Set the expiration date
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // 30 days

    // Step 2: Store the refresh token
    const refreshToken = new this.refreshTokenModel({
      user_id,
      token,
      expires,
    });
    await refreshToken.save();
  }
}
