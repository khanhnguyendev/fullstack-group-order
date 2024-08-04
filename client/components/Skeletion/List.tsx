import { Group, MantineProvider, SimpleGrid, Skeleton } from '@mantine/core';

export default function SkeletonList() {
  return (
    <MantineProvider>
      <SimpleGrid cols={4}>
      {
        Array.from(Array(8).keys()).map((item, index) => (
          <Group key={'key-'+index}>
            <Skeleton height={400} mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </Group>
        ))
      }
      </SimpleGrid>
    </MantineProvider>
  );
}