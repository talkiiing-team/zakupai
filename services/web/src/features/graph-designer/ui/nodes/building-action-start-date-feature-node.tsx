import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type BuildingActionStartDateFeatureData = {
    type: 'building_action_start';
};

type Props = {
    id: string;
    data: BuildingActionStartDateFeatureData;
};

export const BuildingActionStartDateFeatureNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Дата начала действия связи со зданием'"
            color="blue"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
