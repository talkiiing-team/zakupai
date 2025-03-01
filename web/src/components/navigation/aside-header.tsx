import type { PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { AsideHeader as AsideHeaderBase, FooterItem } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { ChartAreaStackedNormalized, PaperPlane } from '@gravity-ui/icons';

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
            id: 'dashboards',
            title: 'Дашборды',
            icon: ChartAreaStackedNormalized,
            onItemClick: () => navigate({ to: '/dashboards' }),
            current: location.pathname === '/dashboards'
          }
        },
        {
          item: {
            id: 'notification-channels',
            title: 'Каналы нотификаций',
            icon: PaperPlane,
            onItemClick: () => navigate({ to: '/notification-channels' }),
            current: location.pathname.includes('notification-channels')
          }
        }
      ]}

      // renderFooter={
      //   ({ compact }) => (
      //     <>
      //       <FooterItem
      //         compact={compact}
      //         item={{
      //           id: 'Да',
      //           title: 'Да',
      //           tooltipText: 'Minor issue (Now)',
      //         }}
      //       />
      //     </>
      //   )
      // }
    />
  );
}
