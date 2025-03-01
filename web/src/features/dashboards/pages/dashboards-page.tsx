import { Text } from '@gravity-ui/uikit';

import { ActionBar } from '@/components/navigation/action-bar';

import { DashboardsTable } from '../tables/dashboards-table';

export function DashboardsPage() {
  return (
    <>
      <ActionBar />
      <div className='px-4 pt-6 flex flex-col gap-4'>
        <Text variant='subheader-3'>
          Дашборды
        </Text>
        
        <DashboardsTable />
      </div>
    </>
  )  
}