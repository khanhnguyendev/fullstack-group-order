import React from "react";

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface ChildrenProps {
  children?: React.ReactNode | JSX.Element,
}


export interface ProductImage {
  width: number,
  height: number,
  value: string
}