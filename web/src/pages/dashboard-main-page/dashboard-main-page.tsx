import { Text, Select, Card } from '@gravity-ui/uikit';

import { ActionBar } from '@/components/navigation/action-bar';

export function DashboardMainPage() {
  return (
    <>
      <ActionBar />
      <div className='px-4 pt-6 flex flex-col gap-4'>
        <Text variant='subheader-3'>
          Главное
        </Text>

        <section className='flex gap-2'>
          <Card className='flex items-center gap-2 px-4 py-2 w-fit' view='outlined'>
              <Text variant='subheader-1'>
                Таблица:
              </Text>
              <Select size='m' filterable={true} placeholder="Таблица">
                <Select.Option value="val_1">Value 1</Select.Option>
                <Select.Option value="val_2">Value 2</Select.Option>
                <Select.Option value="val_3">Value 3</Select.Option>
                <Select.Option value="val_4">Value 4</Select.Option>
              </Select>
            </Card>
        </section>
      </div>
    </>
  )  
}