export enum ProcessingStatus {
    CREATED = 0,
    DATASET_UPLOADING,
    DATASET_UPLOADED,
    MERGING,
    MERGED,
    DISTRIBUTING,
    DISTRIBUTED,
    FORECASTING,
    GENERATING_PLOTS,
    DONE,
}

export type Processing = {
    id: number;
    status: ProcessingStatus;
    createdAt: number;
};
