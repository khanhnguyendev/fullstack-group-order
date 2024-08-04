import { endPoint } from "@/constant/api";
import { toast } from "react-hot-toast";

const useCreateOrder = () => {
  const orderItem = async (data: any) => {
    const createOrderPromise = async () => {
      const result = await fetch(endPoint.ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        throw new Error("Failed to create order");
      }

      const resJson = await result.json();
      const orderData = resJson?.message;

      return orderData;
    };

    try {
      const orderData = await toast.promise(createOrderPromise(), {
        loading: "Processing your order...",
        success: "Order created successfully!",
        error: "Failed to create order",
      });

      return orderData;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    orderItem,
  };
};

export default useCreateOrder;
