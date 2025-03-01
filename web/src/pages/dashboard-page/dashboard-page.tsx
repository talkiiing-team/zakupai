import { Button, Text } from '@gravity-ui/uikit'

import { ActionBar } from '@/components/navigation/action-bar'
import { useRef } from 'react'

import { Route } from '@/app/routes/dashboards/$id'

export const DashboardPage = () => {
  const param = Route.useParams()
  const ref = useRef<HTMLIFrameElement>(null)

  const handleRedirectClick = () => {
    window.open(`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`, '_blank');
  }

  return (
    <>
      <ActionBar
        renderRightContent={() => (
          <Button onClick={handleRedirectClick} view='action' on>Открыть DataLens</Button>
        )}
      />
      <iframe
        className='w-full h-full'
        ref={ref}
        src={`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`} 
      />
    </>
  )
}