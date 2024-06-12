import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type UsageVariantsFeatureData = {
    type: 'usage_variants';
};

type Props = {
    id: string;
    data: UsageVariantsFeatureData;
};

export const UsageVariantsNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Способ использования"
            color="yellow"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
