import { useState } from 'react';
import { Text } from '@gravity-ui/uikit'

import { SchedulersTable } from '../tables/schedulers-table';
import { SchedulerssActionBar } from '../components/schedulers-action-bar';
import { AddSchedulerDialog } from '../dialogs/add-scheduler-dialog';

export function SchedulersPage() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SchedulerssActionBar onCreateClick={() => setOpen(true)} />
            <div className='px-4 pt-6 flex flex-col gap-4'>
                <Text variant='subheader-3'>
                    Планировщики
                </Text>

                <SchedulersTable />
                <AddSchedulerDialog open={open} onClose={() => setOpen(false)} onApply={() => {}} />
            </div>
        </>
    )
}