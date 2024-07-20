"use client";

import useRoomDetail from "@/hooks/room/useRoomDetail";
import { SearchParamProps } from "@/types";

const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>name: {room.name}</h1>
      <p>description: {room.description}</p>
      <p>restaurant_id: {room.restaurant_id}</p>
      <p>delivery_id: {room.delivery_id}</p>
      <p>url: {room.url}</p>
    </div>
  );
};

export default RoomDetail;
