import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type AssetAreaQuantityFeatureData = {
    type: 'asset_area';
};

type Props = {
    id: string;
    data: AssetAreaQuantityFeatureData;
};

export const AssetAreaQuantityFeatureNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Площадь основого средства"
            color="yellow"
            handles={[
                { position: Position.Left, type: 'target' },
                { position: Position.Right, type: 'source' },
            ]}
        />
    );
};
