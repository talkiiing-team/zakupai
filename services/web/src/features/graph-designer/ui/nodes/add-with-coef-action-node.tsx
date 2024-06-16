import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

export type AddWithCoefActionData = {
    type: 'add_with_coef';
    x: number;
};

type Props = {
    id: string;
    data: AddWithCoefActionData;
};

export const AddWithCoefActionNode: FC<Props> = ({ id, data }) => {
    const [input, setInput] = useState(String(data.x));

    const { nodes } = useGraphDesignerState();

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        setInput(value);

        const num = Number(value);

        if (Number.isNaN(num)) {
            return;
        }

        nodes.value = nodes.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        x: num,
                    },
                };
            } else {
                return node;
            }
        });
    }, []);

    return (
        <BaseNode
            title="Прибавить распределение характеристики с коэффицентом X"
            color="gray"
            handles={[{ position: Position.Left, type: 'target' }]}
        >
            <label className="flex flex-row items-center justify-center py-2">
                <span className="mr-2">X = </span>
                <input
                    className="nodrag w-[6ch] rounded-md border border-zinc-300 px-2 py-1"
                    type="text"
                    value={input}
                    onChange={onChange}
                />
            </label>
        </BaseNode>
    );
};
