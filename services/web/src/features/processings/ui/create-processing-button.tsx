import { FC } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { createProcessing } from '@/features/processings/api';

export const CreateProcessingButton: FC = () => {
    const navigate = useNavigate();

    const create = async () => {
        const { id } = await createProcessing();

        await navigate({
            to: '/processings/$id/upload',
            params: { id: String(id) },
        });
    };

    return (
        <button
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 shadow-md"
            onClick={create}
        >
            Создать заявку
        </button>
    );
};
