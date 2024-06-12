import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type UsageStartDateFeatureData = {
    type: 'usage_start';
};

type Props = {
    id: string;
    data: UsageStartDateFeatureData;
};

export const UsageStartDateFeatureNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Дата ввода в эксплуатацию"
            color="blue"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
