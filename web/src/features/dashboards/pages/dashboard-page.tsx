import { Button, Loader, Text } from '@gravity-ui/uikit'

import { ActionBar } from '@/components/navigation/action-bar'
import { useEffect, useRef, useState } from 'react'

import { Route } from '@/app/routes/dashboards/$id'

export const DashboardPage = () => {
  const param = Route.useParams()
  const [loading, setLoading] = useState(true)

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
      <div 
        className={`w-full h-full flex items-center justify-center ${!loading ? 'hidden' : ''}`}
      >
        <Loader size='l' />
      </div>
      <iframe
        className={`w-full h-full ${loading ? 'hidden' : ''}`}
        onLoad={() => setLoading(false)}
        src={`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`} 
      />
    </>
  )
}