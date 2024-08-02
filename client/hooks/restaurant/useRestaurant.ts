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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_RESTAURANT_BY_ID_URL = (id: string) => `${API_URL}/restaurant/${id}`;

const useRestaurant = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // Fetch restaurant details by ID from API.
  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await fetch(GET_RESTAURANT_BY_ID_URL(id));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Restaurant = await response.json();
        setRestaurant(data);
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
