import { FC } from 'react';
import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import { useSignals } from '@preact/signals-react/runtime';

import { Inventory } from '@/features/graph-designer/ui/inventory';
import { nodeTypes } from '@/features/graph-designer/ui/nodes/node-types';
import { DownloadGraph } from '@/features/graph-designer/ui/download-graph';
import { useGraphDesigner } from '@/features/graph-designer/model/use-graph-designer';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

import 'reactflow/dist/style.css';

export const GraphDesigner: FC = () => {
    useSignals();

    const { nodes, edges } = useGraphDesignerState();

    const { onConnect, onEdgesChange, onNodesChange, onDrop, onDragOver } =
        useGraphDesigner();

    return (
        <div className="relative flex h-full w-full flex-row">
            <Inventory />
            <ReactFlow
                nodes={nodes.value}
                edges={edges.value}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background
                    gap={18}
                    size={2}
                    variant={BackgroundVariant.Dots}
                />
            </ReactFlow>
            <DownloadGraph />
        </div>
    );
};
