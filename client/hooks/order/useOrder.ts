import { endPoint } from "@/constant/api";
import { IOrder } from "@/types";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useOrder = (room_id: string) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${endPoint.ORDER}/${room_id}`);
      const data = await response.json();
      const orderData: IOrder[] = data?.message;
      if (!orderData) {
        throw { message: "No Order Found." };
      }
      setOrders(orderData);
    };

    fetchOrders();
  }, [room_id]);

  // subscribes to realtime updates when order is added on server.
  useEffect(() => {
    const handleCreateOrder = (newData: IOrder) => {
      setOrders((prevData) => [...prevData, newData]);
      // TODO check if the order is not from the same user, then show toast
      toast.success(newData.socket.message);
    };

    socket.on(`order@${room_id}`, handleCreateOrder);
    return () => {
      socket.off(`order@${room_id}`, handleCreateOrder);
    };
  }, [room_id]);

  return {
    orders,
  };
};

export default useOrder;
