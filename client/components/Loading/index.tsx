import { MantineProvider, Loader, createTheme } from '@mantine/core';
import { RingLoader } from './RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

export default function Loading() {
  return (
    <MantineProvider theme={theme}>
      <Loader className='xxxxxxxxxxxxxxxxx'/>
    </MantineProvider>
  )
}