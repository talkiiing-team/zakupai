import { Node, Edge } from 'reactflow';
import { useSignal } from '@preact/signals-react';

import { ProcessingNodeData } from '@/features/graph-designer/model/processing-node';

export function useGraphDesignerStateProvider() {
    const nodes = useSignal<Array<Node<ProcessingNodeData>>>([
        {
            id: 'root',
            type: 'root',
            data: { type: 'root' },
            position: { x: 100, y: 100 },
        },
    ]);

    const edges = useSignal<Array<Edge>>([]);

    return {
        nodes,
        edges,
    };
}
