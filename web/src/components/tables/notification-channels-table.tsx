import type { FC } from 'react';
import { Table, TableProps, withTableActions, Icon } from '@gravity-ui/uikit';
import { PaperPlane, At, TrashBin } from '@gravity-ui/icons';

const TableWithAction = withTableActions(Table);

const columns: TableProps<{}>['columns'] = [
  {
    id: 'type',
    name: 'Тип'
  },
  {
    id: 'destination',
    name: 'Назначение'
  }
]

export interface NotificationChannelNameProps {
  type: 'telegram' | 'email'
}

export const NotificationChannelName: FC<NotificationChannelNameProps> = ({ type }) => {
  return (
    <div className='flex items-center gap-2'>
      {({ 
            'telegram': <><PaperPlane /><span>Telegram</span></>,
            'email': <><At /><span>Email</span></>
        })[type]}
    </div>
  )
}

export const NotificationChannelsTable: FC = () => {
  const getRowActions = () => [
    {
      text: 'Удалить',
      icon: <TrashBin className='size-[14px]' />,
      handler: () => {},
      theme: 'danger' as const,
    }
  ]

  return (
    <TableWithAction
      className='w-full'
      getRowActions={getRowActions}
      data={
        [
          {
            type: <NotificationChannelName  type='email' />,
            destination: 'nerlihmax@yandex.ru'
          },
          {
            type: <NotificationChannelName  type='telegram' />,
            destination: '@nerlihmax'
          },
        ]
      }
      columns={columns}
    />
  )
}