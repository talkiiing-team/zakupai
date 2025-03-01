import { useAtomValue } from 'jotai';
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { router } from './providers/router';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './styles/globals.css';
import './styles/tailwind.css';

import './styles/theme.scss';

import '~/init'

import { themeAtom } from '~/atoms/theme';
import { toaster } from '@/shared/lib/toaster';
import { queryClient } from './providers/query';

export function App() {
  const theme = useAtomValue(themeAtom)

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider toaster={toaster}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToasterComponent />
      </ToasterProvider>
    </ThemeProvider>
  )
}
