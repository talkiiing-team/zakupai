import { FC } from 'react';

import { inventory } from '@/features/graph-designer/model/inventory';
import clsx from 'clsx';

export const Inventory: FC = () => {
    return (
        <div className="flex flex-col gap-4 border-r border-zinc-300 bg-white p-4">
            {inventory.map(({ type, displayName, defaultData, color }) => (
                <div
                    className={clsx(
                        'rounded border border-zinc-300 p-2 text-center shadow-md',
                        color,
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
