'use client'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CardCommon({ data, className }: { data: any, className: string }) {
  const router = useRouter()
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={className}>
      <Card.Section>
        <Text fw={500} ta="center">{data.name}</Text>
      </Card.Section>
      <Card.Section>
        <Text fw={500}>{data.description}</Text>
      </Card.Section>
      <Link href={data.url} target='_blank'>Shop link</Link>
      <Button color="blue" fullWidth mt="md" radius="md" onClick={() => router.push(`room/${data._id}`)}>
        View Detail
      </Button>
    </Card>
  );
}