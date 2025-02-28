import { DashKit } from '@gravity-ui/dashkit';

import { IS_MOBILE } from '~/config' 

DashKit.setSettings({
  gridLayout: {margin: [8, 8]},
  isMobile: IS_MOBILE,
  
  // menu: [] as Array<MenuItem>,
});