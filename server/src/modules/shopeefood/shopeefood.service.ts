import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
require('dotenv').config();

const SHOPEE_API = process.env.SHOPEE_API
const API_HEADERS = JSON.parse(Buffer.from(process.env.SHOPEE_API_HEADERS_BASE64, 'base64').toString('utf-8'));

@Injectable()
export class ShopeeFoodService {
  private readonly logger = new Logger(ShopeeFoodService.name);

  constructor(private readonly httpService: HttpService) {}

  async getFromUrl(restaurantUrl: string): Promise<any> {
    try {
      const shopeeFoodUrl = this.extractRestaurantUrl(restaurantUrl);
      const URL = `${SHOPEE_API}/delivery/get_from_url?url=${shopeeFoodUrl}`;

      const response = await lastValueFrom(
        this.httpService.get(URL, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch from URL: ${URL} - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(`Error fetching from URL: ${URL}`, error.stack);
            throw error;
          }),
        ),
      );

      this.logger.log(`Successfully fetched data from URL: ${shopeeFoodUrl}`);
      return response.reply;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getFromUrl: ${error.message}`,
        error.stack,
      );
    }
  }

  async getRestaurantDetail(restaurant_id: string): Promise<any> {
    try {
      const URL = `${SHOPEE_API}/delivery/get_detail?id_type=1&request_id=${restaurant_id}`;

      const response = await lastValueFrom(
        this.httpService.get(URL, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch restaurant detail for restaurant_id: ${restaurant_id} - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching restaurant detail for restaurant_id: ${restaurant_id}`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply for restaurant detail with restaurant_id: ${restaurant_id}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched restaurant detail for restaurant_id: ${restaurant_id}`,
      );
      return response.reply.delivery_detail;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getRestaurantDetail: ${error.message}`,
        error.stack,
      );
    }
  }

  async getDishesApp(restaurant_id: string): Promise<any> {
    try {
      const API = `${SHOPEE_API}/v6/buyer/store/dishes?restaurant_id=${restaurant_id}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch dishes for restaurant restaurant_id: ${restaurant_id} from APP - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching dishes for restaurant restaurant_id: ${restaurant_id} from APP`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply while fetching dishes from ShopeeFood APP for restaurant_id: ${restaurant_id}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched dishes from ShopeeFood APP for restaurant_id: ${restaurant_id}`,
      );
      return response.reply;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getDishesApp: ${error.message}`,
        error.stack,
      );
    }
  }

  async getRestaurantDishes(delivery_id: string): Promise<any> {
    try {
      const API = `${SHOPEE_API}/dish/get_delivery_dishes?id_type=2&request_id=${delivery_id}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch dishes for delivery_id: ${delivery_id} from WEB - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching dishes for delivery_id: ${delivery_id} from WEB`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply while fetching dishes from ShopeeFood for delivery_id: ${delivery_id}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched dishes from ShopeeFood for delivery_id: ${delivery_id}`,
      );
      return response.reply.menu_infos;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getDishesWeb: ${error.message}`,
        error.stack,
      );
    }
  }

  async getToppingWeb(): Promise<any> {
    try {
      const API = '/api/shopeefood/topping';

      const response = await lastValueFrom(
        this.httpService.get(API).pipe(
          map((response) => response.data),
          catchError((error) => {
            this.logger.error(
              `Error fetching topping from API: ${API}`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      this.logger.log(`Successfully fetched topping from API: ${API}`);
      return response;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getToppingWeb: ${error.message}`,
        error.stack,
      );
    }
  }

  private extractRestaurantUrl = (url: string) => {
    const regex = /\/([^/]+\/[^/?]+)(\?|$)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    // If no match is found, return null or handle accordingly
    return null;
  };
}
