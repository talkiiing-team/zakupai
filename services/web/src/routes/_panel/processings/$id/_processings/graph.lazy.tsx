import { ReactFlowProvider } from 'reactflow';
import { createLazyFileRoute } from '@tanstack/react-router';

import {
    GraphDesigner,
    GraphDesignerContextProvider,
} from '@/features/graph-designer';

export const Route = createLazyFileRoute(
    '/_panel/processings/$id/_processings/graph',
)({
    component: () => {
        return (
            <main className="h-full w-full">
                <ReactFlowProvider>
                    <GraphDesignerContextProvider>
                        <GraphDesigner />
                    </GraphDesignerContextProvider>
                </ReactFlowProvider>
            </main>
        );
    },
});
