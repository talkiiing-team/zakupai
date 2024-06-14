import { FC, ChangeEvent, useState } from 'react';

import { uploadDataset } from '@/features/dataset-upload/api';

type FilesState = {
    merger?: File;
    mainCosts?: File;
    squares?: File;
    servCodes?: File;
    pays?: Array<File>;
};

export const DatasetUploadForm: FC = () => {
    const [files, setFiles] = useState<FilesState>({});

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

    const upload = () => {
        const { merger, mainCosts, squares, servCodes, pays } = files;

        if (!merger || !mainCosts || !squares || !servCodes || !pays) {
            console.error('please upload all files');
            return;
        }

        uploadDataset({
            merger,
            mainCosts,
            squares,
            servCodes,
            pays,
        });
    };

    return (
        <form
            className="flex flex-col"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <label>merger</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('merger')}
            />
            <label>main_costs</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('mainCosts')}
            />
            <label>squares</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('squares')}
            />
            <label>serv_codes</label>
            <input
                className="mb-4"
                type="file"
                onChange={handleSingleFile('servCodes')}
            />
            <label>договоры</label>
            <input className="mb-4" type="file" />
            <label>pays</label>
            <input
                className="mb-4"
                type="file"
                multiple
                onChange={handleMultiplyFiles('pays')}
            />
            <button onClick={upload}>Загрузить</button>
        </form>
    );
};
