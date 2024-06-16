import { FC } from 'react';

import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';
import { uploadGraph } from '@/features/graph-designer/api';

export const RunDistributionButton: FC = () => {
    const { nodes, edges } = useGraphDesignerState();

    const run = () => {
        uploadGraph({ nodes: nodes.value, edges: edges.value });
    };

    return (
        <button
            className="absolute right-4 top-4 rounded-md border border-zinc-300 bg-green-400 px-4 py-2 shadow-md"
            onClick={run}
        >
            Запустить распределение
        </button>
    );
};
