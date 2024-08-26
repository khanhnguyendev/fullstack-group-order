"use client";

import CardCommon from "@/components/CardCommon";
import Cart from "@/components/Cart";
import ModalCommon from "@/components/ModalCommon";
import SkeletonList from "@/components/Skeletion/List";
import withAuth from "@/components/withAuth";
import useDish from "@/hooks/dish/useDish";
import useCreateOrder from "@/hooks/order/useCreateOrder";
import useDeleteOrder from "@/hooks/order/useDeleteOrder";
import useOrder from "@/hooks/order/useOrder";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRoomDetail from "@/hooks/room/useRoomDetail";
import { Dish, ICart, IDishOptionsSelected, SearchParamProps } from "@/types";
import {
  Text,
  MantineProvider,
  Title,
  Container,
  SimpleGrid,
  Drawer,
  Paper,
  Button,
  Indicator,
  Tabs,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);
  const { restaurant } = useRestaurant(id as string);
  const { dishes } = useDish(id as string);
  const { orders } = useOrder(id as string);
  const { orderItem } = useCreateOrder();
  const { deleteOrder } = useDeleteOrder();
  const [opened, setOpen] = useState(false);
  const [dishDetail, setDishDetail] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>();

  if (!room || !restaurant || !dishes) {
    return <SkeletonList />
  }

  const handleChooseOptions = (item: any) => {
    setDishDetail(item);
    setOpenModal(true);
  };

  const handleOptionsSelected = (options: IDishOptionsSelected) => {
    const formatItem = {
      room_id: dishDetail?.room_id,
      order_by: localStorage.getItem("user") || 'no name',
      dish_id: dishDetail?.dish_id,
      quantity: options.quantity,
      note: options?.note || "",
    };
    orderItem(formatItem);
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
    setDishDetail(null); // clear current dish selected
  };

  const deleteItem = (id: string) => {
    deleteOrder(id)
  };

  const getCartSummaryQty = () => {
    return orders?.reduce((total, cart) => total + cart.quantity, 0);
  };
  const getCartPriceTotal = () => {
    return orders?.reduce(
      (total, cart) => total + cart.quantity * cart.price,
      0
    );
  };

  const getDishType = () => {
    // remove duplicate item
    const formatDishes = dishes.filter((dish, indx, list) => list.findIndex(item => (item.dish_type_id === dish.dish_type_id)) === indx)

    return formatDishes.map(dish => ({
      label: dish.dish_type_name,
      value: dish.dish_type_id
    }))
  }

  const chooseTab = (tabValue: string) => {
    const section = document.getElementById(tabValue)
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveTab(tabValue)
  }

  const getDishesInGroup = () => {
    const groupedDishByDishid = dishes.reduce((acc: any, obj: any) => {
      if (!acc[obj.dish_type_id]) {
        acc[obj.dish_type_id] = [];
      }
      acc[obj.dish_type_id].push(obj);
      return acc;
    }, {});
    // const formatDishes = Object.values(groupedDishByDishid);
    return groupedDishByDishid
  }

  const displayDishes = () => {
    return Object.entries(getDishesInGroup()).map(([key, dishes]) => (
      <div id={key} key={key} className="section-wrapper">
        <p>Group {key}</p>

        <SimpleGrid cols={4}>
          {dishes?.map((dish: Dish) => (
            <div key={dish._id}>
              <CardCommon
                data={dish}
                className={""}
                button={
                  <Button
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => handleChooseOptions(dish)}
                  >
                    Select
                  </Button>
                }
              />
            </div>
          ))}
        </SimpleGrid>
      </div>
    ))
  }
  return (
    <MantineProvider>
      <div className="relative w-full h-[100px] sticky top-0 z-10 bg-[var(--mantine-color-blue-light)] opacity-100">
        <Title
          ta="center"
          className="flex justify-center items-center h-full"
          order={1}
        >
          {restaurant.name}
        </Title>
        <Indicator
          inline
          label={getCartSummaryQty()}
          size={16}
          className="!absolute right-10 top-[50%] translate-y-[-50%] cursor-pointer"
        >
          <FiShoppingCart size={"30px"} onClick={() => setOpen(true)} />
        </Indicator>
      </div>
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
      <Container size="lg" bg="var(--mantine-color-blue-light)">
        <Tabs value={activeTab} onChange={(value) => chooseTab(value)}>
          <Tabs.List>
            {getDishType()?.map((dish, dishInx) => (
              <Tabs.Tab key={`${dish.value}-${dishInx}`} value={dish.value.toString()}>{dish.label}</Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
        {displayDishes()}

      </Container>
      <ModalCommon
        itemDetail={dishDetail}
        openModal={openModal}
        closeModal={(value: boolean) => setOpenModal(value)}
        optionsSelected={handleOptionsSelected}
      />
    </MantineProvider>
  );
};

export default withAuth(RoomDetail);
