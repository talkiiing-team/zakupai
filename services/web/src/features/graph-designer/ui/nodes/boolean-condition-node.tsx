import { FC } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';

export type BooleanConditionData = {
    type: 'boolean_condition';
};

type Props = {
    id: string;
    data: BooleanConditionData;
};

export const BooleanConditionNode: FC<Props> = () => {
    return (
        <BaseNode
            title="Булево условие"
            color="red"
            handles={[
                { position: Position.Left, type: 'target', id: 'value' },
                { position: Position.Top, type: 'source', id: 'true' },
                { position: Position.Bottom, type: 'source', id: 'false' },
            ]}
        >
            <span className="absolute -top-6 left-[calc(50%+1rem)] text-sm text-zinc-500">
                Истина
            </span>
            <span className="absolute -bottom-6 left-[calc(50%+1rem)] text-sm text-zinc-500">
                Ложь
            </span>
        </BaseNode>
    );
};
