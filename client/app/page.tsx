'use client'
import { createTheme, MantineProvider } from '@mantine/core';
import { Button, Container } from '@mantine/core';
import { useRouter } from 'next/navigation'
import { FaPlusCircle, FaListAlt } from "react-icons/fa";

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

export default function Home() {
  const router = useRouter()
  return (
    <MantineProvider theme={theme}>
      <h1 className="font-bold text-2xl text-center mt-3">Home</h1>
      <Container size="lg" className='flex gap-5'>
        <Button variant="default" rightSection={<FaListAlt  size={20} />} onClick={() => router.push('/room')}>Rooms</Button>
        <Button variant="default" rightSection={<FaPlusCircle size={20} />} onClick={() => router.push('/room/create')}>Add new</Button>
      </Container>

    </MantineProvider>
  );
};
