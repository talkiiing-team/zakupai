import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_panel/_processings/processings/')({
    component: () => (
        <main className="flex h-full w-full flex-col">
            <h1>Распределение</h1>
        </main>
    ),
});
