import { useQuery } from "@tanstack/react-query";

import { getNotificationChannels } from '@/features/notification-channels/api';

export const NOTIFICATION_CHANNELS_KEY = 'notification_channels';

export function useNotificationChannels() {
    return useQuery({ queryKey: [NOTIFICATION_CHANNELS_KEY], queryFn: getNotificationChannels });
}