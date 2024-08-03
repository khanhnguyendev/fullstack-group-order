"use client";

import CardCommon from "@/components/CardCommon";
import Cart from "@/components/Cart";
import ModalCommon from "@/components/ModalCommon";
import withAuth from "@/components/withAuth";
import useDish from "@/hooks/dish/useDish";
import useCreateOrder from "@/hooks/order/useCreateOrder";
import useOrder from "@/hooks/order/useOrder";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRoomDetail from "@/hooks/room/useRoomDetail";
import { ICart, IDishOptionsSelected, SearchParamProps } from "@/types";
import { Text, MantineProvider, Title, Container, SimpleGrid, Drawer, Paper, Button, Indicator } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";


const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);
  const { restaurant } = useRestaurant(id as string);
  const { dishes } = useDish(id as string);
  const { orders } = useOrder(id as string);
  console.log('🚀  file: page.tsx:22  orders:', orders)
  const { orderItem } = useCreateOrder();
  const [opened, setOpen] = useState(false)
  const [carts, setCart] = useState<ICart[]>([])
  const [dishDetail, setDishDetail] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  if (!room || !restaurant || !dishes) {
    return <div>Loading...</div>;
  }

  const handleChooseOptions = (item: any) => {
    setDishDetail(item)
    setOpenModal(true)
  }
  const handleOptionsSelected = (options: IDishOptionsSelected) => {
    const formatItem = {
      room_id: dishDetail?.room_id,
      order_by: 'abc',
      dish_id: dishDetail?._id,
      quantity: options.quantity,
      note: options?.note || ''
    }
    orderItem(formatItem)
    closeModal()
  }

  const closeModal = () => {
    setOpenModal(false)
    setDishDetail(null) // clear current dish selected
  }

  const deleteItem = (id: string) => {
    const updatedCart = carts.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null;
      }
      return item;
    }).filter(item => item !== null); // Remove null items

    setCart(updatedCart);
  }

  const getCartSummaryQty = () => {
    return orders?.reduce((total, cart) => total + cart.quantity, 0)
  }
  const getCartPriceTotal = () => {
    return orders?.reduce((total, cart) => total + (cart.quantity * cart.price), 0)
  }

  return (
    <MantineProvider>
      <div className="relative w-full h-[100px] sticky top-0 z-10 bg-[var(--mantine-color-blue-light)] opacity-100">
        <Title ta="center" className="flex justify-center items-center h-full" order={1}>{restaurant.name}</Title>
        <Indicator inline label={getCartSummaryQty()} size={16} className="!absolute right-10 top-[50%] translate-y-[-50%] cursor-pointer">
          <FiShoppingCart
            size={'30px'}
            onClick={() => setOpen(true)}
          />
        </Indicator>
      </div>
      <Container fluid bg="var(--mantine-color-blue-light)">
        <Drawer
          opened={opened}
          onClose={() => setOpen(false)}
          position="right"
          title="Order Detail"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          className="relative"
        >
          <Cart
            carts={orders}
            onDeleteItem={deleteItem}
            cartTotalQty={getCartSummaryQty()}
            cartTotalPrice={getCartPriceTotal()}
          />
        </Drawer>
        <SimpleGrid cols={4}>
          {dishes?.map(
            (data) => (
              <div key={data._id}>
                <CardCommon data={data} className={''}
                  button={<Button color="blue" fullWidth mt="md" radius="md" onClick={() => handleChooseOptions(data)}>
                    Add to cart
                  </Button>}
                />
              </div>
            )
          )}
        </SimpleGrid>
      </Container>
      <ModalCommon 
        itemDetail={dishDetail} 
        openModal={openModal} 
        closeModal={(value:boolean) => setOpenModal(value)}
        optionsSelected={handleOptionsSelected}
      />
    </MantineProvider>
  );
};

export default withAuth(RoomDetail);
