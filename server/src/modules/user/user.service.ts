import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createGuestUser(name: string, session?: any): Promise<User> {
    try {
      this.logger.log(`Creating guest user with name: ${name}`);
      const user = new this.userModel({
        name,
        role: 'guest',
        isActivated: true,
        isBlocked: false,
      });
      const newUser = await user.save({ session });
      this.logger.log(`Successfully created guest user with name: ${name}`);

      return newUser;
    } catch (error) {
      this.logger.error('Failed to create guest user', error.stack);
      throw error;
    }
  }

  async findById(user_id: string): Promise<User> {
    return this.userModel.findById(user_id).exec();
  }
}
