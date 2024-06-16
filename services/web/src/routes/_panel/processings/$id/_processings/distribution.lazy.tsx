import { createLazyFileRoute, useParams } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
    '/_panel/processings/$id/_processings/distribution',
)({
    component: () => {
        const { id: procId } = useParams({
            from: '/_panel/processings/$id/_processings/distribution',
        });

        return (
            <main className="relative flex h-full w-full flex-row">
                <div className="m-24 w-full">
                    <h1 className="mb-4 text-3xl">Результаты распределения</h1>
                    <a
                        className="block w-fit rounded-md border border-zinc-300 px-4 py-2 text-xl shadow-md"
                        href={`${import.meta.env.VITE_S3_BASE_URL}/${procId}/distribution_result.csv`}
                        download="distribution.csv"
                        target="_blank"
                    >
                        Скачать distribution_result.csv
                    </a>
                </div>
            </main>
        );
    },
});
