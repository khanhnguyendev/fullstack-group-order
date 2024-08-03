import { api, endPoint } from "@/constant/api";
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

const useRoomDetail = (id: string) => {
  const [room, setRoom] = useState<Room | null>(null);

  // Fetch room details by ID from API.
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(`${endPoint.ROOM}/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const roomDetail: Room = data?.message
        if (!roomDetail) {
          throw { message: 'No Room Found.' }
        }
        setRoom(roomDetail);
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
