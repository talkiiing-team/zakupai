import { createFileRoute } from '@tanstack/react-router'

import { DashboardsPage } from '@/pages/dashboards-page'

export const Route = createFileRoute('/dashboards/')({
  component: DashboardsPage,
})
