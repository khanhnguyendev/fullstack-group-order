import { endPoint } from "@/constant/api";
import { toast } from "react-hot-toast";

const useDeleteOrder = () => {
  const deleteOrder = async (orderItemId: string) => {
    const onDeleteOrder = async () => {
      const result = await fetch(`${endPoint.DELETE_ORDER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: orderItemId })
      });

      if (!result.ok) {
        throw new Error("Failed to delete order");
      }

      const resJson = await result.json();
      const orderData = resJson?.message;

      return orderData;
    };

    try {
      await toast.promise(onDeleteOrder(), {
        loading: "Processing your order...",
        success: "Order delete successfully!",
        error: "Failed to delete order",
      });

    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteOrder,
  };
};

export default useDeleteOrder;
