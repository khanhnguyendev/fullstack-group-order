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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_ROOMS_URL = `${API_URL}/room`;

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

  // Subscribe to real-time updates when a room is created on the server.
  useEffect(() => {
    const handleRoomCreated = (newData: Room) => {
      setRooms((prevData) => [...prevData, newData]);
      alert(`New room created: ${newData._id}`);
    };

    socket.on("room-created", handleRoomCreated);

    // Cleanup: Ensure the event listener is removed when the component is unmounted
    return () => {
      socket.off("room-created", handleRoomCreated);
    };
  }, []);

  return {
    rooms,
  };
};

export default useRoom;
