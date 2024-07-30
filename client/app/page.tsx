'use client'
import { createTheme, MantineProvider } from '@mantine/core';
import { Button, Container } from '@mantine/core';
import { useRouter } from 'next/navigation'


const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

export default function Home() {
  const router = useRouter()
  return (
    <MantineProvider theme={theme}>
      <h1 className="font-bold text-2xl text-center mt-3">Home</h1>
      <Container size="lg">
        <Button variant="filled" onClick={() => router.push('/room')}>Rooms</Button>
        <Button variant="filled" onClick={() => router.push('/room/create')}>Add new</Button>

      </Container>

    </MantineProvider>
  );
};
