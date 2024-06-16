import { FC, useState } from 'react';

import { Spinner } from '@/common/ui/spinner';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';
import { runDistribution, uploadGraph } from '@/features/graph-designer/api';

export const RunDistributionButton: FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { nodes, edges } = useGraphDesignerState();

    const run = async () => {
        try {
            setIsLoading(true);
            await uploadGraph({ nodes: nodes.value, edges: edges.value });
            await runDistribution();
        } finally {
            setIsLoading(false);
        }
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
