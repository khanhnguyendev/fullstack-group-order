import React from "react";
import { ISocket } from "./socket";

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface ChildrenProps {
  children?: React.ReactNode | JSX.Element;
}

export interface ProductImage {
  width: number;
  height: number;
  value: string;
}

export interface IRoom {
  name: string;
  url: string;
  description?: string;
}

export interface IRoomDetail {
  _id: string;
  name: string;
  url: string;
  description?: string;
  delivery_id: string;
  restaurant_id: string;
}

export interface IPrice {
  text: string;
  unit: string;
  value: number;
}
export interface ICart {
  id: string;
  name: string;
  price: IPrice;
  quantity: number;
}

export interface IDishOptionsSelected {
  quantity: number;
  options?: string[];
  note?: string;
}

export interface IOrder {
  socket: ISocket;
  _id: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  dish_id: string;
  note: string;
  order_by: string;
  quantity: number;
  restaurant_id: number;
  room_id: string;
  dish_name: string;
}

export interface Dish {
  _id: string;
  dish_id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  createdAt: string;
  updatedAt: string;
  dish_type_id: number;
  dish_type_name: string
}