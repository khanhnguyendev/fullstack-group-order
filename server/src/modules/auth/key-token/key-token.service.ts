import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KeyToken } from './key-token.schema';

@Injectable({})
export class KeyTokenService {
  private readonly logger = new Logger(KeyTokenService.name);

  constructor(
    @InjectModel(KeyToken.name)
    private readonly keyTokenModel: Model<KeyToken>,
  ) {}

  async createKeyToken(user_id: string, public_key: string): Promise<any> {
    try {
      this.logger.log(`Creating key token for user: ${user_id}`);
      const keyToken = await this.keyTokenModel.create({
        user_id,
        public_key,
        refresh_token: [],
      });
      const newKeyToken = await keyToken.save();
      this.logger.log(`Successfully created key token for user: ${user_id}`);

      return newKeyToken ? keyToken.public_key : null;
    } catch (error) {
      this.logger.error('Error creating key token', error.stack);
      throw error;
    }
  }
}
