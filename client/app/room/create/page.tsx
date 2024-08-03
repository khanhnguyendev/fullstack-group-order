"use client";

import useCreateRoom from "@/hooks/room/useCreateRoom";
import { Button, Group, MantineProvider, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from '@mantine/form';
import { IRoom } from "@/types";

const Create = () => {
  const router = useRouter()
  const { onSubmit } = useCreateRoom();
  const goBack = () => {
    router.back()
  }
  const form = useForm({ mode: 'uncontrolled' });

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values as IRoom)
  };
  return (
    <MantineProvider>
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

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Button onClick={goBack}>Back</Button>
    </MantineProvider>
  );
};

export default Create;
