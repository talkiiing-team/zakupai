import { createFileRoute } from '@tanstack/react-router'

import { SchedulersPage } from '@/features/schedulers/pages/schedulers-page'

export const Route = createFileRoute('/schedulers/')({
  component: SchedulersPage,
})
