import { FC, ReactNode } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import clsx from 'clsx';

type Color = 'gray' | 'yellow' | 'blue' | 'green' | 'red';

type Props = {
    children?: ReactNode;
    title: string;
    color: Color;
    handles: Array<{ type: HandleType; position: Position; id?: string }>;
};

const mapColor: Record<Color, string> = {
    gray: 'bg-gray-200',
    yellow: 'bg-yellow-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    red: 'bg-red-200',
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
