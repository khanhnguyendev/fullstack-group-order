'use client'
import Loading from "@/components/Loading";
import RoomList from "@/components/RoomList";
import { Container, MantineProvider, Text } from '@mantine/core';
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { IoHome } from "react-icons/io5";

export default function Room() {
  const router = useRouter()

  return (
    <Suspense fallback={<Loading />}>
      <MantineProvider>
        <Container mt='lg'>
          <IoHome size='20px' className="cursor-pointer" onClick={() => router.push('/')} />
          <Text size="lg" ta="center" tt="uppercase" mb='lg'>Room history</Text>
          <RoomList />
        </Container>
      </MantineProvider>
    </Suspense>
  )
}