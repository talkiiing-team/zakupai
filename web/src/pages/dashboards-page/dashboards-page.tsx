import { Text } from '@gravity-ui/uikit';

import { DashboardsTable } from '@/components/tables/dashboards-table';

export function DashboardsPage() {
  return (
    <div className='px-4 pt-6 flex flex-col gap-4'>
      <Text variant='subheader-3'>
        Дашборды
      </Text>
      
      <DashboardsTable />
    </div>
  )  
}