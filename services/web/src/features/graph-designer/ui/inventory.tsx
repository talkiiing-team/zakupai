import { FC, useMemo } from 'react';
import clsx from 'clsx';

import { NodeColor, mapColor } from '@/features/graph-designer/model/color';

type Props = {
    inventory: Array<{
        type: string;
        displayName: string;
        color: NodeColor;
        defaultData: object;
    }>;
};

export const Inventory: FC<Props> = ({ inventory }) => {
    const items = useMemo(
        () => [...inventory].sort((a, b) => (a.color < b.color ? 1 : -1)),
        [inventory],
    );

    return (
        <div className="flex flex-col gap-4 overflow-scroll border-r border-zinc-300 bg-white p-4">
            {items.map(({ type, displayName, defaultData, color }) => (
                <div
                    className={clsx(
                        'rounded border border-zinc-300 p-2 text-center shadow-md',
                        mapColor[color],
                    )}
                    onDragStart={(event) => {
                        event.dataTransfer.setData(
                            'application/reactflow-type',
                            type,
                        );
                        event.dataTransfer.setData(
                            'application/reactflow-data',
                            JSON.stringify(defaultData),
                        );
                        event.dataTransfer.effectAllowed = 'move';
                    }}
                    key={type}
                    draggable
                >
                    {displayName}
                </div>
            ))}
        </div>
    );
};
