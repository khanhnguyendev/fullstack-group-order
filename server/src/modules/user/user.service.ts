import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { generateGuestUsername } from '@common/utils/utils';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Create a guest user
   *
   * Step 1: Create a new guest user
   * Step 2: Return the new user
   *
   * @param name
   * @param session
   * @returns User
   */
  async createGuestUser(name: string, session?: any): Promise<User> {
    try {
      this.logger.log(`Creating guest user with name: ${name}`);
      // Step 1: Create a new guest user
      const username = generateGuestUsername();
      const user = new this.userModel({
        username,
        name,
        role: 'guest',
        isActivated: true,
        isBlocked: false,
      });
      const newUser = await user.save({ session });
      this.logger.log(`Successfully created guest user with name: ${name}`);

      // Step 2: Return the new user
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
