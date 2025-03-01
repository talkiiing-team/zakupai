import { Text } from '@gravity-ui/uikit'

import { ActionBar } from '@/components/navigation/action-bar'
import { useRef } from 'react'
import { useParams } from '@tanstack/react-router'

import { Route } from '@/app/routes/dashboards/$id'

export const DashboardPage = () => {
  const param = Route.useParams()
  const ref = useRef<HTMLIFrameElement>(null)

  return (
    <>
      <ActionBar />
      <iframe
        className='w-full h-full'
        ref={ref}
        src={`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`} 
      />
    </>
  )
}