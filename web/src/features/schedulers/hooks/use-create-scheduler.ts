import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSchedule } from '../api';
import { SCHEDULERS_KEY } from './use-schedulers';

export function useCreateScheduler() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SCHEDULERS_KEY] });
        },
    });
}