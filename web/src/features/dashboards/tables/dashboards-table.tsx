import type { FC } from 'react';

import { Table, TableProps, withTableActions, Icon, Loader } from '@gravity-ui/uikit';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { DashboardIconWithBackground } from '@/components/ui/dashboard-icon-with-background';
import { useDashboards } from '../hooks/use-dashboards';
import { extractDashboardName } from '../utils';

const TableWithAction = withTableActions(Table);

export interface DashboardNameProps {
  children: string
}

export const DashboardName: FC<DashboardNameProps> = ({ children }) => {
  return (
    <div className='flex items-center gap-2'>
      <DashboardIconWithBackground name={children} />
      <span>{children}</span>
    </div>
  )
}

export const DashboardsTable: FC = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useDashboards()

  if (isLoading) 
    return (
      <div 
       className={`w-full h-full flex items-center justify-center ${!isLoading ? 'hidden' : ''}`}
      >
        <Loader size='l' />
      </div>
    )

  // const getRowActions = () => [
  //   { 
  //     text: 'Клонировать',
  //     icon: <CopyPlusIcon className='size-[14px]' />,
  //     handler: () => {},
  //   }
  // ]

  return (
    <TableWithAction
      getRowDescriptor={() => ({ interactive: true })}
      onRowClick={(row) => navigate({ to: `/dashboards/${row.id}` })}
      className='w-full'
      // getRowActions={getRowActions}
      data={
        data?.entries.map((entity) => (
          {
            id: entity.entryId,
            name: <DashboardName>{extractDashboardName(entity.key)}</DashboardName>,
            updatedAt: new Date(entity.updatedAt).toLocaleString()
          }
        )) ?? []
      }
      // columns={columns}
      columns={[
        {
          id: 'name',
          name: 'Название'
        },
        {
          id: 'updatedAt',
          name: 'Последнее изменение'
        },
      ]}
    />
  )
}