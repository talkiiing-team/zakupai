import type { FC } from 'react';

import axios from 'axios'
import { Table, TableProps, withTableActions, Icon } from '@gravity-ui/uikit';
import { Ellipsis as EllipsisIcon, CopyPlus as CopyPlusIcon } from '@gravity-ui/icons';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { DashboardIconWithBackground } from '../ui/dashboard-icon-with-background';

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

  const a = useQuery({
    queryKey: ['dashboards'],
    queryFn: () => axios.post(
      'https://xn----7sbbznd9a5a.xn--p1ai/datalens/gateway/root/us/getWorkbookEntries',
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
    )
  })

  console.log(a)

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
        [
          {
            id: 'main',
            name: <DashboardName>Главное</DashboardName>,
            description: 'Основной дашборд, общая аналитика'
          },
          {
            id: 'market',
            name: <DashboardName>Я и Рынок</DashboardName>,
            description: 'Проанализируйте свою ситуацию на фоне других'
          },
          {
            id: 'customer',
            name: <DashboardName>Заказчики</DashboardName>,
            description: 'Ваши основные соперники (я не придумал)'
          }
        ]
      }
      // columns={columns}
      columns={[
        {
          id: 'name',
          name: 'Название'
        },
        {
          id: 'description',
          name: 'Описание'
        },
      ]}
    />
  )
}