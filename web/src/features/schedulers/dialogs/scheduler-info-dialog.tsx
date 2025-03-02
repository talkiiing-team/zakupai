import { Dialog, Loader, SegmentedRadioGroup, Select, Text, TextInput } from "@gravity-ui/uikit";

import { useDashboards } from '@/features/dashboards/hooks/use-dashboards';
import { useNotificationChannels } from '@/features/notification-channels/hooks/use-notification-channels';

import 'react-js-cron/dist/styles.css'
import { useAtomValue } from 'jotai';
import { currentSchedulerAtom } from '../atoms';
import { NotificationChannelName } from './add-scheduler-dialog';

type Props = {
    open: boolean,
    onClose: () => void,
    onApply: () => void,
};

export function SchedulerInfoDialog({ open, onClose }: Props) {
    const scheduler = useAtomValue(currentSchedulerAtom)

    const notificationChannelIds = (scheduler?.metadata.annotations['zakupai.notification_channel_id'] ?? '').split(',')

    const { data: dashboards, isSuccess: isDashboardsSuccess } = useDashboards()
    const { data: notificationChannels, isSuccess: isNotificationChannelsSuccess } = useNotificationChannels()

    const onCancel = () => {
        onClose();
    };

    return (
        <Dialog
            className='max-w-[600px]'
            open={open}
            onClose={onClose}
        >
            <Dialog.Header caption="Информация" />

            <Dialog.Body>
                {
                  (notificationChannels ?? [])
                    .filter(channel => notificationChannelIds.includes(String(channel.id)))
                    .map((channel) => <NotificationChannelName type={channel.type} name={channel.type === 'email' ? channel.email : channel.user_id}  />)
                }
            </Dialog.Body>

            <Dialog.Footer
                textButtonCancel="Отмена"
                onClickButtonCancel={onCancel}
            />
        </Dialog>
    );
}