import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
    '/_panel/_processings/processings/distribution',
)({
    component: () => (
        <main className="relative flex h-full w-full flex-row">
            <div className="m-24 w-full">
                <h1 className="mb-4 text-3xl">Результаты распределения</h1>
            </div>
        </main>
    ),
});
