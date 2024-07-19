import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { extractRestaurantUrl, handleError } from 'src/common/utils/utils';

const BASE_URL = 'https://gappapi.deliverynow.vn/api';

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
  constructor(private readonly httpService: HttpService) {}

  async getFromUrl(restaurantUrl: string): Promise<any> {
    try {
      const shopeeFoodUrl = extractRestaurantUrl(restaurantUrl);
      const API = `${BASE_URL}/delivery/get_from_url?url=${shopeeFoodUrl}`;

      const response = await this.httpService
        .get(API, {
          headers: API_HEADERS,
        })
        .toPromise();

      if (response.status !== 200) {
        throw new Error('Network response was not OK');
      }

      const data = response.data;
      return data.reply;
    } catch (error) {
      handleError(error);
    }
  }

  async getRestaurantDetail(restaurantId: string): Promise<any> {
    try {
      const API = `${BASE_URL}/delivery/get_detail?id_type=1&request_id=${restaurantId}`;

      const response = await this.httpService
        .get(API, {
          headers: API_HEADERS,
        })
        .toPromise();

      if (response.status !== 200) {
        throw new Error('Network response was not OK');
      }

      const data = response.data;
      if (!data.reply) return;

      return data.reply.delivery_detail;
    } catch (error) {
      handleError(error);
    }
  }

  async getDishesApp(restaurantId: string, deliveryId: string): Promise<any> {
    try {
      const API = `${BASE_URL}/v6/buyer/store/dishes?restaurant_id=${restaurantId}`;

      const response = await this.httpService
        .get(API, {
          headers: API_HEADERS,
        })
        .toPromise();

      if (response.status !== 200) {
        throw new Error('Network response was not OK');
      }

      const data = response.data;
      if (!data.reply) {
        console.log('Error while fetching dishes from ShopeeFood APP');
        return;
      }

      return data.reply;
    } catch (error) {
      handleError(error);
    }
  }

  async getDishesWeb(deliveryId: string): Promise<any> {
    try {
      const API = `${BASE_URL}/dish/get_delivery_dishes?id_type=2&request_id=${deliveryId}`;

      const response = await this.httpService
        .get(API, {
          headers: API_HEADERS,
        })
        .toPromise();

      if (response.status !== 200) {
        throw new Error('Network response was not OK');
      }

      const data = response.data;
      if (!data.reply) {
        console.log('Error while fetching dishes from ShopeeFood');
        return;
      }

      return data.reply.menu_infos;
    } catch (error) {
      handleError(error);
    }
  }

  async getToppingWeb(): Promise<any> {
    try {
      const API = '/api/shopeefood/topping';
      const response = await this.httpService.get(API).toPromise();
      const data = response.data;

      return data;
    } catch (error) {
      handleError(error);
    }
  }
}
