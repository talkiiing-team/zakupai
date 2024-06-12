import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type UsedInCoreFeatureData = {
    type: 'used_in_core';
};

type Props = {
    id: string;
    data: UsedInCoreFeatureData;
};

export const UsedInCoreNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Используется в основной деятельности"
            color="yellow"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
