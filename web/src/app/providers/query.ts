import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { toaster } from '~/lib/toaster'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry(failureCount) {
        return failureCount < 5
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Лог ошибки!', error)

      toaster.add({
        name: `error-${Date.now()}`,
        theme: 'danger',
        autoHiding: 3000,
        title: 'Ошибка!',
        content: JSON.stringify(error),
        isClosable: true
      })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: Error | any) => {
      toaster.add({
        name: `error-${Date.now()}`,
        theme: 'danger',
        autoHiding: 3000,
        title: 'Ошибка!',
        content: JSON.stringify(error),
        isClosable: true
      })
    },
  }),
})
