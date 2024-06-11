import { FC } from 'react';
import { Handle, Position } from 'reactflow';

export type IncreaseTargetActionData = {
    type: 'inc_target';
    x: number;
};

type Props = {
    id: string;
    data: IncreaseTargetActionData;
};

export const IncreaseTargetNode: FC<Props> = ({ data }) => {
    return (
        <div className="w-48 rounded-md bg-gray-200 shadow-md">
            <div className="flex flex-col gap-4 p-4">
                <p className="text-center">Увеличить целевую метрику на X</p>
                <label className="flex flex-row items-center justify-center py-2">
                    <span className="mr-2">X = </span>
                    <input
                        className="nodrag w-[5ch] px-2 py-1 outline-none"
                        type="text"
                        value={data.x}
                    />
                </label>
            </div>

            <Handle type="target" position={Position.Left} />
        </div>
    );
};
