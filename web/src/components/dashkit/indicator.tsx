import { Card } from '@gravity-ui/uikit';
import ChartKit from '@gravity-ui/chartkit';
import { Plugin, PluginWidgetProps } from '@gravity-ui/dashkit';

export type IndicationData = {
  title: string;
  value: string | number;
}

export interface IndicatorProps extends PluginWidgetProps {
  data: IndicationData & {
    extraIndicators: IndicationData[]
  }
}

export const Indicator: Plugin<IndicatorProps>['renderer'] = (props, ref) => {
  const data = [
    {
      title: props.data.title,
      content: {
        current: {
          value: props.data.value,
        },
      },
    }
  ]

  if (props.data.extraIndicators)
    data.push(
      ...props.data.extraIndicators.map(indicator => ({
        title: indicator.title,
        content: {
          current: {
            value: indicator.value,
          },
        },
      }))
    )

  return (
    <Card
      type='container'
      className='w-full h-full p-1'
    >
      <ChartKit
        type="indicator"
        data={
          {
            data: data.filter(Boolean),
          }
        }
      />
    </Card>
  )
}
