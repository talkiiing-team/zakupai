import type { FC } from 'react';

import axios from 'axios'
import { Table, TableProps, withTableActions, Icon } from '@gravity-ui/uikit';
import { Ellipsis as EllipsisIcon, CopyPlus as CopyPlusIcon } from '@gravity-ui/icons';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { DashboardIconWithBackground } from '../ui/dashboard-icon-with-background';
import { client, WorkbookEntities } from '@/shared/lib/axios';

const TableWithAction = withTableActions(Table);

const columns: TableProps<{}>['columns'] = [
  {
    id: 'name',
    name: 'Название'
  },
  {
    id: 'description',
    name: 'Описание'
  }
]

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

  const { data, isLoading } = useQuery({
    queryKey: ['dashboards'],
    queryFn: () => client.post<WorkbookEntities>(
      '/datalens/gateway/root/us/getWorkbookEntries',
      {
        "workbookId": "rr241df4ft1ad",
        "pageSize": 10,
        "page": 0,
        "orderBy": {
          "field": "name",
          "direction": "asc"
        },
        "scope": "dash"
      }
    ).then(res => res.data)
  })

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
            name: <DashboardName>{entity.key.split('/').splice(-1).join('')}</DashboardName>,
          }
        )) ?? []
      }
      // columns={columns}
      columns={[
        {
          id: 'name',
          name: 'Название'
        }
      ]}
    />
  )
}