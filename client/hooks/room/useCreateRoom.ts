import { api, endPoint } from "@/constant/api";
import { IRoom, IRoomDetail } from "@/types";
import { useRouter } from "next/navigation";
const useCreateRoom = () => {
  const router = useRouter();

  const onSubmit = async (data: IRoom) => {
    if (!data.name || !data.url) {
      return alert("Please fill in all fields");
    }

    try {
      const response = await fetch(endPoint.ROOM, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resJson = await response.json();
      const roomData: IRoomDetail = resJson?.message
      if (!roomData) {
        throw { message: 'No Room Detail Found.' }
      }
      router.push(`/room/${roomData?._id}`)
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onSubmit,
  };
};

export default useCreateRoom;
