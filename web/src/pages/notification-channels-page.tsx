import { useState } from 'react';
import { Text } from '@gravity-ui/uikit'

import { NotificationChannelsTable } from '@/components/tables/notification-channels-table'
import { NotificationChannelsActionBar } from '@/components/navigation/notification-channels-action-bar'
import { CreateNotificationChannelDialog } from '@/components/dialogs/create-notification-channel-dialog'

export function NotificationChannelsPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <NotificationChannelsActionBar onCreateClick={() => setOpen(true)} />
            <div className='px-4 pt-6 flex flex-col gap-4'>
                <Text variant='subheader-3'>
                    Каналы нотификаций
                </Text>

                <NotificationChannelsTable />
                <CreateNotificationChannelDialog open={open} onClose={() => setOpen(false)} onApply={() => {}} />
            </div>
        </>
    )
}