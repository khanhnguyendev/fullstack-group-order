import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';
import { RoomGateway } from './room.gateway';
import { ShopeeFoodService } from 'src/shopeefood/shopeefood.service';
import { Restaurant } from 'src/modules/restaurant/restaurant.schema';
import { Dish } from '../dish/dish.schema';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<Room>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(Dish.name)
    private readonly dishModel: Model<Dish>,
    private readonly roomGateway: RoomGateway,
    private readonly shopeefoodService: ShopeeFoodService,
  ) {}

  async getAllRooms(): Promise<Room[]> {
    try {
      return await this.roomModel.find().exec();
    } catch (error) {
      this.logger.error('Failed to fetch rooms', error.stack);
      throw error;
    }
  }

  async getRoomById(id: string): Promise<Room> {
    try {
      const room = await this.roomModel.findById(id).exec();
      if (!room) {
        throw new Error('Room not found');
      }
      return room;
    } catch (error) {
      this.logger.error('Failed to fetch room', error.stack);
      throw error;
    }
  }

  async create(roomData: Room): Promise<Room> {
    const startTime = new Date();
    this.logger.log('Creating new room...');
    try {
      // Step 1: Fetch restaurant info from ShopeeFood
      const restaurantInfo = await this.fetchRestaurantInfo(roomData.url);
      if (!restaurantInfo) {
        throw new Error('Restaurant information could not be retrieved');
      }

      // Step 2: Create and save the room
      const room = new this.roomModel({
        ...roomData,
        restaurant_id: restaurantInfo.restaurant_id,
        delivery_id: restaurantInfo.delivery_id,
      });
      const savedRoom = await room.save();
      this.logger.log('New room created:', savedRoom);

      // Step 3: Fetch restaurant details from ShopeeFood
      const restaurantDetails = await this.fetchRestaurantDetails(
        restaurantInfo.restaurant_id,
      );
      if (!restaurantDetails) {
        throw new Error('Restaurant details could not be retrieved');
      }

      // Step 4: Create and save the restaurant details
      this.logger.log('Creating new restaurant...');
      const restaurant = new this.restaurantModel({
        ...restaurantDetails,
        room_id: savedRoom._id,
      });
      await restaurant.save();
      this.logger.log('New restaurant added');

      // Step 5: Fetch restaurant dishes from ShopeeFood
      const restaurantDishes = await this.fetchRestaurantDishes(
        restaurantInfo.delivery_id,
      );
      if (!restaurantDishes) {
        throw new Error('Restaurant dishes could not be retrieved');
      }

      // Step 6: Create and save the restaurant dishes
      this.logger.log('Removing old dishes...');
      await this.dishModel.deleteMany({
        restaurant_id: restaurantInfo.restaurant_id,
        delivery_id: restaurantInfo.delivery_id,
      });
      this.logger.log('Creating new dishes...');
      const newDishes = restaurantDishes.flatMap((dishType) =>
        dishType.dishes.map((dish) => ({
          is_deleted: dish.is_deleted !== undefined ? dish.is_deleted : false,
          description: dish.description || '',
          name: dish.name || 'Unknown Dish',
          price: {
            text: dish.price?.text || '',
            unit: dish.price?.unit || '',
            value: dish.price?.value !== undefined ? dish.price.value : 0,
          },
          discount_price: dish.discount_price
            ? {
                text: dish.discount_price?.text || '',
                unit: dish.discount_price?.unit || '',
                value:
                  dish.discount_price?.value !== undefined
                    ? dish.discount_price.value
                    : 0,
              }
            : undefined,
          is_active: dish.is_active !== undefined ? dish.is_active : false,
          total_like: dish.total_like || '0',
          properties: dish.properties || [],
          photos: dish.photos || [],
          options:
            dish.options.map((option) => ({
              ntop: option.ntop || '',
              mandatory:
                option.mandatory !== undefined ? option.mandatory : false,
              id: option.id !== undefined ? option.id : 0,
              option_items: {
                min_select: option.option_items?.min_select || 0,
                max_select: option.option_items?.max_select || 0,
                items:
                  option.option_items?.items.map((item) => ({
                    name: item.name || '',
                    weight: item.weight || 0,
                    ntop_price: {
                      text: item.ntop_price?.text || '',
                      unit: item.ntop_price?.unit || '',
                      value:
                        item.ntop_price?.value !== undefined
                          ? item.ntop_price.value
                          : 0,
                    },
                    max_quantity:
                      item.max_quantity !== undefined ? item.max_quantity : 0,
                    is_default:
                      item.is_default !== undefined ? item.is_default : false,
                    top_order:
                      item.top_order !== undefined ? item.top_order : 0,
                    price: {
                      text: item.price?.text || '',
                      unit: item.price?.unit || '',
                      value:
                        item.price?.value !== undefined ? item.price.value : 0,
                    },
                  })) || [],
              },
              name: option.name || '',
            })) || [],
          is_available:
            dish.is_available !== undefined ? dish.is_available : false,
          is_group_discount_item:
            dish.is_group_discount_item !== undefined
              ? dish.is_group_discount_item
              : false,
          time: dish.time || {
            available: [],
            week_days: [],
            not_available: [],
          },
          id: dish.id !== undefined ? dish.id : 0,
          display_order:
            dish.display_order !== undefined ? dish.display_order : 0,
          mms_image: dish.mms_image || '',
          quantity: dish.quantity !== undefined ? dish.quantity : 0,
          dish_type_id: dishType.dish_type_id,
          dish_type_name: dishType.dish_type_name,
          room_id: savedRoom._id,
          restaurant_id: restaurantInfo.restaurant_id,
          delivery_id: restaurantInfo.delivery_id,
        })),
      );
      await this.dishModel.insertMany(newDishes);
      this.logger.log(`Total added dishes: ${newDishes.length}`);

      // Notify all clients about the new room
      this.roomGateway.notify('room-created', savedRoom);

      const endTime = new Date();
      this.logger.log(
        `Room creation completed in ${endTime.getTime() - startTime.getTime()}ms`,
      );

      return savedRoom;
    } catch (error) {
      this.logger.error('Error creating room', error.stack);
      throw error;
    }
  }

  private async fetchRestaurantInfo(url: string): Promise<any> {
    const info = await this.shopeefoodService.getFromUrl(url);
    if (!info || !info.restaurant_id || !info.delivery_id) {
      this.logger.error(`Restaurant info not found for URL: ${url}`);
    }
    return info;
  }

  private async fetchRestaurantDetails(restaurant_id: string): Promise<any> {
    return this.shopeefoodService.getRestaurantDetail(restaurant_id);
  }

  private async fetchRestaurantDishes(delivery_id: string): Promise<any> {
    return this.shopeefoodService.getRestaurantDishes(delivery_id);
  }
}
