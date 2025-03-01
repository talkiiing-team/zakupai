import { createFileRoute } from '@tanstack/react-router'

import { DashboardMainPage } from '@/pages/dashboard-main-page';

export const Route = createFileRoute('/dashboards/$id')({
  component: DashboardMainPage,
});
