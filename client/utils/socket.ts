import { api } from "@/constant/api";
import { io } from "socket.io-client";
export const socket = io(
  api.URL || "http://localhost:3001"
);
