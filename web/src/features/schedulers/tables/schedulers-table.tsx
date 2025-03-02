import { useEffect, useState, type FC } from 'react';
import { Table, TableProps, withTableActions } from '@gravity-ui/uikit';
import { PaperPlane, At, TrashBin } from '@gravity-ui/icons';
import { Schedule, stringToArray } from 'cron-converter'

import { type NotificationChannel } from '@/features/notification-channels/api';
import { useSchedulers } from '../hooks/use-schedulers';
import { useRemoveScheduler } from '../hooks/use-remove-scheduler';
import { toaster } from '@/shared/lib/toaster';
import { useDashboards } from '@/features/dashboards/hooks/use-dashboards';
import { extractDashboardName } from '@/features/dashboards/utils';
import { DateTime, Duration } from 'luxon';
import { useInterval } from '@siberiacancode/reactuse';
import { Scheduler } from '../api';
import { useAtom, useSetAtom } from 'jotai';
import { currentSchedulerAtom, showSchedulerInfoAtom } from '../atoms';

const TableWithAction = withTableActions(Table);

const columns: TableProps<{}>['columns'] = [
  {
    id: 'id',
    name: 'ID'
  },
  {
    id: 'dashboard',
    name: 'Дашборд'
  },
  {
    id: 'nextRun',
    name: 'Следующий запуск задачи'
  },
  {
    id: 'createdAt',
    name: 'Время создания'
  },
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


export interface DynamicCronNextRunProps {
  scheduler: Scheduler
}

export const DynamicCronNextRun: FC<DynamicCronNextRunProps> = ({ scheduler }) => {
  const [nextRun, setNextRun] = useState('Обновляю...')

  const interval = useInterval(
    () => {
      const schedule = new Schedule(stringToArray(scheduler.spec.schedule))
      const nextRun = schedule.next().setLocale('ru').toLocaleString(DateTime.DATETIME_MED)
      
      setNextRun(nextRun)
    },
    1000
  )

  return nextRun
}

export const SchedulersTable: FC = () => {
  const { data } = useSchedulers();
  const { data: dashboards } = useDashboards()
  const setCurrentSchedulerAtom = useSetAtom(currentSchedulerAtom)
  const setShowSchedulerInfoAtom = useSetAtom(showSchedulerInfoAtom)

  const mutation = useRemoveScheduler()

  console.log(data)

  const schedulers = (data ?? []).map((scheduler) => {
    return {
      id: scheduler.metadata.annotations['zakupai.scheduler_uid'],
      dashboard: extractDashboardName(dashboards?.entries.find(e => JSON.stringify(scheduler).includes(e.entryId))?.key ?? ''),
      createdAt: DateTime.fromISO(scheduler.metadata.creation_timestamp).setLocale('ru').toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
      nextRun: <DynamicCronNextRun scheduler={scheduler} />,
      scheduler
    }
  });

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
      getRowDescriptor={() => ({ interactive: true })}
      onRowMouseDown={(row) => {
        setCurrentSchedulerAtom(row.scheduler)
        setShowSchedulerInfoAtom(true)
      }}
      // @ts-ignore
      getRowActions={getRowActions}
      data={schedulers}
      columns={columns}
    />
  )
}