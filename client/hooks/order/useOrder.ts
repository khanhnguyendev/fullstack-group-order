import { endPoint } from "@/constant/api";
import { IOrder } from "@/types";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

const useOrder = (roomId: string) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${endPoint.ORDER}/${roomId}`);
      const data = await response.json();
      const orderData: IOrder[] = data?.message;
      if (!orderData) {
        throw { message: "No Order Found." };
      }
      setOrders(orderData);
    };

    fetchOrders();
  }, [roomId]);

  //   subscribes to realtime updates when order is added on server.
  useEffect(() => {
    const handleCreateOrder = (newData: IOrder) => {
      setOrders((prevData) => [...prevData, newData]);
    };

    socket.on(`order@${roomId}`, handleCreateOrder);
    return () => {
      socket.off(`order@${roomId}`, handleCreateOrder);
    };
  }, [roomId]);

  return {
    orders,
  };
};

export default useOrder;
