import { createLazyFileRoute } from '@tanstack/react-router';

import { DatasetUploadForm } from '@/features/dataset-upload';

export const Route = createLazyFileRoute('/_panel/_processings/processings/upload')({
    component: () => (
        <main className="relative flex h-full w-full flex-row">
            <div className="m-24 w-full">
                <h1 className="mb-4 text-3xl">Загрузка данных</h1>
                <DatasetUploadForm />
            </div>
        </main>
    ),
});
