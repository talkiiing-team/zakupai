import type { FC } from 'react';

import { Table, TableProps, withTableActions, Icon } from '@gravity-ui/uikit';
import { Ellipsis as EllipsisIcon, CopyPlus as CopyPlusIcon } from '@gravity-ui/icons';
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
  const getRowActions = () => [
    {
      text: 'Клонировать',
      icon: <CopyPlusIcon className='size-[14px]' />,
      handler: () => {},
    }
  ]

  return (
    <TableWithAction
      className='w-full'
      getRowActions={getRowActions}
      data={
        [
          {
            name: <DashboardName>Главное</DashboardName>,
            description: 'Основной дашборд, общая аналитика'
          },
          {
            name: <DashboardName>Я и Рынок</DashboardName>,
            description: 'Проанализируйте свою ситуацию на фоне других'
          },
          {
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