import { Card } from '@gravity-ui/uikit';
import ChartKit from '@gravity-ui/chartkit';
import { Plugin, PluginWidgetProps } from '@gravity-ui/dashkit';
import { HighchartsWidgetData } from '@gravity-ui/chartkit/highcharts';

export interface PieProps extends PluginWidgetProps {
  data: {}
}

const data: HighchartsWidgetData = {
  data: {
      graphs: [
          {
              name: 'Number of requests',
              type: 'pie',
              // dataLabels: {
              //     format: null,
              //     chartKitFormatting: true,
              //     chartKitPrecision: 0,
              //     chartKitPrefix: '',
              //     chartKitPostfix: '',
              //     chartKitLabelMode: 'absolute',
              //     chartKitFormat: 'number',
              //     chartKitShowRankDelimiter: true,
              // },
              data: [
                  {name: 'Furniture', y: 14344, label: 'Furniture'},
                  {name: 'Domestic chemistry', y: 14244, label: 'Domestic chemistry'},
                  {name: 'Household goods', y: 14181, label: 'Household goods'},
              ],
          },
      ],
      // categories: ['Furniture', 'Domestic chemistry', 'Household goods'],
  },
  config: {
      showPercentInTooltip: true,
  },
  libraryConfig: {
      chart: {
          type: 'pie',
      },
  },
};

export const Pie: Plugin<PieProps>['renderer'] = (props, ref) => {
  return (
    <Card
      type='container'
      className='w-full h-full p-1'
    >
      <ChartKit
        type="highcharts"
        data={data}
      />
    </Card>
  )
}
