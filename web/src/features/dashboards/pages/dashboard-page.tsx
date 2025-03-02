import { Button, Loader, Text } from '@gravity-ui/uikit'

import { ActionBar } from '@/components/navigation/action-bar'
import { useEffect, useRef, useState } from 'react'

import { Route } from '@/app/routes/dashboards/$id'
import { AddSchedulerDialog } from '@/features/schedulers/dialogs/add-scheduler-dialog'

export const DashboardPage = () => {
  const param = Route.useParams()
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [path, setPath] = useState(`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`)

  
  useEffect(() => {
    const subscriber = (event: MessageEvent) => {
      if (event.data?.code === 'URL_CHANGED') {
        setPath(`https://datalens.xn----7sbbznd9a5a.xn--p1ai${event.data.data.pathname}${event.data.data.search}&mode=embedded&_no_controls=1`)
      }
    }
    
    window.addEventListener('message', subscriber)
    
    return () => window.removeEventListener('message', subscriber)
  }, [])

  const handleCreateScheduleClick = () => {
    setDialog(true)
  }
  
  const handleRedirectClick = () => {
    window.open(`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}?mode=embedded&_no_controls=1`, '_blank');
  }

  return (
    <>
      <ActionBar
        renderRightContent={() => (
          <div className='flex gap-2'>
            <Button onClick={handleCreateScheduleClick} view='action' on>Создать планировщик</Button>
            <Button onClick={handleRedirectClick} view='action' on>Открыть в DataLens</Button>
          </div>
        )}
      />
      <div 
        className={`w-full h-full flex items-center justify-center ${!loading ? 'hidden' : ''}`}
      >
        <Loader size='l' />
      </div>
      <iframe
        className={`w-full h-full ${loading ? 'hidden' : ''} min-h-[95vh]`}
        onLoad={() => setLoading(false)}
        src={`https://datalens.xn----7sbbznd9a5a.xn--p1ai/${param.id}`}
      />

      <AddSchedulerDialog
        target={path}
        open={dialog}
        onClose={() => setDialog(false)}
        onApply={() => {}}
      />
    </>
  )
}