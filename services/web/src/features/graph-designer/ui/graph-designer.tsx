import { FC } from 'react';
import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import { useSignals } from '@preact/signals-react/runtime';

import { Inventory } from '@/features/graph-designer/ui/inventory';
import { DownloadGraphJSONButton } from '@/features/graph-designer/ui/download-graph-json-button';
import { useGraphDesigner } from '@/features/graph-designer/model/use-graph-designer';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';
import { useGraphDesignerNodeTypes } from '@/features/graph-designer/model/use-graph-designer-node-types';

import 'reactflow/dist/style.css';
import { RunDistributionButton } from '@/features/graph-designer/ui/run-distribution-button';

export const GraphDesigner: FC = () => {
    useSignals();

    const { nodes, edges } = useGraphDesignerState();

    const { onConnect, onEdgesChange, onNodesChange, onDrop, onDragOver } =
        useGraphDesigner();

    const { nodeTypes, inventory } = useGraphDesignerNodeTypes();

    return (
        <div className="relative flex h-full w-full flex-row">
            <Inventory inventory={inventory} />
            <ReactFlow
                nodes={nodes.value}
                edges={edges.value}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                snapToGrid
            >
                <Controls />
                <Background
                    gap={18}
                    size={2}
                    variant={BackgroundVariant.Dots}
                />
            </ReactFlow>
            <DownloadGraphJSONButton />
            <RunDistributionButton />
        </div>
    );
};
