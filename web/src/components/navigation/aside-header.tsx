import type { PropsWithChildren } from 'react';

import { useAtom } from 'jotai';
import { AsideHeader as AsideHeaderBase, MobileHeader } from '@gravity-ui/navigation';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { ChartAreaStackedNormalized, ClockArrowRotateLeft, PaperPlane } from '@gravity-ui/icons';

import BrandLogo from '~/assets/logo.svg?react'

import { navigationCompactAtom } from '~/atoms/navigation';
import { IS_MOBILE } from '@/shared/config';

export interface AsideHeaderProps {}

export function AsideHeader({ children }: PropsWithChildren<AsideHeaderProps>) {
  const [navigationCompact, setNavigationCompact] = useAtom(navigationCompactAtom)

  const location = useLocation()
  const navigate = useNavigate()

  if (IS_MOBILE)
    return (
      <MobileHeader
        logo={{
          text: '',
          icon: BrandLogo,
          href: '#',
          onClick: () => navigate({ to: '/' }),
        }}
  
        renderContent={() => children}
  
        burgerMenu={{
          items: [
            {
              id: 'dashboards',
              title: 'Дашборды',
              icon: ChartAreaStackedNormalized,
              onItemClick: () => navigate({ to: '/dashboards' }),
              current: location.pathname.includes('/dashboards')
            },
            {
              id: 'notification-channels',
              title: 'Каналы нотификаций',
              icon: PaperPlane,
              onItemClick: () => navigate({ to: '/notification-channels' }),
              current: location.pathname.includes('notification-channels')
            },
            {
              id: 'schedulers',
              title: 'Планировщики',
              icon: ClockArrowRotateLeft,
              onItemClick: () => navigate({ to: '/schedulers' }),
              current: location.pathname.includes('schedulers')
            },
          ]
        }}
  
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
            current: location.pathname.includes('/dashboards')
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
        },
        {
          item: {
            id: 'schedulers',
            title: 'Планировщики',
            icon: ClockArrowRotateLeft,
            onItemClick: () => navigate({ to: '/schedulers' }),
            current: location.pathname.includes('schedulers')
          }
        },
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
