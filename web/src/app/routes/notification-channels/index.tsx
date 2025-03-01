import { createFileRoute } from '@tanstack/react-router'

import { NotificationChannelsPage } from '@/pages/notification-channels-page'

export const Route = createFileRoute('/notification-channels/')({
  component: NotificationChannelsPage,
})
