/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';

import { DatasetUploadForm } from '@/features/dataset-upload';
import { ProcessingStatus } from '@/features/processings/model';
import { getProcessingById } from '@/features/processings/api';
import { Spinner } from '@/common/ui/spinner';

export const Route = createLazyFileRoute(
    '/_panel/processings/$id/_processings/upload',
)({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings/upload',
        });

        const proc = useSWR(
            ['v1/processings', procId],
            ([, id]) => getProcessingById(id),
            {
                refreshInterval: 5_000,
            },
        );

        return (
            <main className="relative flex h-full w-full flex-row">
                <div className="m-24 w-full">
                    {proc.data &&
                    proc.data.status >= ProcessingStatus.MERGED ? (
                        <h1 className="mb-4 text-3xl">Данные загружены</h1>
                    ) : (
                        proc.data &&
                        proc.data.status === ProcessingStatus.MERGING && (
                            <>
                                <h1 className="mb-4 text-3xl">
                                    Данные обрабатываются
                                </h1>
                                <Spinner />
                            </>
                        )
                    )}
                    {proc.data &&
                        proc.data.status <=
                            ProcessingStatus.DATASET_UPLOADING && (
                            <DatasetUploadForm
                                procId={procId}
                                isLoading={
                                    proc.data.status ===
                                    ProcessingStatus.DATASET_UPLOADING
                                }
                            />
                        )}
                </div>
            </main>
        );
    },
});
