import { useState } from 'react';
import { Text } from '@gravity-ui/uikit'

import { SchedulersTable } from '../tables/schedulers-table';
import { SchedulerssActionBar } from '../components/schedulers-action-bar';
import { AddSchedulerDialog } from '../dialogs/add-scheduler-dialog';
import { SchedulerInfoDialog } from '../dialogs/scheduler-info-dialog';
import { useAtom } from 'jotai';
import { showSchedulerInfoAtom } from '../atoms';

export function SchedulersPage() {
    const [openAddSchedulerDialog, setOpenAddSchedulerDialog] = useState(false);
    const [openInfoSchedulerDialog, setOpenInfoSchedulerDialog] = useAtom(showSchedulerInfoAtom);

    return (
        <>
            <SchedulerssActionBar onCreateClick={() => setOpenAddSchedulerDialog(true)} />
            <div className='px-4 pt-6 flex flex-col gap-4'>
                <Text variant='subheader-3'>
                    Планировщики
                </Text>

                <SchedulersTable />
                <AddSchedulerDialog open={openAddSchedulerDialog} onClose={() => setOpenAddSchedulerDialog(false)} onApply={() => {}} />
                <SchedulerInfoDialog open={openInfoSchedulerDialog} onClose={() => setOpenInfoSchedulerDialog(false)} onApply={() => {}} />
            </div>
        </>
    )
}