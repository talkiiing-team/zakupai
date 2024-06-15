import ky from 'ky';

export type FeatureDataType = 'bool' | 'date' | 'num';

export const getFeatures = async () => {
    const res = await ky.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/processings/features`,
    );

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const features = await res.json<Array<[string, string, FeatureDataType]>>();

    return features.map(([displayName, type, dataType]) => ({
        displayName,
        type,
        dataType,
    }));
};
