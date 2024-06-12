import { ChangeEvent, FC, useCallback } from 'react';
import { Position } from 'reactflow';

import { BaseNode } from '@/features/graph-designer/ui/nodes/base-node';
import { useGraphDesignerState } from '@/features/graph-designer/model/use-graph-designer-state';

export enum QuantityConditionCompareOperator {
    MORE = '>',
    LESS = '<',
    EQ = '=',
}

export type QuantityConditionData = {
    type: 'quantity_condition';
    threshold: number;
    compareOp: QuantityConditionCompareOperator;
};

type Props = {
    id: string;
    data: QuantityConditionData;
};

export const QuantityConditionNode: FC<Props> = ({ id, data }) => {
    const { nodes } = useGraphDesignerState();

    const onSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget
            .value as QuantityConditionCompareOperator;

        nodes.value = nodes.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        compareOp: value,
                    },
                };
            } else {
                return node;
            }
        });
    }, []);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value);

        if (Number.isNaN(value)) {
            return;
        }

        nodes.value = nodes.value.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        threshold: value,
                    },
                };
            } else {
                return node;
            }
        });
    }, []);

    return (
        <BaseNode
            title="Количественное условие"
            color="yellow"
            handles={[
                { position: Position.Left, type: 'target', id: 'value' },
                { position: Position.Top, type: 'source', id: 'true' },
                { position: Position.Bottom, type: 'source', id: 'false' },
            ]}
        >
            <label className="flex flex-row items-center justify-center gap-2 py-2">
                <select
                    className="nodrag rounded-md border border-zinc-300 px-2 py-1"
                    value={data.compareOp}
                    onChange={onSelect}
                >
                    {Object.values(QuantityConditionCompareOperator).map(
                        (op) => (
                            <option key={op} value={op}>
                                {op}
                            </option>
                        ),
                    )}
                </select>
                <input
                    className="nodrag w-[6ch] rounded-md border border-zinc-300 px-2 py-1"
                    type="text"
                    value={data.threshold}
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
