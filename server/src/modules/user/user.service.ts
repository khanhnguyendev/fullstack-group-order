import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@schemas/user.schema';
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
   * Step 1: Generate a username
   * Step 2: Check if username already exists
   * Step 3: If username already exists, generate a new one
   * Step 4: Create the new guest user
   * Step 5: Return the new user
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

      // Step 2: Check if username already exists
      const existingUser = await this.userModel.findOne({ username }).exec();

      // Step 3: If username already exists, generate a new one
      if (existingUser) {
        this.logger.log(
          `Username ${username} already exists, generating a new one`,
        );
        return this.createGuestUser(name, session);
      }

      // Step 4: Create the new guest user
      const user = new this.userModel({
        username,
        name,
        role: 'guest',
        isActivated: true,
        isBlocked: false,
      });
      const newUser = await user.save({ session });
      this.logger.log(`Successfully created guest user with name: ${name}`);

      // Step 5: Return the new user
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
