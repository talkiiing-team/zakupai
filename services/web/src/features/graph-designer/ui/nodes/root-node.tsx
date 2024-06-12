import { FC } from 'react';
import { Handle, Position } from 'reactflow';

export type RootData = {
    type: 'root';
};

export const RootNode: FC = () => {
    return (
        <div className="flex flex-col rounded-lg border-2 border-zinc-300 bg-white shadow-xl">
            <span className="mx-3 inline rounded-t-md text-center align-middle text-4xl">
                *
            </span>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};
