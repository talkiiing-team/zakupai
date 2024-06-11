import { ReactFlowProvider } from 'reactflow';
import { createLazyFileRoute } from '@tanstack/react-router';

import { GraphDesigner } from '@/features/graph-designer';

export const Route = createLazyFileRoute('/_panel/processings/')({
    component: () => {
        return (
            <ReactFlowProvider>
                <GraphDesigner />
            </ReactFlowProvider>
        );
    },
});
