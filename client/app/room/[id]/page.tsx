"use client";

import useDish from "@/hooks/dish/useDish";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRoomDetail from "@/hooks/room/useRoomDetail";
import { SearchParamProps } from "@/types";

const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);
  const { restaurant } = useRestaurant(id as string);
  const { dishes } = useDish(id as string);

  if (!room || !restaurant || !dishes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* room detail */}
      <pre>{JSON.stringify(room, null, 2)}</pre>
      {/* restaurant detail */}
      <pre>{JSON.stringify(restaurant, null, 2)}</pre>
      {/* restaurant dishes */}
      <pre>{JSON.stringify(dishes, null, 2)}</pre>
    </div>
  );
};

export default RoomDetail;
