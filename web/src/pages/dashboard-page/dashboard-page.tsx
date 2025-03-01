import { Text } from '@gravity-ui/uikit'

import { ActionBar } from '@/components/navigation/action-bar'
import { useRef } from 'react'

export const DashboardPage = () => {
  const ref = useRef<HTMLIFrameElement>(null)

  return (
    <>
      <ActionBar />
      <iframe
        className='w-full h-full'
        ref={ref}
        src="http://localhost:49320/qq15j1qmu780c-glavnoe" 
      />
    </>
  )
}