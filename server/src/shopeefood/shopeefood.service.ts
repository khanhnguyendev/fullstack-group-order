import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { extractRestaurantUrl, handleError } from 'src/common/utils/utils';
import { lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const SHOPEE_API = 'https://gappapi.deliverynow.vn/api';

const API_HEADERS = {
  'x-foody-client-id': '',
  'x-foody-client-type': '1',
  'x-foody-app-type': '1004',
  'x-foody-client-version': '3.0.0',
  'x-foody-api-version': '1',
  'x-foody-client-language': 'vi',
  'x-foody-access-token':
    '6cf780ed31c8c4cd81ee12b0f3f4fdaf05ddf91a29ffce73212e4935ed9295fd354df0f4bc015478450a19bf80fddbe13302a61aa0c705af8315aae5a8e9cd6b',
};

@Injectable()
export class ShopeeFoodService {
  private readonly logger = new Logger(ShopeeFoodService.name);

  constructor(private readonly httpService: HttpService) {}

  async getFromUrl(restaurantUrl: string): Promise<any> {
    try {
      const shopeeFoodUrl = extractRestaurantUrl(restaurantUrl);
      const API = `${SHOPEE_API}/delivery/get_from_url?url=${shopeeFoodUrl}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch from URL: ${shopeeFoodUrl} - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching from URL: ${shopeeFoodUrl}`,
              error.stack,
            );
            handleError(error);
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
      handleError(error);
    }
  }

  async getRestaurantDetail(restaurantId: string): Promise<any> {
    try {
      const API = `${SHOPEE_API}/delivery/get_detail?id_type=1&request_id=${restaurantId}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch restaurant detail for ID: ${restaurantId} - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching restaurant detail for ID: ${restaurantId}`,
              error.stack,
            );
            handleError(error);
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply for restaurant detail with ID: ${restaurantId}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched restaurant detail for ID: ${restaurantId}`,
      );
      return response.reply.delivery_detail;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getRestaurantDetail: ${error.message}`,
        error.stack,
      );
      handleError(error);
    }
  }

  async getDishesApp(restaurantId: string): Promise<any> {
    try {
      const API = `${SHOPEE_API}/v6/buyer/store/dishes?restaurant_id=${restaurantId}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch dishes for restaurant ID: ${restaurantId} from APP - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching dishes for restaurant ID: ${restaurantId} from APP`,
              error.stack,
            );
            handleError(error);
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply while fetching dishes from ShopeeFood APP for restaurant ID: ${restaurantId}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched dishes from ShopeeFood APP for restaurant ID: ${restaurantId}`,
      );
      return response.reply;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getDishesApp: ${error.message}`,
        error.stack,
      );
      handleError(error);
    }
  }

  async getDishesWeb(deliveryId: string): Promise<any> {
    try {
      const API = `${SHOPEE_API}/dish/get_delivery_dishes?id_type=2&request_id=${deliveryId}`;

      const response = await lastValueFrom(
        this.httpService.get(API, { headers: API_HEADERS }).pipe(
          map((response) => {
            if (response.status !== 200) {
              throw new Error(
                `Failed to fetch dishes for delivery ID: ${deliveryId} from WEB - Status code: ${response.status}`,
              );
            }
            return response.data;
          }),
          catchError((error) => {
            this.logger.error(
              `Error fetching dishes for delivery ID: ${deliveryId} from WEB`,
              error.stack,
            );
            handleError(error);
            throw error;
          }),
        ),
      );

      if (!response.reply) {
        this.logger.warn(
          `No reply while fetching dishes from ShopeeFood for delivery ID: ${deliveryId}`,
        );
        return;
      }

      this.logger.log(
        `Successfully fetched dishes from ShopeeFood for delivery ID: ${deliveryId}`,
      );
      return response.reply.menu_infos;
    } catch (error) {
      this.logger.error(
        `Unhandled error in getDishesWeb: ${error.message}`,
        error.stack,
      );
      handleError(error);
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
            handleError(error);
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
      handleError(error);
    }
  }
}
