"use client";

import useRoom from "@/hooks/room/useRoom";
import React from "react";

const RoomList = () => {
  const { rooms } = useRoom();

  return (
    <div className="max-w-lg mx-auto">
      {rooms.map(({ _id, name, description, url }) => (
        <div key={_id} className="p-2 rounded border-black border my-2">
          <p>id: {_id}</p>
          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Url: {url}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
