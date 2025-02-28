import { useAtomValue } from 'jotai';
import { ThemeProvider } from '@gravity-ui/uikit';
import { RouterProvider } from '@tanstack/react-router';

import { router } from './providers/router';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './styles/globals.css';
import './styles/tailwind.css';

import './styles/theme.scss';

import '~/init'

import { themeAtom } from '~/atoms/theme';

export function App() {
  const theme = useAtomValue(themeAtom)

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}