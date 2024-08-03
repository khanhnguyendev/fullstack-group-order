import RoomList from "@/components/RoomList";
import { MantineProvider, Text } from '@mantine/core';

export default async function Room() {
  return (
    <MantineProvider>
      <Text size="lg" ta="center" tt="uppercase">Room history</Text>
      <RoomList />
    </MantineProvider>
  )
}