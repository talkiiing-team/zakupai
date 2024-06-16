import { FC, ChangeEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { uploadDataset } from '@/features/dataset-upload/api';
import { Spinner } from '@/common/ui/spinner';

type FilesState = {
    merger?: File;
    mainCosts?: File;
    squares?: File;
    servCodes?: File;
    pays?: Array<File>;
};

type Props = {
    procId: number | string;
    isLoading: boolean;
};

export const DatasetUploadForm: FC<Props> = ({ procId, isLoading }) => {
    const [files, setFiles] = useState<FilesState>({});

    const navigate = useNavigate({ from: '/processings/$id/upload' });

    const handleSingleFile =
        (key: keyof FilesState) => (event: ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = event.target.files?.item(0);

            if (!uploadedFile) {
                return;
            }

            setFiles((files) => ({
                ...files,
                [key]: uploadedFile,
            }));
        };

    const handleMultiplyFiles =
        (key: keyof FilesState) => (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) {
                return;
            }

            const uploadedFiles = [...event.target.files];

            setFiles((files) => ({
                ...files,
                [key]: uploadedFiles,
            }));
        };

    const upload = async () => {
        const { merger, mainCosts, squares, servCodes, pays } = files;

        if (!merger || !mainCosts || !squares || !servCodes || !pays) {
            console.error('please upload all files');
            return;
        }

        await uploadDataset(procId, {
            merger,
            mainCosts,
            squares,
            servCodes,
            pays,
        });

        await navigate({
            to: '/processings/$id/graph',
            params: { id: String(procId) },
        });
    };

    return (
        <form
            className="flex flex-col items-start"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <label>Связь договор-здания</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('merger')}
            />
            <label>Основные средства</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('mainCosts')}
            />
            <label>Площади зданий</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('squares')}
            />
            <label>Коды услуг</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('servCodes')}
            />
            <label>Договоры</label>
            <input className="mb-4" type="file" />
            <label>Счета на оплату (несколько файлов)</label>
            <input
                className="mb-4"
                type="file"
                multiple
                onChange={handleMultiplyFiles('pays')}
            />
            <button
                className="mt-4 rounded-md border border-zinc-300 px-4 py-2 text-xl shadow-md"
                onClick={upload}
            >
                {isLoading ? <Spinner /> : 'Загрузить'}
            </button>
        </form>
    );
};
