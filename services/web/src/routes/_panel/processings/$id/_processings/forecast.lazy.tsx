/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, useState } from 'react';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';
import useSWR from 'swr';

import { getForecastPlots, runForecasting } from '@/features/forecasting/api';

export const Route = createLazyFileRoute(
    '/_panel/processings/$id/_processings/forecast',
)({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings/forecast',
        });

        const [checkid, setCheckid] = useState(0);

        const onInput = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            const num = Number(value);

            if (Number.isNaN(num)) {
                return;
            }

            setCheckid(num);
        };

        const plots = useSWR(['s3/forecast_plots.json', procId], ([, procId]) =>
            getForecastPlots(procId),
        );

        console.log(plots);

        return (
            <main className="relative flex h-full w-full flex-row">
                <div className="m-24 flex w-full flex-col">
                    <h1 className="mb-4 text-3xl">Предсказание</h1>
                    <span className="mb-4">
                        <label className="mr-2">ID Чека</label>
                        <input
                            type="text"
                            onChange={onInput}
                            className="nodrag w-[20ch] rounded-md border border-zinc-300 px-2 py-1"
                        />
                    </span>
                    <button
                        className="mb-4 w-fit rounded-md border border-zinc-300 bg-white px-4 py-2 text-xl shadow-md"
                        onClick={async () => {
                            await runForecasting(checkid);
                        }}
                    >
                        Предсказать
                    </button>
                    <a
                        className="block w-fit rounded-md border border-zinc-300 px-4 py-2 text-xl shadow-md"
                        href={`${import.meta.env.VITE_S3_BASE_URL}/forecast.csv`}
                        download="distribution.csv"
                        target="_blank"
                    >
                        Скачать forecast.csv
                    </a>
                </div>
            </main>
        );
    },
});