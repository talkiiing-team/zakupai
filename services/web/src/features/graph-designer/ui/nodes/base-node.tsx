import { FC, ReactNode } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import clsx from 'clsx';

import { NodeColor, mapColor } from '@/features/graph-designer/model/color';

type Props = {
    children?: ReactNode;
    title: string;
    color: NodeColor;
    handles: Array<{ type: HandleType; position: Position; id?: string }>;
};

export const BaseNode: FC<Props> = ({ children, title, color, handles }) => {
    return (
        <div className="relative flex flex-col rounded-lg border-2 border-zinc-300 bg-white shadow-xl">
            <p
                className={clsx(
                    'rounded-t-md p-2 text-center',
                    mapColor[color],
                )}
            >
                {title}
            </p>
            {children}

            {handles.map(({ type, position, id }, idx) => (
                <Handle key={idx} type={type} position={position} id={id} />
            ))}
        </div>
    );
};
