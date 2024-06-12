import { useContext } from 'react';

import { GraphDesignerContext } from '@/features/graph-designer/model/graph-designer-context';

export function useGraphDesignerState() {
    return useContext(GraphDesignerContext);
}
