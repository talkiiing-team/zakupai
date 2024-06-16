import ky from 'ky';

import { Processing, ProcessingStatus } from '@/features/processings/model';

const mapStatus: Record<ProcessingDTO['status'], ProcessingStatus> = {
    created: ProcessingStatus.CREATED,
    'dataset-uploading': ProcessingStatus.DATASET_UPLOADING,
    'dataset-uploaded': ProcessingStatus.DATASET_UPLOADED,
    merging: ProcessingStatus.MERGING,
    merged: ProcessingStatus.MERGED,
    distributing: ProcessingStatus.DISTRIBUTING,
    distributed: ProcessingStatus.DISTRIBUTED,
    forecasting: ProcessingStatus.FORECASTING,
    'generating-plots': ProcessingStatus.GENERATING_PLOTS,
    done: ProcessingStatus.DONE,
};

type ProcessingDTO = {
    id: number;
    createdAt: string;
    status:
        | 'created'
        | 'dataset-uploading'
        | 'dataset-uploaded'
        | 'merging'
        | 'merged'
        | 'distributing'
        | 'distributed'
        | 'forecasting'
        | 'generating-plots'
        | 'done';
};

export const getProcessingsHistory = async (): Promise<Array<Processing>> => {
    type Response = Array<ProcessingDTO>;

    const res = await ky.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/processings`,
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const history = await res.json<Response>();

    return history.map((proc) => ({
        ...proc,
        status: mapStatus[proc.status],
    }));
};

export const getProcessingById = async (
    id: string | number,
): Promise<Processing> => {
    type Response = ProcessingDTO;

    const res = await ky.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/processings/${id}`,
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const proc = await res.json<Response>();

    return {
        ...proc,
        status: mapStatus[proc.status],
    };
};

export const createProcessing = async (): Promise<Processing> => {
    type Response = ProcessingDTO;

    const res = await ky.post(
        `${import.meta.env.VITE_API_BASE_URL}/v1/processings`,
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const proc = await res.json<Response>();

    return {
        ...proc,
        status: mapStatus[proc.status],
    };
};
