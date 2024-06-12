import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type BillTrackingStartDateFeatureData = {
    type: 'bill_tracking_start';
};

type Props = {
    id: string;
    data: BillTrackingStartDateFeatureData;
};

export const BillTrackingStartDateFeatureNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Дата отражения счёта в учетной системе"
            color="blue"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
