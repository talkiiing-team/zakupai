import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEmailNotificationChannels } from '@/features/notification-channels/api';
import { NOTIFICATION_CHANNELS_KEY } from "@/features/notification-channels/hooks/use-notification-channels";


export function useCreateEmailNotificationChannel() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmailNotificationChannels,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATION_CHANNELS_KEY] });
        },
    });
}