import { ActionBar as ActionBarBase } from '@gravity-ui/navigation'
import { Breadcrumbs, Button, DropdownMenu } from '@gravity-ui/uikit'
import { useLocation, useNavigate } from '@tanstack/react-router'

const mapPathToHumanNames: Record<string, string> = {
  dashboards: 'Дашборды',
  'notification-channels': 'Каналы нотификаций',
  builder: 'Построитель'  
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

          return (
            <Breadcrumbs.Item key={p}>
              {mapPathToHumanNames[path] ?? path}
            </Breadcrumbs.Item>
          )
        })
      }
    </Breadcrumbs>
  )
}

export function ActionBar() {
  return (
     <ActionBarBase>
      <ActionBarBase.Section type="primary">
        <ActionBarBase.Group pull="left">
          <ActionBarBase.Item pull="left-grow">
            {getBreadcrumbs()}
          </ActionBarBase.Item>
        </ActionBarBase.Group>
      </ActionBarBase.Section>
    </ActionBarBase>
  )
}