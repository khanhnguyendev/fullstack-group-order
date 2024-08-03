import { api, endPoint } from "@/constant/api";
import { useEffect, useState } from "react";

interface IPhoto {
  _id: Key | null | undefined;
  width?: number;
  value?: string;
  height?: number;
}

interface IRating {
  total_review?: number;
  avg?: number;
  display_total_review?: string;
  app_link?: string;
}

interface Restaurant {
  _id: string;
  room_id: string;
  restaurant_id: number;
  delivery_id: number;
  name: string;
  restaurant_url: string;
  photos: IPhoto[];
  address: string;
  rating: IRating;
  total_order: number;
  createdAt: string;
  updatedAt: string;
}

const useRestaurant = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // Fetch restaurant details by ID from API.
  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await fetch(`${endPoint.RESTAURANT_DETAIL}/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const restaurantData: Restaurant = data?.message
        if (!restaurantData) {
          throw { message: 'No Restaurant Found.' }
        }
        setRestaurant(restaurantData);
      } catch (error) {
        throw error;
      }
    };

    if (id) {
      fetchRestaurantDetail();
    }
  }, [id]);

  return {
    restaurant,
  };
};

export default useRestaurant;
