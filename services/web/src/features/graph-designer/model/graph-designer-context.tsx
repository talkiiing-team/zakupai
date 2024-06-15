import { FC, ReactNode, createContext } from 'react';
import { Edge, Node } from 'reactflow';
import { Signal } from '@preact/signals-react';

import { useGraphDesignerStateProvider } from '@/features/graph-designer/model/use-graph-designer-state-provider';

type GraphDesignerContext = {
    nodes: Signal<Array<Node>>;
    edges: Signal<Array<Edge>>;
};

export const GraphDesignerContext = createContext<GraphDesignerContext>({
    edges: undefined!,
    nodes: undefined!,
});

type Props = {
    children: ReactNode;
};

export const GraphDesignerContextProvider: FC<Props> = ({ children }) => {
    const { nodes, edges } = useGraphDesignerStateProvider();

    return (
        <GraphDesignerContext.Provider value={{ nodes, edges }}>
            {children}
        </GraphDesignerContext.Provider>
    );
};
