/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, useMemo, useState } from 'react';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';
import useSWR from 'swr';
import Plot from 'react-plotly.js';

import { getForecastPlots, runForecasting } from '@/features/forecasting/api';
import { getProcessingById } from '@/features/processings/api';
import { ProcessingStatus } from '@/features/processings/model';
import { Spinner } from '@/common/ui/spinner';

export const Route = createLazyFileRoute(
    '/_panel/processings/$id/_processings/forecast',
)({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings/forecast',
        });

        const proc = useSWR(
            ['v1/processings', procId],
            ([, id]) => getProcessingById(id),
            {
                refreshInterval: 5_000,
            },
        );

        const [assetid, setAssetid] = useState('');

        const onAssetidInput = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            setAssetid(value);
        };

        const plots = useSWR(['s3/forecast_plots.json', procId], ([, procId]) =>
            getForecastPlots(procId),
        );

        const plotsData = useMemo(() => {
            return (
                plots.data &&
                Object.entries(plots.data).reduce(
                    (acc, [key, value]) => {
                        acc[key] = JSON.parse(value);
                        return acc;
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {} as Record<string, { data: any; layout: any }>,
                )
            );
        }, [plots.data]);

        console.log(plotsData);

        return (
            <main className="relative flex h-full w-full flex-row">
                <div className="m-24 flex w-full flex-col">
                    <h1 className="mb-4 text-3xl">Предсказание</h1>
                    {proc.data &&
                        (proc.data.status === ProcessingStatus.DISTRIBUTED ||
                            proc.data.status === ProcessingStatus.DONE) && (
                            <span className="mb-4">
                                <label className="mr-2">
                                    ID основого средства
                                </label>
                                <input
                                    type="text"
                                    onChange={onAssetidInput}
                                    className="nodrag w-[20ch] rounded-md border border-zinc-300 px-2 py-1"
                                />
                            </span>
                        )}
                    {proc.data &&
                        (proc.data.status === ProcessingStatus.DISTRIBUTED ||
                            proc.data.status === ProcessingStatus.DONE) && (
                            <button
                                className="mb-4 w-fit rounded-md border border-zinc-300 bg-white px-4 py-2 text-xl shadow-md"
                                onClick={async () => {
                                    await runForecasting(procId, assetid);
                                }}
                            >
                                Предсказать
                            </button>
                        )}
                    {proc.data &&
                        proc.data.status === ProcessingStatus.FORECASTING && (
                            <>
                                <h1 className="mb-4 text-3xl">
                                    Данные обрабатываются
                                </h1>
                                <Spinner />
                            </>
                        )}
                    {proc.data &&
                        proc.data.status === ProcessingStatus.DONE && (
                            <a
                                className="block w-fit rounded-md border border-zinc-300 px-4 py-2 text-xl shadow-md"
                                href={`${import.meta.env.VITE_S3_BASE_URL}/${procId}/forecast.csv`}
                                download="distribution.csv"
                                target="_blank"
                            >
                                Скачать forecast.csv
                            </a>
                        )}
                    {proc.data &&
                        proc.data.status === ProcessingStatus.DONE && (
                            <img
                                className="h-[480px] w-[640px]"
                                src={`${import.meta.env.VITE_S3_BASE_URL}/${procId}/forecast.png`}
                                alt="forecast alt"
                            />
                        )}
                    {proc.data &&
                        proc.data.status === ProcessingStatus.DONE &&
                        plotsData &&
                        Object.entries(plotsData).map(
                            ([key, { data, layout }]) => (
                                <Plot data={data} layout={layout} key={key} />
                            ),
                        )}
                </div>
            </main>
        );
    },
});
