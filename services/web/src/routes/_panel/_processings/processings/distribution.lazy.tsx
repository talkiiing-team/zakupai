import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
    '/_panel/_processings/processings/distribution',
)({
    component: () => (
        <main className="relative flex h-full w-full flex-row">
            <div className="m-24 w-full">
                <h1 className="mb-4 text-3xl">Результаты распределения</h1>
                <a
                    className="block w-fit rounded-md border border-zinc-300 px-4 py-2 text-xl shadow-md"
                    href={`${import.meta.env.VITE_S3_BASE_URL}/distribution_result.csv`}
                    download="distribution.csv"
                    target="_blank"
                >
                    Скачать результаты.csv
                </a>
            </div>
        </main>
    ),
});
