"use client";

import useRoom from "@/hooks/room/useRoom";
import React from "react";
import CardCommon from "../CardCommon";
import classes from './style.module.css'
import { Grid, Button } from '@mantine/core';
import useOrder from "@/hooks/order/useOrder";
import { useRouter } from "next/navigation";

export default function RoomList() {
  const { rooms } = useRoom();
  const router = useRouter()
  return (
    <Grid>
      {rooms?.map(
        (data) => (
          <Grid.Col span={3} key={data._id}>
            <CardCommon data={data} className={classes.item}
              button={<Button color="blue" fullWidth mt="md" radius="md" onClick={() => router.push(`room/${data._id}`)}>
                View detail
              </Button>}
            />
          </Grid.Col>
        )
      )}
    </Grid>
  );
};