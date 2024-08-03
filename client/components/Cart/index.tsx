'use client'
import { ChildrenProps, ICart } from '@/types';
import { Button, Card, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";


interface Props {
  carts: ICart[],
  onDeleteItem: any,
  cartTotalQty: number,
  cartTotalPrice: number
}
export default function Cart({
  carts,
  onDeleteItem,
  cartTotalQty,
  cartTotalPrice
}: Props) {
  const [loading, setLoading] = useState(false);

  const deleteItem = (id: string) => {
    onDeleteItem(id)
  }
  return (
    <>
      <div className="cart-content h-[calc(100vh-120px)]">
        {carts?.length > 0 ? carts?.map(cartItem => (
          <div key={cartItem.id} className="grid grid-cols-[15%,40%,5%,20%,1fr] gap-4 items-center">
            <Text size="lg" className="order-name" title={cartItem.name} lineClamp={1}>Name</Text>
            <Text size="lg" className="item-name" title={cartItem.name} lineClamp={1}>{cartItem.name}</Text>
            <Text size="md" className="quantity">{cartItem.quantity}</Text>
            <Text size="md" className="price" lineClamp={1}>{cartItem.price?.text}</Text>
            <FaRegTrashAlt size={'15px'} className="cursor-pointer" title='Delete' onClick={() => deleteItem(cartItem.id)}/>
          </div>
        ))
          :
          "Empty cart"
        }
      </div>
      <div className="cart-summary flex justify-between items-center">
        <Text size="md">Total: </Text>
        <Text size="md" className="total-qty">{cartTotalQty}</Text>
        <Text size="md" className="total-price">{cartTotalPrice}</Text>
      </div>
      <div className="w-[90%] mx-auto rounded">
        <Button loading={loading} fullWidth>Order</Button>
      </div>
    </>
  );
}