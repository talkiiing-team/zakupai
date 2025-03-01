import { createFileRoute } from '@tanstack/react-router'

import { DashboardMainPage } from '@/pages/dashboard-main-page/dashboard-main-page'

export const Route = createFileRoute('/dashboards/main')({
  component: DashboardMainPage,
})
