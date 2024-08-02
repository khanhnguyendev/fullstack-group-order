import CardCommon from "@/components/CardCommon";
import RoomList from "@/components/RoomList";
import { createTheme, MantineProvider, lighten, useMantineTheme, Text } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

export default async function Room() {
  return (
    <MantineProvider theme={theme}>
      <Text size="lg" ta="center" tt="uppercase">Room history</Text>
      <RoomList />
    </MantineProvider>
  )
}