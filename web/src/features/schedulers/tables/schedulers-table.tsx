import { type FC } from 'react';
import { Table, TableProps, withTableActions } from '@gravity-ui/uikit';
import { PaperPlane, At, TrashBin } from '@gravity-ui/icons';

import { type NotificationChannel } from '@/features/notification-channels/api';
import { useSchedulers } from '../hooks/use-schedulers';

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
  type: NotificationChannel['type']
}

export const NotificationChannelName: FC<NotificationChannelNameProps> = ({ type }) => {
  return (
    <div className='flex items-center gap-2'>
      {type === 'telegram' && <PaperPlane />}
      {type === 'email' && <At />}
      <span>
        {type === 'telegram' && 'Telegram'}
        {type === 'email' && 'Email'}
      </span>
    </div>
  )
}

export const SchedulersTable: FC = () => {
  const { data } = useSchedulers();

  const channels = (data ?? []).map((channel) => ({
    type: <NotificationChannelName type={channel.type} />, 
    destination: <span>{channel.type === 'email' ? channel.email : channel.user_id}</span>
  }));

  const getRowActions = () => [
    {
      text: 'Удалить',
      icon: <TrashBin className='size-[14px]' />,
      handler: () => {},
      theme: 'danger' as const,
    }
  ];

  return (
    <TableWithAction
      className='w-full'
      getRowActions={getRowActions}
      data={channels}
      columns={columns}
    />
  )
}