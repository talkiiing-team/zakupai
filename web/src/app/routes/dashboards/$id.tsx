import { createFileRoute } from '@tanstack/react-router'

import { DashboardPage } from '@/features/dashboards/pages/dashboard-page';

export const Route = createFileRoute('/dashboards/$id')({
  component: DashboardPage,
});