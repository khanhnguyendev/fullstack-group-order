"use client";

import useCreateRoom from "@/hooks/room/useCreateRoom";
import { Button, Container, Group, MantineProvider, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from '@mantine/form';
import { IRoom } from "@/types";
import { IoMdArrowRoundBack } from "react-icons/io";

const Create = () => {
  const router = useRouter()
  const { onSubmit } = useCreateRoom();

  const form = useForm({ mode: 'uncontrolled' });

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values as IRoom)
  };
  return (
    <MantineProvider>
      <Container>
        <Button onClick={() => router.back()} mb='lg' mt='lg' variant="outline">
          <IoMdArrowRoundBack />
        </Button>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Room Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            label="Shop URL"
            placeholder="Shop URL"
            key={form.key('url')}
            {...form.getInputProps('url')}
          />

          <TextInput
            label="Description"
            placeholder="Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          <Group justify="center" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
    </MantineProvider>
  );
};

export default Create;
