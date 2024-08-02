"use client";

import CardCommon from "@/components/CardCommon";
import useDish from "@/hooks/dish/useDish";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import useRoomDetail from "@/hooks/room/useRoomDetail";
import { SearchParamProps } from "@/types";
import { Grid, MantineProvider, Title, Container } from "@mantine/core";

const RoomDetail = ({ params: { id } }: SearchParamProps) => {
  const { room } = useRoomDetail(id as string);
  const { restaurant } = useRestaurant(id as string);
  const { dishes } = useDish(id as string);

  if (!room || !restaurant || !dishes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MantineProvider>
        <Container fluid bg="var(--mantine-color-blue-light)">
          <Title ta="center" order={1}>{restaurant.name}</Title>
          <Grid>
            {dishes?.map(
              (data) => (
                <Grid.Col span={3} key={data._id}>
                  <CardCommon data={data} className={''}/>
                </Grid.Col>
              )
            )}
          </Grid>
        </Container>
      </MantineProvider>
    </div>
  );
};

export default RoomDetail;
