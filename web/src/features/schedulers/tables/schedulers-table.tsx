import { useEffect, type FC } from 'react';
import { Table, TableProps, withTableActions } from '@gravity-ui/uikit';
import { PaperPlane, At, TrashBin } from '@gravity-ui/icons';

import { type NotificationChannel } from '@/features/notification-channels/api';
import { useSchedulers } from '../hooks/use-schedulers';
import { useRemoveScheduler } from '../hooks/use-remove-scheduler';
import { toaster } from '@/shared/lib/toaster';
import { useDashboards } from '@/features/dashboards/hooks/use-dashboards';
import { extractDashboardName } from '@/features/dashboards/utils';

const TableWithAction = withTableActions(Table);

const columns: TableProps<{}>['columns'] = [
  {
    id: 'name',
    name: 'Название'
  },
  {
    id: 'dashboard',
    name: 'Дашборд'
  },
  {
    id: 'createdAt',
    name: 'Время создания'
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
  const { data: dashboards } = useDashboards()

  const mutation = useRemoveScheduler()

  console.log(data)

  const schedulers = (data ?? []).map((scheduler) => ({
    id: scheduler.metadata.annotations['zakupai.scheduler_uid'],
    name: scheduler.metadata.name,
    dashboard: extractDashboardName(dashboards?.entries.find(e => JSON.stringify(scheduler).includes(e.entryId))?.key ?? ''),
    createdAt: new Date(scheduler.metadata.creation_timestamp).toLocaleString(),
  }));

  useEffect(() => {
    if (mutation.isSuccess) {
      toaster.add({
        name: 'asdad',
        autoHiding: 1500,
        title: 'Удалено'
      })
    }
  }, [mutation.isSuccess])

  const getRowActions = () => [
    {
      text: 'Удалить',
      icon: <TrashBin className='size-[14px]' />,
      handler: (scheduler: { id: string }) => mutation.mutate(scheduler.id),
      theme: 'danger' as const,
    }
  ];

  return (
    <TableWithAction
      className='w-full'
      // @ts-ignore
      getRowActions={getRowActions}
      data={schedulers}
      columns={columns}
    />
  )
}