import { useMemo, type FC } from 'react';

import { ChartColumnStacked } from '@gravity-ui/icons';
import { invertColor } from '@/shared/lib/color';
import { cn } from '@/shared/utils/classnames';

export interface DashboardIconWithBackgroundProps {
  name: string;
}

export const DashboardIconWithBackground: FC<DashboardIconWithBackgroundProps> = ({ name }) => {
  const hex = useMemo(() => name.split('').map((char) => char.charCodeAt(0).toString(16)).join('').slice(0, 6), [name])
  const iconFill = invertColor(hex, true)

  return (
    <div className='rounded-[4px] size-6 flex justify-center items-center' style={{ backgroundColor: `#${hex}` }}>
      <ChartColumnStacked className='size-4' color={iconFill} />
    </div>
  )
}