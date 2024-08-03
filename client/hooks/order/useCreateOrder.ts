import { api, endPoint } from "@/constant/api";
import { socket } from "@/utils/socket";

const useCreateOrder = () => {
  const orderItem = async (data: any) => {
    try {
      const result = await fetch(endPoint.ORDER, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!result.ok) {
        return alert("Failed to create order");
      }
      const resJson = await result.json();
      const orderData = resJson?.message;
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
