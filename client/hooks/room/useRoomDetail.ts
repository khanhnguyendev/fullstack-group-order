import { useEffect, useState } from "react";

interface Room {
  _id: string;
  name: string;
  description: string;
  restaurant_id: string;
  delivery_id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_ROOM_BY_ID_URL = (id: string) => `${API_URL}/room/${id}`;

const useRoomDetail = (id: string) => {
  const [room, setRoom] = useState<Room | null>(null);

  // Fetch room details by ID from API.
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(GET_ROOM_BY_ID_URL(id));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Room = await response.json();
        setRoom(data);
      } catch (error) {
        throw error;
      }
    };

    if (id) {
      fetchRoomDetail();
    }
  }, [id]);

  return {
    room,
  };
};

export default useRoomDetail;
