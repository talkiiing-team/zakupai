import { createLazyFileRoute } from '@tanstack/react-router';

import { runForecasting } from '@/features/forecasting/api';
import { ChangeEvent, useState } from 'react';

export const Route = createLazyFileRoute(
    '/_panel/_processings/processings/forecast',
)({
    component: () => {
        const [checkid, setCheckid] = useState(0);

        const onInput = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            const num = Number(value);

            if (Number.isNaN(num)) {
                return;
            }

            setCheckid(num);
        };

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
