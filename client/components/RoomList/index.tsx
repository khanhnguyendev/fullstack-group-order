"use client";

import useRoom from "@/hooks/room/useRoom";
import React from "react";
import CardCommon from "../CardCommon";
import classes from './style.module.css'
import { Grid, Button } from '@mantine/core';

export default function RoomList() {
  const { rooms } = useRoom();

  return (
    <Grid>
      {rooms.map(
        (data) => (
          <Grid.Col span={3} key={data._id}>
            <CardCommon data={data} className={classes.item}/>
          </Grid.Col>
        )
      )}
    </Grid>
  );
};