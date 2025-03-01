import { DashKit, pluginText, pluginTitle, type Plugin } from '@gravity-ui/dashkit';

import { Indicator } from '@/components/dashkit/indicator';
import { Line } from '@/components/dashkit/line';
import { Pie } from '@/components/dashkit/pie';
import { Column } from '@/components/dashkit/column';

import { IS_MOBILE } from '~/config' 

DashKit.setSettings({
  gridLayout: {
    margin: [8, 8],
  },
  isMobile: IS_MOBILE,
});

const plugins: Plugin[] = [
  pluginTitle,
  pluginText,
  {
    type: 'indicator',
    defaultLayout: {
      w: 10,
      h: 8,
    },
    renderer: Indicator
  },
  {
    type: 'line',
    defaultLayout: {
      w: 16,
      h: 20,
    },
    renderer: Line
  },
  {
    type: 'pie',
    defaultLayout: {
      w: 16,
      h: 20,
    },
    renderer: Pie
  },
  {
    type: 'column',
    defaultLayout: {
      w: 16,
      h: 20,
    },
    renderer: Column
  }
]

try {
  DashKit.registerPlugins(...plugins);
  DashKit.reloadPlugins(...plugins);

} catch {
  // nothing...
}
