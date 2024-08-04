import { api, endPoint } from "@/constant/api";
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

const useRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  // responseable to fetch intital data through api.
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(endPoint.ROOM);
      const data = await response.json();
      const roomData: Room[] = data?.message
      if (!roomData) {
        throw { message: 'No Room Found.' }
      }
      setRooms(roomData);
    };

    fetchRooms();
  }, []);

  // Subscribe to real-time updates when a room is created on the server.
  useEffect(() => {
    const handleRoomCreated = (newData: Room) => {
      setRooms((prevData) => [...prevData, newData]);
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
