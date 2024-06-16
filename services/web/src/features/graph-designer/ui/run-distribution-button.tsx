import { FC } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { Spinner } from '@/common/ui/spinner';
import { runDistribution } from '@/features/graph-designer/api';

type Props = {
    procId: number | string;
    isLoading: boolean;
};

export const RunDistributionButton: FC<Props> = ({ procId, isLoading }) => {
    const navigate = useNavigate({ from: '/processings/$id/graph' });

    const run = async () => {
        await runDistribution(procId);
        await navigate({
            to: '/processings/$id/distribution',
            params: { id: String(procId) },
        });
    };

    return (
        <button
            className="absolute right-4 top-4 rounded-md border border-zinc-300 bg-green-400 px-4 py-2 shadow-md"
            onClick={run}
            disabled={isLoading}
        >
            {isLoading ? <Spinner /> : 'Запустить распределение'}
        </button>
    );
};
