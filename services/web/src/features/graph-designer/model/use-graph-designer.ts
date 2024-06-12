import { useCallback } from 'react';
import {
    EdgeChange,
    NodeChange,
    Connection,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    useReactFlow,
} from 'reactflow';
import { nanoid } from 'nanoid';

import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';
import {
    ProcessingNode,
    ProcessingNodeData,
    ProcessingNodeType,
} from '@/features/graph-designer/model/processing-node';

export function useGraphDesigner() {
    const reactFlow = useReactFlow();

    const { edges, nodes } = useGraphDesignerState();

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        nodes.value = applyNodeChanges(changes, nodes.value);
    }, []);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        edges.value = applyEdgeChanges(changes, edges.value);
    }, []);

    const onConnect = useCallback((connection: Connection) => {
        edges.value = addEdge(connection, edges.value);
    }, []);

    const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData(
                'application/reactflow-type',
            ) as ProcessingNodeType;

            if (!type) {
                return;
            }

            const position = reactFlow?.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const data = JSON.parse(
                event.dataTransfer.getData('application/reactflow-data'),
            ) as ProcessingNodeData;

            if (!data) {
                return;
            }

            const newNode: ProcessingNode = {
                id: nanoid(),
                type,
                position,
                data,
            };

            nodes.value = nodes.value.concat(newNode);
        },
        [reactFlow],
    );

    const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },
        [],
    );

    return {
        onNodesChange,
        onEdgesChange,
        onConnect,
        onDrop,
        onDragOver,
    };
}
