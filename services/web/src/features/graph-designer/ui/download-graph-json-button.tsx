import { FC, useCallback } from 'react';

import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

export const DownloadGraphJSONButton: FC = () => {
    const { nodes, edges } = useGraphDesignerState();

    const downloadGraphJSON = useCallback(() => {
        const json = JSON.stringify({ nodes: nodes.value, edges: edges.value });

        const blob = new Blob([json], {
            type: 'application/json',
        });

        const a = document.createElement('a');
        a.download = 'graph.json';
        a.href = URL.createObjectURL(blob);
        a.dispatchEvent(
            new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
            }),
        );
        a.remove();
    }, []);

    return (
        <button
            className="absolute right-4 top-36 rounded-md border border-zinc-300 bg-white px-4 py-2 shadow-md"
            onClick={downloadGraphJSON}
        >
            JSON
        </button>
    );
};
