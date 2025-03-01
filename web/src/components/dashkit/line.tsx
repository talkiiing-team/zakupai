import { Card } from '@gravity-ui/uikit';
import ChartKit from '@gravity-ui/chartkit';
import { Plugin, PluginWidgetProps } from '@gravity-ui/dashkit';
import { HighchartsWidgetData } from '@gravity-ui/chartkit/highcharts';

export interface LineProps extends PluginWidgetProps {
  data: {}
}

const data: HighchartsWidgetData = {
  data: {
      graphs: [
          {
              title: 'Profit',
              type: 'line',
              data: [
                  {
                      y: 18451.2728,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
                  {
                      y: 122490.80080000011,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
                  {
                      y: 145454.9480999999,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
              ],

              colorKey: 'Profit',

              connectNulls: false,
              yAxis: 0,
              color: '#4DA2F1',
              dashStyle: 'Solid',
              name: 'Profit',
          },
          {
              title: 'Sales',
              type: 'line',
              data: [
                  {
                      y: 741999.7952999998,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
                  {
                      y: 719047.0320000029,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
                  {
                      y: 836154.0329999966,
                      dataLabels: {
                          enabled: false,
                      },
                      label: '',
                  },
              ],
              colorKey: 'Sales',
              connectNulls: false,
              yAxis: 0,
              color: '#FF3D64',
              dashStyle: 'Solid',
              name: 'Sales',
          },
      ],
      categories: ['Furniture', 'Office Supplies', 'Technology'],
  },
  config: {
      precision: 2,
      hideHolidaysBands: true,
      enableSum: true,
      hideHolidays: false,
      normalizeDiv: false,
      normalizeSub: false,
      manageTooltipConfig: (config) => {
          config.lines.forEach((line, index) => {
              line.commentText = `Some comment ${index + 1}`;
          });

          return config;
      },
  },
  libraryConfig: {
      chart: {
          type: 'line',
      },
      legend: {
          symbolWidth: 38,
      },
      xAxis: {
          endOnTick: false,
      },
      yAxis: {
          opposite: false,
          labels: {
              y: 3,
          },
          type: 'linear',
      },
      tooltip: {},
      plotOptions: {
          series: {
              dataGrouping: {
                  enabled: false,
              },
              dataLabels: {
                  allowOverlap: false,
              },
          },
      },
  },
};

export const Line: Plugin<LineProps>['renderer'] = (props, ref) => {
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
