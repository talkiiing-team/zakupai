import type { FC } from 'react';

import { Overlay, Loader, Box } from '@gravity-ui/uikit';
import { OctagonXmark } from '@gravity-ui/icons';

export const ErrorView: FC = () => {
  return (
    <Box position="relative">
      <Overlay>
        <OctagonXmark />
      </Overlay>
    </Box>
  )
}