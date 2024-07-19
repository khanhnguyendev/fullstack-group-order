"use client";

import useRoom from "@/hooks/room/useRoom";
import React from "react";

const RoomList = () => {
  const { rooms } = useRoom();

  return (
    <div className="max-w-lg mx-auto">
      {rooms.map(
        ({ _id, name, description, url, restaurant_id, delivery_id }) => (
          <div key={_id} className="p-2 rounded border-black border my-2">
            <p>id: {_id}</p>
            <p>restaurant_id: {restaurant_id}</p>
            <p>delivery_id: {delivery_id}</p>
            <p>name: {name}</p>
            <p>description: {description}</p>
            <p>url: {url}</p>
          </div>
        )
      )}
    </div>
  );
};

export default RoomList;
