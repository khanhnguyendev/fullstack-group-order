'use client'
import { ChildrenProps, ProductImage } from '@/types';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Carousel } from '@mantine/carousel';

interface Props {
  children?: ChildrenProps,
  data: any,
  className?: string,
  type?: string
}
export default function CardCommon({
  data, children, className
}: Props) {
  const router = useRouter()
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={''}>
      {/* image */}
      <Card.Section>
        {data.photos?.length > 0 &&
          <Carousel withIndicators>
            {data.photos?.map((photo: ProductImage, idx: number) => (
              <Carousel.Slide key={idx}>
                <Image
                  src={photo.value}
                  width={photo.width}
                  height={photo.height}
                  alt="dishes"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        }
        <Text fw={500} ta="center">{data.name}</Text>
      </Card.Section>
      <Card.Section>
        <Text fw={500}>{data.description}</Text>
      </Card.Section>
      {data.price &&
        <Card.Section>
          <Text fw={500}>{data.price.text}</Text>
        </Card.Section>}
      {data.url && <Link href={data.url} target='_blank'>Shop link</Link>}
      <Button color="blue" fullWidth mt="md" radius="md" onClick={() => router.push(`room/${data._id}`)}>
        View Detail
      </Button>
    </Card>
  );
}