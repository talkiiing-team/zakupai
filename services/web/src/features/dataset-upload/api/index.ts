import ky from 'ky';

type UploadDatasetParameters = {
    merger: File;
    mainCosts: File;
    squares: File;
    servCodes: File;
    pays: Array<File>;
};

export const uploadDataset = async (
    procId: number | string,
    params: UploadDatasetParameters,
): Promise<void> => {
    const formData = new FormData();

    formData.append('merger', params.merger, 'merger.xlsx');
    formData.append('mainCosts', params.mainCosts, 'mainCosts.xlsx');
    formData.append('squares', params.squares, 'squares.xlsx');
    formData.append('servCodes', params.servCodes, 'servCodes.xlsx');

    params.pays.forEach((pay, idx) =>
        formData.append('pays', pay, `pay${idx + 1}.xlsx`),
    );

    const res = await ky.post(
        new URL(
            `${import.meta.env.VITE_API_BASE_URL}/v1/processings/${procId}/dataset`,
        ),
        {
            body: formData,
            timeout: 30_000,
        },
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }
};
