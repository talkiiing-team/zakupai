import { FC } from 'react';

import { Spinner } from '@/common/ui/spinner';
import { runDistribution } from '@/features/graph-designer/api';

type Props = {
    isLoading: boolean;
};

export const RunDistributionButton: FC<Props> = ({ isLoading }) => {
    const run = async () => {
        await runDistribution();
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
