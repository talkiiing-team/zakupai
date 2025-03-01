import { queryClient } from '@/app/providers/query'
import { WorkbookEntities } from '@/features/dashboards/hooks/use-dashboards'
import { ActionBar as ActionBarBase } from '@gravity-ui/navigation'
import { Breadcrumbs, Button, DropdownMenu } from '@gravity-ui/uikit'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { ReactNode } from 'react'

const mapPathToHumanNames: Record<string, string> = {
  dashboards: 'Дашборды',
  'notification-channels': 'Каналы нотификаций',
  builder: 'Построитель',
  main: 'Главное',
  qq15j1qmu780c: 'Главное',
}

function getBreadcrumbs() {
  const location = useLocation()
  const navigate = useNavigate()
  let paths = location.pathname.slice(1)

  if (paths.slice(-1) === '/')
    paths = paths.slice(0, -1)

  const handleActionClick = (path: string) => {
    navigate({ to: path })
  }

  return (
    <Breadcrumbs maxItems={4} showRoot={true} onAction={(key) => handleActionClick(String(key))}>
      {
        paths.split('/').map((path, index) => {
          const p = `/${paths.split('/').splice(0, index + 1).join('/')}`

          const dashboardsData = queryClient.getQueryData<WorkbookEntities>(['dashboards'])

          let name: string | undefined = mapPathToHumanNames[path]

          if (dashboardsData?.entries) {
            const probablyName = dashboardsData?.entries.find(e => e.entryId === path)?.key.split('/').splice(-1).join('')

            if (probablyName)
              name = probablyName
          }

          return (
            <Breadcrumbs.Item key={p}>
              {name ?? path}
            </Breadcrumbs.Item>
          )
        })
      }
    </Breadcrumbs>
  )
}

export interface ActionBarProps {
  renderRightContent?: () => ReactNode
}

export function ActionBar({ renderRightContent }: ActionBarProps) {
  return (
     <ActionBarBase>
      <ActionBarBase.Section type="primary">
        <ActionBarBase.Group pull="left">
          <ActionBarBase.Item pull="left-grow">
            {getBreadcrumbs()}
          </ActionBarBase.Item>
        </ActionBarBase.Group>

        {
          renderRightContent && (
            <ActionBarBase.Group pull="right">
              {renderRightContent()}
            </ActionBarBase.Group>
          )
        }
      </ActionBarBase.Section>
    </ActionBarBase>
  )
}