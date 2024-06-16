import ky from 'ky';

export const runForecasting = async (checkid: number) => {
    const res = await ky.post(
        `${import.meta.env.VITE_API_BASE_URL}/v1/processings/forecast?checkid=${checkid}`,
        {
            timeout: 60_000,
        },
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }
};

export const getForecastPlots = async (): Promise<object> => {
    const res = await ky.get(
        `${import.meta.env.VITE_S3_BASE_URL}/forecast_plots.json`,
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return await res.json();
};
