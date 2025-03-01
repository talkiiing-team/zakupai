import { settings } from '@gravity-ui/chartkit'
import { YagrPlugin } from '@gravity-ui/chartkit/yagr'
import { IndicatorPlugin } from '@gravity-ui/chartkit/indicator'
import { HighchartsPlugin } from '@gravity-ui/chartkit/highcharts'
import { Lang } from '@gravity-ui/uikit';

settings.set({
  plugins: [
    YagrPlugin,
    IndicatorPlugin,
    HighchartsPlugin
  ],
  lang: Lang.Ru
});