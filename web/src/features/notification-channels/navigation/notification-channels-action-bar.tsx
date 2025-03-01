import { ActionBar } from '@gravity-ui/navigation'
import { Breadcrumbs, Button } from '@gravity-ui/uikit'

type Props = {
    onCreateClick?: () => void
};

export function NotificationChannelsActionBar({ onCreateClick }: Props) {
  return (
     <ActionBar>
      <ActionBar.Section type="primary">
        <ActionBar.Group pull="left">
          <ActionBar.Item pull="left-grow">
            <Breadcrumbs maxItems={4} showRoot={true}>
              <Breadcrumbs.Item>
                Каналы нотификаций
              </Breadcrumbs.Item>
            </Breadcrumbs>
          </ActionBar.Item>
        </ActionBar.Group>
        <ActionBar.Group pull="right">
          <Button onClick={onCreateClick} view='action' on>Создать канал нотификаций</Button>
        </ActionBar.Group>
      </ActionBar.Section>
    </ActionBar>
  )
}