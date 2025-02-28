import type { PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { AsideHeader as AsideHeaderBase } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { ChartAreaStackedNormalized } from '@gravity-ui/icons';

import BrandLogo from '~/assets/logo.svg?react'

import { navigationCompactAtom } from '~/atoms/navigation';

export interface AsideHeaderProps {}

export function AsideHeader({ children }: PropsWithChildren<AsideHeaderProps>) {
  const [navigationCompact, setNavigationCompact] = useAtom(navigationCompactAtom)

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AsideHeaderBase
      logo={{
        text: 'ЗакупAI',
        icon: BrandLogo,
        href: '#',
        onClick: () => navigate({ to: '/' }),
      }}

      headerDecoration

      renderContent={() => children}

      compact={navigationCompact}
      onChangeCompact={(compact) => setNavigationCompact(compact)}

      subheaderItems={[
        {
          item: {
            id: 'dashboard',
            title: 'Дашборд',
            icon: ChartAreaStackedNormalized,
            onItemClick: () => navigate({ to: '/' }),
            current: location.pathname === '/'
          }
        }
      ]}
    />
  );
}
