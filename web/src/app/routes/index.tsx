import { createFileRoute, redirect } from '@tanstack/react-router'

import { IndexPage } from '@/pages/index-page'

export const Route = createFileRoute('/')({
  // component: IndexPage,
  loader: () => redirect({ to: '/dashboards' })
})