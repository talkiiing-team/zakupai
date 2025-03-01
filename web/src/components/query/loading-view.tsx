import type { FC } from 'react';

import { Overlay, Loader, Box } from '@gravity-ui/uikit';

export const LoadingView: FC = () => {
  return (
    <Box position="relative" className='flex items-center justify-center'>
      <Loader />
    </Box>
  )
}
