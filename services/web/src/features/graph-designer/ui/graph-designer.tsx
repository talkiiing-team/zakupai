import { FC, useEffect } from 'react';
import ReactFlow, { Controls, Background, BackgroundVariant } from 'reactflow';
import { useSignals } from '@preact/signals-react/runtime';
import { useParams } from '@tanstack/react-router';
import useSWR from 'swr';

import { Inventory } from '@/features/graph-designer/ui/inventory';
import { DownloadGraphJSONButton } from '@/features/graph-designer/ui/download-graph-json-button';
import { useGraphDesigner } from '@/features/graph-designer/model/use-graph-designer';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';
import { useGraphDesignerNodeTypes } from '@/features/graph-designer/model/use-graph-designer-node-types';
import { RunDistributionButton } from '@/features/graph-designer/ui/run-distribution-button';
import { getProcessingById } from '@/features/processings/api';
import { ProcessingStatus } from '@/features/processings/model';
import { SaveGraphButton } from '@/features/graph-designer/ui/save-graph-button';
import { DocsButton } from '@/features/graph-designer/ui/docs-button';
import { getGraph } from '@/features/graph-designer/api';

import 'reactflow/dist/style.css';

export const GraphDesigner: FC = () => {
    useSignals();

    const { nodes, edges } = useGraphDesignerState();

    const { onConnect, onEdgesChange, onNodesChange, onDrop, onDragOver } =
        useGraphDesigner();

    const { id: procId } = useParams({
        from: '/_panel/processings/$id/_processings/graph',
    });

    const proc = useSWR(
        ['v1/processings', procId],
        ([, id]) => getProcessingById(id),
        {
            refreshInterval: 5_000,
        },
    );

    useEffect(() => {
        if (!proc.data) {
            return;
        }

        getGraph(proc.data.id).then((graph) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            nodes.value = graph.nodes;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            edges.value = graph.edges;
        });
    }, [proc.data]);

    const { nodeTypes, inventory } = useGraphDesignerNodeTypes(procId);

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
            <RunDistributionButton
                procId={procId}
                isLoading={Boolean(
                    proc.data &&
                        proc.data.status === ProcessingStatus.DISTRIBUTING,
                )}
            />
            <SaveGraphButton procId={procId} />
            <DownloadGraphJSONButton />
            <DocsButton />
        </div>
    );
};
