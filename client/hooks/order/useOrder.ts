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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GET_ORDERS_URL = `${API_URL}/order`;
const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  //   responseable to fetch intital data through api.
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(GET_ORDERS_URL);
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
