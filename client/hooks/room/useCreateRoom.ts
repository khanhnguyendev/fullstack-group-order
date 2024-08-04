import { api, endPoint } from "@/constant/api";
import { IRoom, IRoomDetail } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useCreateRoom = () => {
  const router = useRouter();

  const onSubmit = async (data: IRoom) => {
    if (!data.name || !data.url) {
      return alert("Please fill in all fields");
    }

    const createRoomPromise = async () => {
      const response = await fetch(endPoint.ROOM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const resJson = await response.json();
      const roomData: IRoomDetail = resJson?.message;

      if (!roomData) {
        throw new Error("No Room Detail Found.");
      }

      router.push(`/room/${roomData?._id}`);
    };

    toast
      .promise(createRoomPromise(), {
        loading: "Creating room...",
        success: "Room created successfully!",
        error: "Failed to create room",
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    onSubmit,
  };
};

export default useCreateRoom;
