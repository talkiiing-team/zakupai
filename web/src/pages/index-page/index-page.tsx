import { Text } from '@gravity-ui/uikit';
import ChartKit from '@gravity-ui/chartkit';
import { Config, DashKit } from '@gravity-ui/dashkit';

const config: Config = {
  salt: String(Math.random()),
  counter: 2,
  items: [
    {
      id: 'in',
      data: {
        title: 'Test',
        value: 'Test 2',
      },
      type: 'indicator',
      namespace: 'default',
      orderId: 1,
    },
    {
      id: 'ln',
      data: {},
      type: 'line',
      namespace: 'default',
      orderId: 1,
    },
    {
      id: 'pi',
      data: {},
      type: 'pie',
      namespace: 'default',
      orderId: 1,
    }
  ],
  layout: [
    {
      i: 'in',
      w: 12,
      h: 5,
      x: 0,
      y: 0,
    },
    {
      i: 'ln',
      w: 16,
      h: 16,
      x: 12,
      y: 0,
    },
    {
      i: 'pi',
      w: 16,
      h: 16,
      x: 0,
      y: 16,
    },
  ],
  aliases: {},
  connections: [],
};

export function IndexPage() {
  return (
    <div className='relative min-w-full min-h-full p-4 flex flex-col gap-4'>
      <Text variant='subheader-3'>
        Дашборд
      </Text>
            
      <DashKit
        config={config}
        editMode
      />
    </div>
  )
}
