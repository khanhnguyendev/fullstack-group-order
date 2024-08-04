import { api, endPoint } from "@/constant/api";
import { useEffect, useState } from "react";

export interface Dish {
  _id: string;
  dish_id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const useDish = (room_id: string) => {
  const [dishes, setDishes] = useState<Dish[] | null>(null);

  // Fetch dishes by room ID from API.
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${endPoint.DISH_DETAIL}/${room_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const dishData: Dish[] = data?.message;
        if (dishData?.length === 0) {
          throw { message: "No dish found." };
        }
        setDishes(dishData);
      } catch (error) {
        throw error;
      }
    };

    if (room_id) {
      fetchDishes();
    }
  }, [room_id]);

  return {
    dishes,
  };
};

export default useDish;
