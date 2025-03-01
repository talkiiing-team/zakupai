import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AsideHeader } from '@/components/navigation/aside-header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AsideHeader>
      <Outlet />
    </AsideHeader>
  )
}
