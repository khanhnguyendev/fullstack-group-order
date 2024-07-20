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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_RESTAURANT_DISHES_BY_ROOM_ID = (id: string) =>
  `${API_URL}/dish/${id}`;

const useDish = (id: string) => {
  const [dishes, setDishes] = useState<Dish[] | null>(null);

  // Fetch dishes by room ID from API.
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(GET_RESTAURANT_DISHES_BY_ROOM_ID(id));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Dish[] = await response.json();
        setDishes(data);
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
