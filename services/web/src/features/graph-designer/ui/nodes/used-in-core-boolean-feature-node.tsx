import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type UsedInCoreBooleanFeatureData = {
    type: 'used_in_core';
};

type Props = {
    id: string;
    data: UsedInCoreBooleanFeatureData;
};

export const UsedInCoreBooleanFeatureNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Используется в основной деятельности"
            color="red"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
