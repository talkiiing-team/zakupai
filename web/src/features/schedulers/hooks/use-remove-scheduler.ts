import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeSchedule } from '../api';
import { SCHEDULERS_KEY } from './use-schedulers';

export function useRemoveScheduler() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SCHEDULERS_KEY] });
        },
    });
}