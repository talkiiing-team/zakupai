import { useCallback } from 'react';
import {
    EdgeChange,
    NodeChange,
    Connection,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    useReactFlow,
    Node,
} from 'reactflow';
import { nanoid } from 'nanoid';

import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

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
        const source = nodes.value.find((it) => it.id === connection.source);
        const target = nodes.value.find((it) => it.id === connection.target);

        if (!target || !source) {
            return;
        }

        if (
            target.data.requirement !== 'any' &&
            source.data.requirement !== 'any' &&
            target.data.requirement !== source.data.dataType
        ) {
            return;
        }

        edges.value = addEdge(connection, edges.value);
    }, []);

    const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData(
                'application/reactflow-type',
            );

            if (!type) {
                return;
            }

            const position = reactFlow?.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const data = JSON.parse(
                event.dataTransfer.getData('application/reactflow-data'),
            );

            if (!data) {
                return;
            }

            const newNode: Node = {
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
