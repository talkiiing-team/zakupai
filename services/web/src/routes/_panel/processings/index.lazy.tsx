import { ReactFlowProvider } from 'reactflow';
import { createLazyFileRoute } from '@tanstack/react-router';

import {
    GraphDesigner,
    GraphDesignerContextProvider,
} from '@/features/graph-designer';

export const Route = createLazyFileRoute('/_panel/processings/')({
    component: () => {
        return (
            <ReactFlowProvider>
                <GraphDesignerContextProvider>
                    <GraphDesigner />
                </GraphDesignerContextProvider>
            </ReactFlowProvider>
        );
    },
});
