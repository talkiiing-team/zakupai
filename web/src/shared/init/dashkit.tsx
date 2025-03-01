import { DashKit, pluginText, pluginTitle, type Plugin } from '@gravity-ui/dashkit';

import { Indicator } from '@/components/dashkit/indicator';
import { Line } from '@/components/dashkit/line';

import { IS_MOBILE } from '~/config' 
import { Pie } from '@/components/dashkit/pie';

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
  }
]

try {
  DashKit.registerPlugins(...plugins);
  DashKit.reloadPlugins(...plugins);

} catch {
  // nothing...
}
