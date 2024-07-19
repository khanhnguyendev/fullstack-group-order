import { socket } from "@/utils/socket";
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

const GET_ROOMS_URL = "http://localhost:3001/room";
const useRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  // responseable to fetch intital data through api.
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(GET_ROOMS_URL);
      const data: Room[] = await response.json();
      setRooms(data);
    };

    fetchOrders();
  }, []);

  // subscribes to realtime updates when room is created on server.
  useEffect(() => {
    socket.on("room-created", (newData: Room) => {
      setRooms((prevData) => [...prevData, newData]);
    });
    return () => {
      socket.off("room-created");
    };
  }, []);

  return {
    rooms,
  };
};

export default useRoom;
