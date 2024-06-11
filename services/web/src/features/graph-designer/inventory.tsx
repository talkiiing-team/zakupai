import { ProcessingNodeType } from '@/features/graph-designer/processing-node';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
    className?: string;
};

const inventory: Array<ProcessingNodeType> = ['dataset', 'inc_target'];

export const Inventory: FC<Props> = ({ className }) => {
    return (
        <div className={clsx(className, 'bg-zinc-50 p-4')}>
            {inventory.map((item) => (
                <div
                    className="border border-zinc-300 px-8 py-4"
                    onDragStart={(event) => {
                        event.dataTransfer.setData(
                            'application/reactflow-type',
                            item,
                        );
                        event.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                >
                    {item}
                </div>
            ))}
        </div>
    );
};
