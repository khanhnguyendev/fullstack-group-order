import CardCommon from "@/components/CardCommon";
import RoomList from "@/components/RoomList";
import { createTheme, MantineProvider, lighten, useMantineTheme, Button } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

export default async function Room() {
  return (
    <MantineProvider theme={theme}>
      <RoomList />
    </MantineProvider>
  )
}