import { api, endPoint } from "@/constant/api";
import { useEffect, useState } from "react";

interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

const useDish = (id: string) => {
  const [dishes, setDishes] = useState<Dish[] | null>(null);

  // Fetch dishes by room ID from API.
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${endPoint.DISH_DETAIL}/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const dishData: Dish[] = data?.message
        if (dishData?.length === 0) {
          throw { message: 'No dish found.' }
        }
        setDishes(dishData);
      } catch (error) {
        throw error;
      }
    };

    if (id) {
      fetchDishes();
    }
  }, [id]);

  return {
    dishes,
  };
};

export default useDish;
