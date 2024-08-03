import { api, endPoint } from "@/constant/api";
import { IOrder } from "@/types";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";


const useOrder = (id: string) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  //   responseable to fetch intital data through api.
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${endPoint.ORDER}/${id}`);
      const data = await response.json();
      const orderData: IOrder[] = data?.message
      if (!orderData) {
        throw { message: 'No Order Found.' }
      }
      setOrders(orderData);
    };

    fetchOrders();
  }, []);

  //   subscribes to realtime updates when order is added on server.
  useEffect(() => {
    const handleCreateOrder = (newData: IOrder) => {
      setOrders((prevData) => [...prevData, newData]);
      alert(`New order: ${newData}`);
    };

    socket.on("order-added", handleCreateOrder)
    return () => {
      socket.off("order-added", handleCreateOrder);
    };
  }, []);

  return {
    orders,
  };
};

export default useOrder;
