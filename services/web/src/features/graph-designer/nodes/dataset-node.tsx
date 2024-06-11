import { FC } from 'react';
import { Handle, Position } from 'reactflow';

export type DatasetNodeData = {
    type: 'dataset';
};

type Props = {
    id: string;
    data: DatasetNodeData;
};

export const DatasetNode: FC<Props> = () => {
    return (
        <div className="w-48 rounded-md bg-green-200 shadow-md">
            <div className="flex flex-col gap-4 p-4">
                <p className="text-center">Набор данных</p>
            </div>

            <Handle type="source" position={Position.Right} />
        </div>
    );
};
