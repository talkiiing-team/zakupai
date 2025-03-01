import { createFileRoute } from '@tanstack/react-router'

import { DashboardBuilderPage } from '@/pages/dashboard-builder-page'

export const Route = createFileRoute('/dashboards/builder')({
  component: DashboardBuilderPage
})
