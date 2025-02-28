import { Config, DashKit } from '@gravity-ui/dashkit';
import ChartKit, { settings } from '@gravity-ui/chartkit'
import { YagrPlugin, type YagrWidgetData } from '@gravity-ui/chartkit/yagr'

settings.set({plugins: [ YagrPlugin ]});

const line10: YagrWidgetData = {
  data: {
      timeline: [
          1636838612441, 1636925012441, 1637011412441, 1637097812441, 1637184212441,
          1637270612441, 1637357012441, 1637443412441, 1637529812441, 1637616212441,
      ],
      graphs: [
          {
              id: '0',
              name: 'Serie 1',
              color: '#6c59c2',
              data: [45, 52, 89, 72, 39, 49, 82, 59, 36, 5],
          },
          {
              id: '1',
              name: 'Serie 2',
              color: '#6e8188',
              data: [37, 6, 51, 10, 65, 35, 72, 0, 94, 54],
          },
          {
              id: '2',
              name: 'Serie 3',
              color: '#e21576',
              data: [26, 54, 15, 40, 43, 18, 65, 46, 51, 33],
          },
      ],
  },
  libraryConfig: {
      chart: {
          series: {
              type: 'line',
          },
          select: {
              zoom: false,
          },
      },
      title: {
          text: 'line: random 10 pts',
      },
      axes: {
          x: {},
      },
      scales: {
          x: {},
          y: {
              type: 'linear',
              range: 'nice',
          },
      },
      cursor: {
          x: {
              visible: true,
              style: 'solid 2px rgba(230, 2, 7, 0.3)',
          },
      },
      tooltip: {
          show: true,
          tracking: 'sticky',
      },
      legend: {},
      processing: {},
  },
};

const config: Config = {
  salt: ''+Math.random(),
  aliases: {},
  items: [],
  connections: [],
  counter: 0,
  layout: []
}

export function IndexPage() {
  return (
    <div className='relative min-w-full min-h-[50vh]'>
      {/* <DashKit
        config={config}
        editMode={false}
      />  */}
      <div className='h-[500px]'>
        <ChartKit 
          type="yagr"
          data={line10}        
        />
      </div>
    </div>
  )
}