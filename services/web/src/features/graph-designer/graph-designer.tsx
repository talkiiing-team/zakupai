import { FC, useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    BackgroundVariant,
    addEdge,
    Connection,
    Edge,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from 'reactflow';
import { nanoid } from 'nanoid';

import {
    ProcessingNode,
    ProcessingNodeData,
    ProcessingNodeType,
} from './processing-node';
import { Inventory } from './inventory';
import { nodeTypes } from './nodes';

import 'reactflow/dist/style.css';

const initialNodes: Array<ProcessingNode> = [];

const initialEdges: Array<Edge> = [];

export const GraphDesigner: FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const reactFlow = useReactFlow();

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

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

            const defaultData: Record<ProcessingNodeType, ProcessingNodeData> =
                {
                    dataset: {
                        type: 'dataset',
                    },
                    inc_target: {
                        type: 'inc_target',
                        x: 1,
                    },
                };

            const newNode: ProcessingNode = {
                id: nanoid(),
                type,
                position,
                data: defaultData[type],
            };

            setNodes((nodes) => nodes.concat(newNode));
        },
        [reactFlow, setNodes],
    );

    const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        },
        [],
    );

    const downloadGraphJSON = () => {
        const json = JSON.stringify({ nodes, edges });

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
    };

    return (
        <div className="relative flex h-full w-full flex-row">
            <Inventory className="border-r border-zinc-300" />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background
                    gap={12}
                    size={1}
                    variant={BackgroundVariant.Dots}
                />
            </ReactFlow>
            <button
                className="absolute right-4 top-12 rounded-md border border-zinc-300 bg-white px-4 py-2 shadow-md"
                onClick={downloadGraphJSON}
            >
                JSON
            </button>
        </div>
    );
};
