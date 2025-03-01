import { useQuery } from "@tanstack/react-query";

import { getSchedulers } from '@/features/schedulers/api';

export const SCHEDULERS_KEY = 'schedulers';

export function useSchedulers() {
    return useQuery({ queryKey: [SCHEDULERS_KEY], queryFn: getSchedulers });
}