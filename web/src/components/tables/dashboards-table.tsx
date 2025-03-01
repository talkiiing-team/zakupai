import type { FC } from 'react';

import { Table, TableProps, withTableActions, Icon } from '@gravity-ui/uikit';
import { Ellipsis as EllipsisIcon, CopyPlus as CopyPlusIcon } from '@gravity-ui/icons';
import { DashboardIconWithBackground } from '../ui/dashboard-icon-with-background';
import { useNavigate } from '@tanstack/react-router';

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

  const getRowActions = () => [
    {
      text: 'Клонировать',
      icon: <CopyPlusIcon className='size-[14px]' />,
      handler: () => {},
    }
  ]

  return (
    <TableWithAction
      getRowDescriptor={() => ({ interactive: true })}
      onRowClick={(row) => navigate({ to: `/dashboards/${row.id}` })}
      className='w-full'
      getRowActions={getRowActions}
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