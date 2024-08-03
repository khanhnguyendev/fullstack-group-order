'use client'
import { ChildrenProps } from '@/types';
import { Card, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children?: ChildrenProps,
  data: any,
  className?: string,
  type?: string,
  button?: ReactNode
}
export default function CardCommon({
  data, children, className, button
}: Props) {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={''}>
      {/* image */}
      <Card.Section>
        {data.photos?.length > 0 &&
          <Image
            src={data.photos[data.photos.length -1].value}
            width={data.photos[data.photos.length -1].width}
            height={data.photos[data.photos.length -1].height}
            alt="dishes"
          />
        }
        <Text fw={500} ta="center">{data.name}</Text>
      </Card.Section>
      <Card.Section>
        <Text fw={500}>{data.description}</Text>
      </Card.Section>
      {data.price &&
        <Card.Section>
          <Text fw={500} ta={'center'}>{data.price.text}</Text>
        </Card.Section>}
      {data.url && <Link href={data.url} target='_blank'>Shop link</Link>}
      
      <div>{button}</div>
    </Card>
  );
}