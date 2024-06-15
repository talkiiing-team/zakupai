import { Node, Edge } from 'reactflow';
import { useSignal } from '@preact/signals-react';

export function useGraphDesignerStateProvider() {
    const nodes = useSignal<Array<Node>>([
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
