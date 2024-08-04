'use client'
import withAuth from '@/components/withAuth';
import { TextInput, MantineProvider, Button, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation'

function Welcome() {
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
      <Container>
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Button type="submit" mt="sm" >
            Submit
          </Button>
        </form>
      </Container>

    </MantineProvider>
  );
};


export default withAuth(Welcome)