import { api, endPoint } from "@/constant/api";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  customer: string;
  address: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  //   responseable to fetch intital data through api.
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(endPoint.ORDER);
      const data: Order[] = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  //   subscribes to realtime updates when order is added on server.
  useEffect(() => {
    socket.on("order-added", (newData: Order) => {
      setOrders((prevData) => [...prevData, newData]);
    });
  }, []);

  return {
    orders,
  };
};

export default useOrder;
