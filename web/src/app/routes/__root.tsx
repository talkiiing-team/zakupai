import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AsideHeader } from '@/components/navigation/aside-header'
import { ActionBar } from '@/components/navigation/action-bar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AsideHeader>
      <ActionBar />

      <Outlet />
    </AsideHeader>
  )
}
