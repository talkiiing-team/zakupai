import { PropsWithChildren, useState } from 'react';
import { useAtom } from 'jotai';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import { DashKit } from '@gravity-ui/dashkit';
import { Drawer, DrawerItem } from '@gravity-ui/navigation';

import { Pencil, Plus, Xmark, TrashBin, CopyTransparent } from '@gravity-ui/icons';

import { dashboardBuilderDashkitConfigAtom, dashboardBuilderDashkitItemStateAndParamsAtom } from '@/shared/atoms/dashboard-builder';
import { IndicatorLite } from '@/components/dashkit/indicator';
import { LineLite } from '@/components/dashkit/line';
import { PieLite } from '@/components/dashkit/pie';
import { ColumnLite } from '@/components/dashkit/column';

interface ExampleAddElementProps {
  onClick: () => void
}

function ExampleAddElement({ children, onClick }: PropsWithChildren<ExampleAddElementProps>) {
  return (
    <div
      className='cursor-pointer hover:opacity-65 transition-all [&>*]:pointer-events-none mb-auto'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

type Element = 'indicator' | 'line' | 'column' | 'pie'

export function DashboardBuilderPage() {
  const [dashkitConfig, setDashkitConfig] = useAtom(dashboardBuilderDashkitConfigAtom)
  const [dashkitItemStateAndParams, setDashkitItemStateAndParams] = useAtom(dashboardBuilderDashkitItemStateAndParamsAtom)

  const [editMode, setEditMode] = useState(true)
  const [addElementDrawerIsVisible, setAddElementDrawerIsVisible] = useState(false)

  console.log(dashkitConfig, dashkitItemStateAndParams)

  const handleAddElement = (element: Element) => () => {
    setDashkitConfig(
      DashKit.setItem({
        item: {
          type: element,
          data: {},
        },
        config: dashkitConfig,
      })
    )

    setAddElementDrawerIsVisible(false)
  }

  return (
    <div className='relative min-w-full min-h-full p-4 flex flex-col gap-4'>
      <div className='flex w-full items-center'>
        <Text variant='subheader-3' className='w-full'>
          Построитель дашбордов
        </Text>

        <div className='flex items-center flex-1 w-full gap-2'>
          <Button
            view={
              editMode ? 'outlined-info' : 'outlined'
            }
            onClick={() => setEditMode(v => !v)}
          >
            <Icon data={Pencil} />
          </Button>
          <Button
            view='outlined-success' 
            onClick={() => setAddElementDrawerIsVisible(true)}
          >
            <Icon data={Plus} />
          </Button>
        </div>
      </div>

      <DashKit
        config={dashkitConfig}
        editMode={editMode}
        onChange={({ config }) => setDashkitConfig(config)}
        itemsStateAndParams={dashkitItemStateAndParams}
        overlayMenuItems={[
          {
            id: 'clone',
            title: 'Клонировать',
            icon: <Icon data={TrashBin} size={16} />,
            handler: () => undefined
          },
          {
            id: 'remove',
            title: 'Удалить',
            icon: <Icon data={CopyTransparent} size={16} />,
            handler: () => undefined
          },
        ]}
      />

      <Drawer
        onEscape={() => setAddElementDrawerIsVisible(false)}
        onVeilClick={() => setAddElementDrawerIsVisible(false)}
      >
        <DrawerItem
          id="add-element"
          direction='right'
          visible={addElementDrawerIsVisible}
          className='overflow-y-scroll h-full w-[75%] bg-[var(--g-color-base-info-heavy)] p-4 flex flex-col gap-4'
        >
          <div className='flex items-center'>
            <Text variant='subheader-3' className='w-full'>
              Элементы
            </Text>
            <div className="flex-1"></div>
            <Button
              view='outlined'
              onClick={() => setAddElementDrawerIsVisible(false)}
            >
              <Icon data={Xmark} />
            </Button>
          </div>

          <div className='grid-cols-2 grid gap-2 [grid-template-rows:masonry] row-auto'>
            <ExampleAddElement onClick={handleAddElement('indicator')}>
              <IndicatorLite 
                  data={{
                    title: 'Количество побед',
                    value: 113
                  }}
                />
            </ExampleAddElement>

            <ExampleAddElement onClick={handleAddElement('line')}>
              <LineLite data={undefined} />
            </ExampleAddElement>

            <ExampleAddElement onClick={handleAddElement('column')}>
              <ColumnLite />
            </ExampleAddElement>

            <ExampleAddElement onClick={handleAddElement('pie')}>
              <PieLite />
            </ExampleAddElement>
          </div>
        </DrawerItem>
      </Drawer>
    </div>
  )
}
