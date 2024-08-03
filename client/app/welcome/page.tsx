'use client'
import { TextInput, MantineProvider, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 3 ? 'Enter your name' : null),
    },
  });
  const submitForm = (values: typeof form.values) => {
    console.log(values)
    localStorage.setItem('user', values.name)
    router.back()
  }
  return (
    <MantineProvider >
      <Center maw={600} h={300} mx='auto' bg="var(--mantine-color-gray-light)">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Center>

    </MantineProvider>
  );
};
