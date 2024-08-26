import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { SignUpWithGuestDto } from './dto/guest/guest.sign-up.dto';
import { UserService } from '@modules/user/user.service';
import { KeyTokenService } from './key-token/key-token.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    private readonly userService: UserService,
    private readonly keyTokenService: KeyTokenService,
    private readonly jwtService: JwtService,
  ) {}

  async signUpWithGuest(dto: SignUpWithGuestDto): Promise<any> {
    let session = null;
    try {
      // Start a transaction
      session = await this.connection.startSession();
      session.startTransaction();

      // Create guest user
      const user = await this.userService.createGuestUser(dto.name, session);

      // Generate RSA key pair
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
      });

      // Convert keys to string
      const publicKeyString = publicKey
        .export({ type: 'pkcs1', format: 'pem' })
        .toString();
      const privateKeyString = privateKey
        .export({ type: 'pkcs1', format: 'pem' })
        .toString();

      // Create key token
      const keyToken = await this.keyTokenService.createKeyToken(
        user._id,
        publicKeyString,
      );
      if (!keyToken) throw new Error('Error creating key token');

      // Create token pair
      const tokens = await this.createKeyPair({
        payload: { user_id: user._id },
        public_key: publicKeyString,
        private_key: privateKeyString,
      });

      // Commit the transaction
      await session.commitTransaction();
      this.logger.log(`Successfully signed up with guest: ${user}`);

      // Return user and tokens
      return { user, tokens };
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

  private async createKeyPair({
    payload,
    public_key,
    private_key,
  }: {
    payload: any;
    public_key: string;
    private_key: string;
  }): Promise<any> {
    try {
      const accessToken = this.jwtService.sign(payload, {
        privateKey: private_key,
        algorithm: 'RS256',
        expiresIn: '7d',
      });

      const refreshToken = this.jwtService.sign(payload, {
        privateKey: private_key,
        algorithm: 'RS256',
        expiresIn: '30d',
      });

      const verify = this.jwtService.verify(accessToken, {
        publicKey: public_key,
      });

      if (!verify) throw new Error('Error verifying access token');

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Error generating tokens: ${error.message}`);
    }
  }
}
