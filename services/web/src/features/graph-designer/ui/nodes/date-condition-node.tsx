import { ChangeEvent, FC, useCallback } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

export type DateConditionData = {
    type: 'date_condition';
    date: string;
};

type Props = {
    id: string;
    data: DateConditionData;
};

export const DateConditionNode: FC<Props> = ({ id, data }) => {
    const { nodes } = useGraphDesignerState();

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        nodes.value = nodes.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        date: value,
                    },
                };
            } else {
                return node;
            }
        });
    }, []);

    return (
        <BaseNode
            title="Условие по дате"
            color="blue"
            handles={[
                { position: Position.Left, type: 'target', id: 'value' },
                { position: Position.Top, type: 'source', id: 'true' },
                { position: Position.Bottom, type: 'source', id: 'false' },
            ]}
        >
            <label className="flex flex-row items-center justify-center gap-2 px-2 py-2">
                <span className="mr-1">День после</span>
                <input
                    className="nodrag rounded-md border border-zinc-300 px-2 py-1"
                    type="date"
                    value={data.date}
                    onChange={onChange}
                />
            </label>
            <span className="absolute -top-6 left-[calc(50%+1rem)] text-sm text-zinc-500">
                Истина
            </span>
            <span className="absolute -bottom-6 left-[calc(50%+1rem)] text-sm text-zinc-500">
                Ложь
            </span>
        </BaseNode>
    );
};
