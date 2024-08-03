import { api, endPoint } from "@/constant/api";
import { ChangeEvent, FormEvent, useState } from "react";

const Initial_data = {
  customer: "",
  address: "",
  price: 0,
};

const useCreateOrder = () => {
  const orderItem = async (data: any) => {
    console.log('🚀  file: useCreateOrder.ts:12  data:', data)
    try {
      const result = await fetch(endPoint.ORDER, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log('....',result)
    } catch (error) {
      console.error(error);
    }
  };

  return {
    orderItem,
  };
};

export default useCreateOrder;
