"use client";

import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRoomDetail from "@/hooks/room/useRoomDetail";
import { SearchParamProps } from "@/types";

const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);
  const { restaurant } = useRestaurant(id as string);

  if (!room || !restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* room detail */}
      <pre>{JSON.stringify(room, null, 2)}</pre>
      {/* restaurant detail */}
      <pre>{JSON.stringify(restaurant, null, 2)}</pre>
    </div>
  );
};

export default RoomDetail;
